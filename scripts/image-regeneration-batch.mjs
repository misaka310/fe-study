import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { build } from 'esbuild';
import { pngInfo } from './image-regeneration-png.mjs';

const cwd = process.cwd();
const out = path.join(cwd, 'artifacts', 'image-regeneration-batch');
const promptsDir = path.join(out, 'prompts');
const pendingDir = path.join(out, 'pending');
const targetDir = path.join(cwd, 'public', 'images', 'explanations');
const expected = /^(b-exam-(?:algorithm|security)-\d{3}|basic-set(?:6|7|8)-\d{2})$/;
const command = process.argv[2] || 'plan';
const chosenId = process.argv.includes('--id') ? process.argv[process.argv.indexOf('--id')+1] : null;

async function questions() {
  const src = [
    "import { examAlgorithmQuestions, examSecurityCaseQuestions } from './src/content/questions/b-exam.ts';",
    "import { basicSet6 } from './src/content/basic/set6.ts';",
    "import { basicSet7 } from './src/content/basic/set7.ts';",
    "import { basicSet8 } from './src/content/basic/set8.ts';",
    'export default [...examAlgorithmQuestions,...examSecurityCaseQuestions,...basicSet6,...basicSet7,...basicSet8];',
  ].join('\n');
  const result = await build({
    stdin: { contents: src, resolveDir: cwd, sourcefile: 'batch-source.ts', loader: 'ts' },
    format: 'esm', platform: 'node', bundle: true, write: false, logLevel: 'silent',
  });
  const dataUrl = 'data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].contents).toString('base64');
  return (await import(dataUrl)).default;
}
function sha(buffer) { return crypto.createHash('sha256').update(buffer).digest('hex'); }
function clean(text) { return String(text || '').replace(/\s+/g,' ').trim(); }
function firstSentence(text,max=95) {
  const pieces = clean(text).split(/(?<=[。！？])/);
  let selection = '';
  for (const p of pieces) {
    if (selection.length > 0 && selection.length + p.length > max) break;
    selection += p;
    if (selection.length >= max) break;
  }
  return selection || clean(text);
}
function pagePrompt(q) {
  const answer = q.choices[q.correct[0]];
  const wrong = q.choices.find((_,i)=>i!==q.correct[0]);
  const why = firstSentence(q.explanation,100);
  const shortStem = firstSentence(q.stem,100);
  const code = clean(q.code || '');
  const codeCue = code ? code.split(' ').slice(0,28).join(' ') : '';
  const panels = [
    {name:'問題の条件',text:'「'+shortStem+'」',scene:'Show the given conditions with clean diagrams, values, arrows and boxed key terms.'},
    {name:'判断の手順',text:'「'+(codeCue || '問題文にある条件を、対象・操作・結果へ分けて確認する。')+'」',scene:q.code?'Diagram the exact supplied pseudocode with highlighted variables and state transitions.':'Use geometric comparisons to distinguish the relevant mechanism from alternatives.'},
    {name:'正答',text:'「'+answer+'」',scene:'Show the correct result prominently, with the decisive data or relationship geometrically emphasized.'},
    {name:'正答になる理由',text:'「'+why+'」',scene:'Show the causal or numerical reasoning that reaches the correct answer.'},
    {name:'混同しやすい選択肢',text:'「'+wrong+'」',scene:'Show the alternate answer crossed out with a contrasting but accurate diagram.'},
  ];
  const instructions=[
    'Create ONE polished Japanese explanatory FE study infographic; canvas 1254x1254.',
    'Exactly five vertically stacked panels, generous gutters; readable at phone size.',
    'No people, characters, mascots, anime, presenters, comic dialogue, page numbers or watermarks.',
    'Render the five quoted Japanese panel strings exactly. No other readable words anywhere in the image.',
    'Use clean technical diagrams, arrows, containers, comparison blocks, examples and symbols. Keep diagrams faithful to the question data.',
    'Question ID: '+q.id+'; topic: '+q.topic,
    'Authoritative question: '+clean(q.stem),
    ...(q.code ? ['Authoritative pseudocode:\n'+q.code] : []),
    'Correct answer: '+answer,
    'Reason: '+clean(q.explanation),
    'Distractors: '+q.choices.filter((_,i)=>i!==q.correct[0]).join(' / '),
    ...panels.map((p,i)=>'Panel '+(i+1)+' ('+p.name+'): '+p.scene+' Exact Japanese text: '+p.text),
    'Avoid inventing numbers or relations; if content is too long, use larger diagram space rather than reducing text to illegible size.',
  ];
  return {panels,prompt:instructions.join('\n')};
}
async function plan() {
  const qs=(await questions()).filter(q=>expected.test(q.id));
  if(qs.length!==100)throw Error('expected exactly 100 source questions, got '+qs.length);
  if(new Set(qs.map(q=>q.id)).size!==100)throw Error('duplicate question ID');
  fs.mkdirSync(promptsDir,{recursive:true}); fs.mkdirSync(pendingDir,{recursive:true});
  const oldManifestPath=path.join(out,'manifest.json');
  const oldRows=fs.existsSync(oldManifestPath) ? new Map(JSON.parse(fs.readFileSync(oldManifestPath,'utf8')).items.map(item=>[item.id,item])) : new Map();
  const rows=qs.map(q=>{
    if(q.correct.length!==1 || q.choices.length!==4)throw Error('invalid answer shape: '+q.id);
    const p=pagePrompt(q);
    const file=path.join(promptsDir,q.id+'.txt');
    fs.writeFileSync(file,p.prompt+'\n','utf8');
    const deployed=path.join(targetDir,q.id+'.webp');
    const row={id:q.id,topic:q.topic,stem:q.stem,code:q.code||null,correctAnswer:q.choices[q.correct[0]],explanation:q.explanation,distractors:q.choices.filter((_,i)=>i!==q.correct[0]),prompt:path.relative(cwd,file).replace(/\\/g,'/'),promptSha256:sha(Buffer.from(p.prompt+'\n')),output:path.relative(cwd,deployed).replace(/\\/g,'/'),pending:path.relative(cwd,path.join(pendingDir,q.id+'.png')).replace(/\\/g,'/'),originalSha256:fs.existsSync(deployed)?sha(fs.readFileSync(deployed)):null,review:'pending',panels:p.panels};
    const prior=oldRows.get(q.id);
    if(prior && prior.promptSha256!==row.promptSha256 && fs.existsSync(path.join(cwd,row.pending))){
      throw Error('prompt changed while PNG exists; preserve and re-review before planning: '+q.id);
    }
    if(prior?.promptSha256===row.promptSha256){
      row.originalSha256=prior.originalSha256;
      row.review=prior.review;
      if(prior.integratedSha256)row.integratedSha256=prior.integratedSha256;
      if(prior.reviewedPngSha256)row.reviewedPngSha256=prior.reviewedPngSha256;
    }
    return row;
  });
  const manifest={version:1,source:'117_fe-study 40 exam B questions plus basic sets 6-8 (60)',generatedAt:new Date().toISOString(),total:100,items:rows};
  fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n','utf8');
  console.log(JSON.stringify({status:'planned',total:rows.length,existing:rows.filter(x=>x.originalSha256).length,manifest:path.join(out,'manifest.json')}));
}
async function status() {
  const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
  const rows=await Promise.all(manifest.items.map(async q=>({id:q.id,created:await pngInfo(path.join(cwd,q.pending)),review:q.review})));
  console.log(JSON.stringify({total:rows.length,pngProduced:rows.filter(q=>q.created).length,stillMissing:rows.filter(q=>!q.created).length,items:rows.filter(q=>q.created)},null,2));
}

