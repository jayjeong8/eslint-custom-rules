import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import noRelativeImportPathsPlugin from "eslint-plugin-no-relative-import-paths";
import prettierPlugin from "eslint-plugin-prettier";
import customRules from "./eslint-rules/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: {},
});

const eslintConfig = [
  ...compat.extends(
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "next/typescript",
    "prettier",
  ),
  {
    plugins: {
      prettier: prettierPlugin,
      "no-relative-import-paths": noRelativeImportPathsPlugin,
      "custom-rules": customRules,
    },
    rules: {
      "custom-rules/korean-text-friendly": "warn",
      "custom-rules/useeffect-spacing": "warn",
      "import/order": [
        "error",
        {
          groups: [
            "type",
            "builtin",
            "external",
            "parent",
            "sibling",
            "index",
            "unknown",
          ],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "never",
        },
      ],
      "@typescript-eslint/no-unused-vars": "error",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
      "no-extra-boolean-cast": "warn",
      "@typescript-eslint/no-empty-function": "off",
      "newline-before-return": "error",
      "comma-dangle": ["error", "always-multiline"],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "function", next: "*" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "*", next: "multiline-block-like" },
        { blankLine: "always", prev: "multiline-block-like", next: "*" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-relative-import-paths/no-relative-import-paths": [
        "warn",
        { allowSameFolder: true, rootDir: "src", prefix: "@" },
      ],
      "prettier/prettier": [
        "error",
        {
          doubleQuote: true,
          plugins: ["prettier-plugin-tailwindcss"],
        },
      ],
    },
    settings: {
      "import/resolver": {
        node: {},
        typescript: {},
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
    },
  },
];

export default eslintConfig;
