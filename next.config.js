const path = require("path");
const withCss = require("@zeit/next-css");

module.exports = withCss({
  webpack(config) {
    config.module.rules.push({
      test: /\.md$/,
      use: [{ loader: path.resolve(__dirname, "./build/recipe-loader.js") }]
    });

    return config;
  }
});