async function integrate() {
  const manifest=JSON.parse(fs.readFileSync(path.join(out,'manifest.json'),'utf8'));
  const reviewFile=path.join(out,'review.json');
  if(!fs.existsSync(reviewFile))throw Error('visual review is required: '+reviewFile);
  const approved=JSON.parse(fs.readFileSync(reviewFile,'utf8')).items||{};
  const {default:sharp}=await import('sharp');
  let completed=0, skipped=0;
  for(const q of manifest.items){
    if(chosenId && q.id!==chosenId)continue;
    if(q.integratedSha256){
      const current=fs.readFileSync(path.join(cwd,q.output));
      if(sha(current)!==q.integratedSha256)throw Error('previously integrated image changed unexpectedly: '+q.id);
      continue;
    }
    const review=approved[q.id];
    if(!review||review.verdict!=='PASS'||review.textVerified!==true||review.conceptVerified!==true){skipped++;continue;}
    const src=path.join(cwd,q.pending);
    const info=await pngInfo(src);
    if(!info)throw Error('approved image is missing: '+q.id);
    if(info.sha256!==review.pngSha256)throw Error('approved hash mismatch: '+q.id);
    if(info.width<1024||info.height<1024)throw Error('image below 1024px: '+q.id);
    const dest=path.join(cwd,q.output);
    const prev=fs.readFileSync(dest);
    if(sha(prev)!==q.originalSha256)throw Error('existing WebP changed since plan: '+q.id);
    const backup=path.join(out,'originals',q.id+'.webp');
    fs.mkdirSync(path.dirname(backup),{recursive:true});
    if(!fs.existsSync(backup))fs.writeFileSync(backup,prev,{flag:'wx'});
    const optimized=await sharp(src).resize(1254,1254,{fit:'contain',background:'#ffffff'}).webp({quality:90,effort:5}).toBuffer();
    const metadata=await sharp(optimized).metadata();
    if(metadata.format!=='webp'||metadata.width!==1254||metadata.height!==1254)throw Error('WebP validation failed: '+q.id);
    const temp=dest+'.reviewed.tmp';fs.writeFileSync(temp,optimized);fs.renameSync(temp,dest);
    q.integratedSha256=sha(optimized);q.review='PASS';q.reviewedPngSha256=info.sha256;
    completed++;
  }
  fs.writeFileSync(path.join(out,'manifest.json'),JSON.stringify(manifest,null,2)+'\n','utf8');
  console.log(JSON.stringify({status:'integrated',completed,skipped}));
}
if(command==='plan') await plan();
else if(command==='status') await status();
else if(command==='integrate') await integrate();
else throw Error('unsupported command '+command);
