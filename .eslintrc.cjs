module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    "airbnb",
    "airbnb/hooks",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsx-a11y/strict",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "react",
    "@typescript-eslint",
    "eslint-plugin-import",
    "simple-import-sort",
  ],
  rules: {
    "eol-last": [
      "warn",
      "always",
    ],
    "block-spacing": "warn",
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1,
      },
    ],
    "linebreak-style": [
      "error",
      "unix",
    ],
    "no-multiple-empty-lines": [
      "warn",
      {
        "max": 1,
        "maxBOF": 0,
        "maxEOF": 0,
      },
    ],
    "import/extensions": "off",
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error",
        ],
      },
    ],
    "object-curly-spacing": [
      "warn",
      "always",
    ],
    "quotes": [
      "error",
      "double",
      {
        "avoidEscape": true,
      },
    ],
    "semi": [
      "error",
      "always",
    ],
    "semi-spacing": [
      "warn",
    ],
    "sort-imports": "off",
    "simple-import-sort/imports": "warn",
    "comma-dangle": [
      2,
      "always-multiline",
    ],
    "comma-style": [
      "warn",
    ],
    "no-unused-vars": "off",
    "import/no-unresolved": [
      "error",
      {
        "commonjs": true,
        "amd": true,
      },
    ],
    "max-len": [
      "error",
      {
        "code": 100,
        "ignorePattern": "className=\".*\"",
      },
    ],
    "@typescript-eslint/no-non-null-assertion": [
      "off",
    ],
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
      },
    ],
    "no-multi-spaces": "warn",
    "react/jsx-filename-extension": [
      "error",
      {
        "extensions": [
          ".tsx",
          ".jsx",
        ],
      },
    ],
    "react/function-component-definition": [
      "warn",
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function",
      },
    ],
    "react/react-in-jsx-scope": "off",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": [
      "warn",
    ],
    "no-restricted-exports": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/display-name": "off",
    "react/jsx-tag-spacing": [
      "warn",
      {
        "closingSlash": "never",
        "beforeSelfClosing": "always",
        "afterOpening": "never",
        "beforeClosing": "never"
      }
    ],
    "import/prefer-default-export": "off",
    "curly": ["warn", "all"]
  },
  settings: {
    react: {
      version: "detect",
    },
    "import/resolver": {
      "typescript": {},
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
        ],
      },
    },
  },
};
