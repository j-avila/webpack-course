const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/images/[hash][ext][query]"
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@utils': path.resolve(__dirname, 'src/utils/'),
      '@template': path.resolve(__dirname, 'src/templates/'),
      '@styles': path.resolve(__dirname, 'src/styles/'),
      '@images': path.resolve(__dirname, 'src/assets/images/')
    }
  },
   module: {
     rules:  [
       {
        test: /\.m?js$/,
        exclude: /mode_modules/,
        use: {
          loader: 'babel-loader',
       }
      },
      {
        test: /\.css|.styl$/,
        use : [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.png/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'application/font-woff',
            name: '[name].[contenthash].[ext]',
            outputPath: './assets/fonts/',
            publicPath: "../assets/fonts/",
            esModule: false 
          }
      }
    }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
      filename: './index.html'
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
}