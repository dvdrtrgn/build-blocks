export default {
  root: true,
  env: {
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended', // we added this line
    'eslint:recommended',
    '@vue/prettier',
  ],
  parserOptions: {},
  rules: {
    'no-console': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': import.meta.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'warn',
    'arrow-parens': [ 'warn', 'always' ],
  },
};
