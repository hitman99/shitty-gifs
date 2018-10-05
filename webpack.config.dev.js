const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');



const config = {
  context: path.resolve(__dirname, 'src/frontend'),

  entry: {
    app: './index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].[chunkhash].bundle.js',
    publicPath: "/"
  },

  module: {
    rules: [
      // React and ES6JS
      {
        test: /\.(js|jsx)$/,
        //include: /frontend/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      // HTML
      {test: /\.html$/, use: ['html-loader']},
      // CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
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
  ],
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src/frontend'), 'node_modules']
  },
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api/*': 'http://localhost:3000'
    }
  }
};

module.exports = config;