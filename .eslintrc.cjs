module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
  ],
  parserOptions: {
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.ts',
    'vitest.config.ts',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
    //Исключение нужно, чтобы Airbnb не ругался на ('React' must be in scope when using JSX react/react-in-jsx-scope)
    'react/react-in-jsx-scope': 'off',
    // Чтобы не помечало разрывы строки из-за разницы в ОС
    'linebreak-style': 0,
    'prettier/prettier': 'error',
    '@typescript-eslint/indent': ['error', 2],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: 'never',
      },
    ],
  },
};
