module.exports = {
  "extends": "airbnb",
  "globals": {
    "window": true,
    "document": true,
  },
  "parser": "babel-eslint",
  "rules": {
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ],
    }],
  },
};
