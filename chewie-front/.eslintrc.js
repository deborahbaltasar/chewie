module.exports = {
    env: {
        browser: true,
        es6: true,
    },

    extends: [
        'plugin:react/recommended',
        'airbnb',
        'prettier',
        'plugin:prettier/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },

    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'prettier'],
    rules: {
        'import/no-named-as-default': 0,
        'react/jsx-props-no-spreading': 'off',
        'prettier/prettier': 'error',
        'react/prop-types': 'off',
        'no-unused-expressions': 'off',
        'react/jsx-filename-extension': [1, { extensions: ['.jsx'] }],
        'import/prefer-default-export': 'off',
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
            },
        ],
    },
};
