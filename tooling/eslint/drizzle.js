/** @type {import('eslint').Linter.Config} */
const config = {
  root: true,
  extends: ['plugin:drizzle/all'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['drizzle'],
  rules: {},
}

module.exports = config
