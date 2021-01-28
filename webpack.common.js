const { request } = require("http");
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          }
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("dart-sass"),
            },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/views/pages/index.pug`,
      filename: 'index.html'
    }),
    new WebpackNotifierPlugin({
      emoji: true,
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:7].bundle.css",
    }),
  ],
};
