// Flat-config ESLint file for ESLint 9 + TypeScript-ESLint v8
// Works with Next.js 14 and React 18.
import EsLint from '@eslint/js'; // Core JS rules
import TsEsLint from 'typescript-eslint'; // TS parser + flat presets

// Next / React rule plugins (replaces legacy `eslint-config-next`)
import EsLintPluginNext from '@next/eslint-plugin-next';
import EsLintPluginReact from 'eslint-plugin-react';
import EsLintPluginReactHooks from 'eslint-plugin-react-hooks';

// Turn off Prettier-conflicting rules (must come LAST)
import EsLintConfigurationPrettier from 'eslint-config-prettier';

// Structure
import StructureLintRules from './libraries/structure/lint-rules/StructureLintRules.mjs';

// Nexus
import NexusLintRules from './libraries/nexus/lint-rules/NexusLintRules.mjs';

// Shared configuration for both JS and TS
const sharedPlugins = {
    '@next/next': EsLintPluginNext,
    react: EsLintPluginReact,
    'react-hooks': EsLintPluginReactHooks,
    structure: StructureLintRules,
    nexus: NexusLintRules,
};

const sharedRules = {
    // Next.js presets
    ...EsLintPluginNext.configs.recommended.rules,
    ...EsLintPluginNext.configs['core-web-vitals'].rules,

    // React and hooks
    ...EsLintPluginReact.configs['jsx-runtime'].rules,
    ...EsLintPluginReactHooks.configs.recommended.rules,

    // Project rules
    'no-empty': ['error', { allowEmptyCatch: true }],
    'nexus/no-internal-imports-rule': 'error',
    'nexus/no-nexus-project-or-base-imports-rule': 'error',
    'structure/no-structure-project-imports-rule': 'error',
    'structure/react-destructuring-properties-rule': 'error',
    'structure/react-no-destructuring-react-rule': 'error',
    'structure/react-no-arrow-functions-as-hook-parameters-rule': 'error',
    'structure/react-naming-conventions-rule': 'error',
    'structure/react-function-style-rule': 'error',
    'structure/react-export-rule': 'error',
    'structure/react-import-rule': 'error',
    'structure/react-file-organization-rule': 'error',
};

const sharedGlobals = {
    // React global
    React: 'writable', // Keep "React" writable for rules that still expect the old pragma

    // Browser globals
    document: 'readonly',
    window: 'readonly',
    navigator: 'readonly',
    setTimeout: 'readonly',
    clearTimeout: 'readonly',
    setInterval: 'readonly',
    clearInterval: 'readonly',
};

// Export - Default
export default [
    // Global ignore patterns
    {
        ignores: [
            // Node modules
            'node_modules',
            'package*.json',
            // Lock files & manifest
            'pnpm-lock.yaml',
            'yarn.lock',
            // Build artifacts
            '**/.next/**',
            '**/.open-next/**',
            '**/.worker-next/**',
            '**/.wrangler/**',
            '**/build/**',
            '**/dist/**',
            // *.code.js files
            '**/*.code.js',
        ],
    },

    // Baseline recommendations
    EsLint.configs.recommended, // Plain JavaScript best practices
    ...TsEsLint.configs.recommended, // TypeScript-aware variants

    // JavaScript & JSX
    {
        files: ['**/*.{mjs,js,jsx}'],

        // Language options
        languageOptions: {
            // Use standard ESLint parser for JS
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2022,
                jsx: true, // Enable JSX parsing
            },
            globals: {
                ...sharedGlobals,

                // Node.js globals (for all JS files including scripts)
                __dirname: 'readonly',
                __filename: 'readonly',
                module: 'readonly',
                require: 'readonly',
                process: 'readonly',
                console: 'readonly',
                global: 'readonly',
                Buffer: 'readonly',
            },
        },

        // Set linter options
        linterOptions: {
            reportUnusedDisableDirectives: true,
        },

        // Plugins
        plugins: sharedPlugins,

        // Rules
        rules: {
            ...sharedRules,

            // More permissive rules for Node.js/scripts
            'no-console': 'off', // Allow console logs
            'no-process-exit': 'off', // Allow process.exit()
            'no-sync': 'off', // Allow synchronous methods (often used in scripts)
        },
    },

    // TypeScript & TSX rules
    {
        files: ['**/*.{ts,tsx}'],

        // Language options
        languageOptions: {
            parser: TsEsLint.parser,
            parserOptions: {
                project: true, // Auto-detect nearest tsconfig.json
                sourceType: 'module',
            },
            globals: sharedGlobals,
        },

        // Plugins
        plugins: sharedPlugins,

        // Rules
        rules: {
            ...sharedRules,

            // TypeScript tweaks
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/no-explicit-any': ['error', { ignoreRestArgs: true }],
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },

    // Disable stylistic rules Prettier owns
    EsLintConfigurationPrettier,
];
