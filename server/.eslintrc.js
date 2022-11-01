module.exports = {
  env: {
    es2020: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'prettier'
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: [
    ".eslintrc.js"
  ],
  parserOptions: {
    project: ['./tsconfig.json']
  },
  rules: {
    'prettier/prettier': 2,
    '@typescript-eslint/explicit-function-return-type': 'off'
  }
};
