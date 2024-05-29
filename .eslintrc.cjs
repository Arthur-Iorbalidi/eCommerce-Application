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
    //Отключает в линте проверку разрыва строк перед и после фигурных скобок
    'object-curly-newline': 'off',
    'react/function-component-definition': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/require-default-props': 'off',
    'default-param-last': 'off',
    '@typescript-eslint/default-param-last': 'off',
    'implicit-arrow-linebreak': 'off',
    'react-refresh/only-export-components': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'arrow-body-style': 'off',
    "react/destructuring-assignment": "off"
  },
};
