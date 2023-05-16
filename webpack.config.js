const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const path = require('path');
const WebpackBar = require('webpackbar');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name]-[hash].js',
    clean: true, // 清空dist文件夹
  },
  plugins: [
    // new webpack.ProgressPlugin((percentage, message, ...args) => {
    //   console.info(percentage * 100 + '%', message, ...args);
    // }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new WebpackBar(),
    new StylelintPlugin(),
    new ESLintPlugin({
      fix: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 按照模版生成的文件名称
      template: './index.html', //  模版的路径
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: './dist', //  这个是配置静态资源的吧
    open: true, // 自动打开浏览器
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  // source-map单独生成map文件
  // eval-source-map 不生成map文件
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '...'],
  },
};
