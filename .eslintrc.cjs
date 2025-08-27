module.exports = {
  extends: ["next/core-web-vitals", "plugin:prettier/recommended"],
  rules: {
    eqeqeq: "error", // enforce === instead of ==
    "no-console": "warn", // warn when using console.log
    curly: ["error", "all"], // require {} for all control statements
    "no-unused-vars": "warn", // warn about unused variables
    "@typescript-eslint/no-explicit-any": "off", // allow explicit any types
    "prettier/prettier": ["error", { endOfLine: "auto" }], // Windows/Linux line endings
  },
};
