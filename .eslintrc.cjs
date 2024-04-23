module.exports = {
  extends: ["@it-incubator/eslint-config", "plugin:storybook/recommended"],
  overrides: [
    {
      files: ["**/*.stories.tsx"],
      rules: {
        "no-console": "off",
        "react-hooks/rules-of-hooks": "off",
      },
    },
  ],
  rules: {
    "import/extensions": ["off", "never"],
    "import/no-unresolved": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
