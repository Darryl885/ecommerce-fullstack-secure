import js from "@eslint/js";
import globals from "globals";

export default [
  js.configs.recommended, // Utilise les règles recommandées par défaut
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // Autorise les variables Node (process, __dirname)
        ...globals.jest, // Autorise les variables de test (describe, it, expect)
      },
    },
    rules: {
      "no-console": "off",          // On garde les console.log pour le debug
      "no-unused-vars": "warn",     // Alerte si une variable est inutile
      "semi": ["error", "always"],  // Force les points-virgules
      "quotes": ["error", "double"], // Force les guillemets doubles
      "no-var": "error",            // Interdit 'var', force 'let' ou 'const'
      "prefer-const": "error"       // Force 'const' si la variable ne change pas
    },
  },
];