const js = require('@eslint/js')
const tseslint = require('@typescript-eslint/eslint-plugin')
const tsparser = require('@typescript-eslint/parser')
const react = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const prettier = require('eslint-config-prettier')

module.exports = [
  // Global ignores first
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.min.js',
      'webpack.config.js',
      'eslint.config.js',
    ],
  },

  // Main configuration for source files
  {
    ...js.configs.recommended,
    files: ['src/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: 'module',
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',

        // Figma plugin globals
        figma: 'readonly',
        __html__: 'readonly',
        ExportSettings: 'readonly',
        FrameNode: 'readonly',

        // Node.js globals
        module: 'writable',
        require: 'readonly',
        process: 'readonly',

        // Webpack HMR
        render: 'readonly',
        onmessage: 'writable',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react: react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // Basic ESLint rules
      'comma-dangle': ['error', 'always-multiline'],
      'no-async-promise-executor': 'off',
      'no-use-before-define': 'off',
      'no-unsafe-optional-chaining': 'off',
      'no-unused-vars': 'off',
      'no-undef': 'off', // TypeScript handles this

      // TypeScript ESLint rules
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-use-before-define': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      // React rules
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'error', // We need React imports for Figma plugins

      // React Hooks rules
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  prettier, // This should come last to override other formatting rules
]
