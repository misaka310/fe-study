import { glossary } from '../content/glossary';
import { GlossaryTooltip } from './GlossaryTooltip';

export function RichText({ text }: { text: string }) {
  const pieces = text.split(/(\[\[[^\]]+\]\])/g);
  return <>{pieces.map((piece, index) => {
    const match = piece.match(/^\[\[([^\]]+)\]\]$/);
    const entry = match ? glossary[match[1]] : undefined;
    return entry ? <GlossaryTooltip entry={entry} key={`${entry.term}-${index}`} /> : piece;
  })}</>;
}
