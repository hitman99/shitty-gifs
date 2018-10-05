const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'src/frontend'),

  entry: {
    app: './index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/[name].[chunkhash].bundle.js',
    //publicPath: '/'
  },

  module: {
    rules: [
      // React and ES6JS
      {
        test: /(\.jsx$)|(\.js$)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // HTML
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../css'
            }
          },
          "css-loader"
        ]
      },
      // Images
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/images/[hash].[ext]'
        }
      },
      // Fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/fonts/[hash].[ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      chunkFilename: "assets/css/[id].css"
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src/frontend'), 'node_modules']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};

module.exports = config;