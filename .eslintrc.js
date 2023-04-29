module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['unused-imports', 'simple-import-sort', '@typescript-eslint'],
  rules: {
    'simple-import-sort/imports': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    'unused-imports/no-unused-imports': 'error',
  },
  root: true,
};
