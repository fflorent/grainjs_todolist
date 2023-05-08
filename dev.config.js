const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: __dirname + "/dist",
    filename: "index_bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Grainjs todo list",
      template: "./src/index.html",
    }),
  ],
};
