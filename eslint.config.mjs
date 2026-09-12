import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
  {
    files: ['src/components/InlineVisual.tsx', 'src/components/VisualGallery.tsx', 'src/components/QuestionExplanationVisual.tsx'],
    rules: {
      // Static study assets intentionally use native images so the same markup
      // works in the vinext/Sites runtime without an image optimizer.
      '@next/next/no-img-element': 'off',
    },
  },
]);

export default eslintConfig;
