module.exports = {
  "extends": ["airbnb", "plugin:react/recommended"],
  "globals": {
    "window": true,
    "document": true,
  },
  "parser": "babel-eslint",
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ],
    }],
    "import/named": 0,
    "react/destructuring-assignment": "off",
  },
};
