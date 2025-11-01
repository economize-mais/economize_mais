module.exports = {
    parser: "@typescript-eslint/parser",
    parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        sourceType: "module"
    },
    plugins: ["@typescript-eslint/eslint-plugin", "import"],
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript"
    ],
    root: true,
    env: {
        node: true,
        jest: true
    },
    ignorePatterns: [".eslintrc.js"],
    rules: {
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",

        // 👇 Nova regra para organizar os imports
        "import/order": [
            "error",
            {
                groups: [
                    ["builtin", "external"], // node + libs
                    ["internal"], // alias @/*
                    ["parent", "sibling", "index"] // relativos
                ],
                pathGroups: [
                    {
                        pattern: "@/**",
                        group: "internal"
                    }
                ],
                pathGroupsExcludedImportTypes: ["builtin"],
                "newlines-between": "always", // linha em branco entre grupos
                alphabetize: {
                    order: "asc",
                    caseInsensitive: true
                }
            }
        ]
    }
}
