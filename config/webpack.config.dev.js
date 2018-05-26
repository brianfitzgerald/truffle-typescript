var AssetsPlugin = require("assets-webpack-plugin");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

var buildDirectory = path.resolve(__dirname, "../", "dist");
var appDirectory = path.resolve(__dirname, "..", "src");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    contentBase: appDirectory,
    host: "localhost",
    port: 8080,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    hot: true
  },
  entry: {
    app: [
      appDirectory + "/index.tsx",
      appDirectory + "/App.css",
      "webpack-dev-server/client?http://localhost:8080"
    ]
  },
  output: {
    path: path.join(__dirname, buildDirectory),
    filename: "[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: appDirectory,
        exclude: /node_modules/,
        loaders: ["awesome-typescript-loader"]
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        include: appDirectory,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.svg$/,
        include: appDirectory,
        loader: "svg-inline-loader?classPrefix"
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("app.css"),
    new AssetsPlugin({
      path: path.join(__dirname, buildDirectory),
      update: true
    }),
    new HtmlWebpackPlugin({
      template: appDirectory + "/index.ejs"
    })
  ]
};
