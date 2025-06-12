// import { FlatCompat } from '@eslint/eslintrc'
 
// const compat = new FlatCompat({
//   // import.meta.dirname is available after Node.js v20.11.0
//   baseDirectory: import.meta.dirname,
// })
 
// const eslintConfig = [
//   ...compat.config({
//     extends: ['next'],
//     rules: {
//       'react/no-unescaped-entities': 'off',
//       '@next/next/no-page-custom-font': 'off',
//     },
//   }),
// ]
 
// export default eslintConfig


import { dirname as pathDirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import reactPlugin from "eslint-plugin-react"; // ✅ Required import

const filename = fileURLToPath(import.meta.url);
const dirname = pathDirname(filename);

const compat = new FlatCompat({
  baseDirectory: dirname,
});

const eslintConfig = [
  // Include the Next.js config (core-web-vitals only for JSX)
  ...compat.extends("next/core-web-vitals"),

  // Flat config block for JSX
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        React: "readonly",
      },
    },
    plugins: {
      react: reactPlugin, // ✅ Use object, not string
    },
    rules: {
      "react/react-in-jsx-scope": "off", // Optional: if you're using Next.js 12+
    },
  },
];

export default eslintConfig;

