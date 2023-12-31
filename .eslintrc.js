module.exports = {
  'root': true,
  'env': {
    'browser': true,
    'es2021': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential'
  ],
  'overrides': [
    {
      'env': {
        'node': true
      },
      'files': [
        '.eslintrc.{js,cjs}'
      ],
      'parserOptions': {
        'sourceType': 'script'
      }
    },
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'parser': '@typescript-eslint/parser',
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'vue'
  ],
  'rules': {
    'quotes': [ 'warn', 'single' ],
    'vue/no-v-html': 'off',
    'vue/multi-word-component-names': [ 'warn', {
      'ignores': [
        'Home',
        'Overview',
      ]
    } ],

    'semi': [ 'warn', 'always' ],
    // 'indent': [ 'warn', 2 ],
    'object-curly-spacing': [ 'warn','always' ],

    // 大驼峰组件名
    'vue/component-name-in-template-casing': ['warn', 'PascalCase', { registeredComponentsOnly: false }],
    // 组件内容分区
    'vue/component-tags-order': ['warn', {
      'order': [ [ 'script', 'template' ], 'style' ]
    }],
  }
};
