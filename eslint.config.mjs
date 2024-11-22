import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
    rules: {
      semi: ["error", "never"], 
      quotes: ["error", "single"],
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
];
