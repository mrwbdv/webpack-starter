const { request } = require("http");
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier')

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
};

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    main: PATHS.src,
  },
  output: {
    path: PATHS.dist,
    filename: "[name].[hash:7].bundle.js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/views/pages/index.pug`,
      filename: 'index.html'
    }),
    new WebpackNotifierPlugin({
      emoji: true,
    })
  ],
};
