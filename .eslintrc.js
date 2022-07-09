module.exports = {
  env: {
    browser: true,
    es2021: true,
    'webextensions': true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard',
    './eslintrc-auto-import.json'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ],
  rules: {
  }
}
