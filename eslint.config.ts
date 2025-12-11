import js from '@eslint/js';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import vuePlugin from 'eslint-plugin-vue';
import stylistic from '@stylistic/eslint-plugin';

export default [
  // Базовые настройки для всех файлов
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.git/**',
      '**/deploy/**',
      '**/public/**',
      '**/.github/**',
      'vite.config.*',
      '**/*.config.*',
      '**/*.d.ts',
      '**/eslint.config.*',
      '**/tsconfig.*',
      '**/package.json',
      '**/package-lock.json'
    ]
  },

  // Базовые настройки для JavaScript/TypeScript
  js.configs.recommended,

  // Настройки для Vue
  ...vuePlugin.configs['flat/recommended'],

  // Настройки для TypeScript
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.app.json',
        extraFileExtensions: ['.vue']
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      // Отключаем стилистические правила для TS/TSX, так как они конфликтуют с Vue
      '@stylistic/indent': 'off',
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/array-bracket-spacing': ['warn', 'never'],
      '@stylistic/comma-dangle': ['warn', 'never'],
      '@stylistic/max-len': ['warn', {
        code: 100,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true
      }]
    }
  },

  // Настройки для Vue файлов
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.vue'],
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    plugins: {
      'vue': vuePlugin,
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylistic
    },
    rules: {
      // Vue правила
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
      'vue/no-v-html': 'off',
      'vue/script-indent': ['error', 'tab', {
        baseIndent: 1,
        switchCase: 1
      }],
      'vue/html-indent': ['error', 'tab'],
      'vue/html-closing-bracket-spacing': ['error', {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never'
      }],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1
      }],
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below'
      }],

      // Базовые правила
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'warn',

      // Стилистические правила
      '@stylistic/indent': 'off', // Отключаем, так как используем vue/script-indent
      '@stylistic/semi': ['warn', 'never'],
      '@stylistic/quotes': ['warn', 'single'],
      '@stylistic/object-curly-spacing': ['warn', 'always'],
      '@stylistic/array-bracket-spacing': ['warn', 'never'],
      '@stylistic/comma-dangle': ['warn', 'never'],
      '@stylistic/space-before-function-paren': ['warn', 'always'],
      '@stylistic/space-in-parens': ['warn', 'never'],
      '@stylistic/space-infix-ops': 'warn',
      '@stylistic/space-unary-ops': 'warn',
      '@stylistic/arrow-spacing': 'warn',
      '@stylistic/block-spacing': 'warn',
      '@stylistic/key-spacing': 'warn',
      '@stylistic/keyword-spacing': 'warn',
      '@stylistic/brace-style': ['warn', '1tbs', { allowSingleLine: true }],
      '@stylistic/comma-style': ['warn', 'last'],
      '@stylistic/eol-last': ['warn', 'always'],
      '@stylistic/function-call-spacing': ['warn', 'never'],
      '@stylistic/function-paren-newline': ['warn', 'multiline-arguments']
    }
  }
]
