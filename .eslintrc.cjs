module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'standard-with-typescript',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
        'simple-import-sort',
    ],
    rules: {
        '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-explicit-any': 'error',
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/type-annotation-spacing': ['error', {}],
        '@typescript-eslint/array-type': 'off',
        'simple-import-sort/exports': 'error',
        'simple-import-sort/imports': 'error',
    },
    ignorePatterns: [
        'dist',
        'node_modules',
    ],
};
