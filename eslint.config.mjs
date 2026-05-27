import eslint from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  ...nextVitals,
  ...tseslint.config(eslint.configs.all, tseslint.configs.strict),
  prettier,
  { ignores: [".next/**", "public/**", "out/**", "next.config.js", "next-env.d.ts"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  {
    rules: {
      "@next/next/no-img-element": "off",
      "complexity": "off",
      "id-length": "off",
      "max-depth": "off",
      "max-lines": "off",
      "max-lines-per-function": "off",
      "max-params": "off",
      "max-statements": "off",
      "no-continue": "off",      
      "no-magic-numbers": "off",
      "no-nested-ternary": "off",
      "no-ternary": "off",      
      "no-undef-init": "off",
      "no-undefined": "off",      
      "one-var": "off",
      "prefer-named-capture-group": "off",
      "radix": "off",
      "react-hooks/set-state-in-effect": "off",
      "require-unicode-regexp": "off",
    }
  }
];

export default eslintConfig;
