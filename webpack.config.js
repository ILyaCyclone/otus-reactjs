const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "production",
  target: "node",
  devtool: "source-map",
  entry: "./src/calc/index.ts",
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "calc.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
};
