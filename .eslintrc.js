module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    'eslint:recommended',
    "plugin:vue/base",
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 1
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "ignore",
      "multiline": "below"
    }]
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  }
}