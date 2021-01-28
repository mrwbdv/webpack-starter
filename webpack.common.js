const { request } = require("http");
const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
};

const plugins = require("./postcss.config");

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
  },
  resolve: {
    extensions: [".js"],
    alias: {
      img: PATHS.src + "/assets/img",
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules/",
      },
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
          },
          {
            loader: "postcss-loader"
          },
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
            loader: "postcss-loader"
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
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        loader: "url-loader",
         options: {
          limit: 3000,
          name: 'assets/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader"
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
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash:7].bundle.css",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: PATHS.src + "/assets", to: "assets" }],
    })
  ],
};
