import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      'prefer-arrow-callback': 'error',
      'arrow-body-style': 'error',
    },
  },
  pluginJs.configs.recommended,
];
