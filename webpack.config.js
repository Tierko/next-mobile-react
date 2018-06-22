let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  let { development } = env;

  return {
    entry: {
      bundle: './src/js/index.jsx',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: development ? 'http://localhost:8080/dist/' : '/',
    },

    module: {
      rules: [{
        test: /\.jsx$/,
        loader: 'babel-loader',
      }, {
        test: /\.less$/,
        loaders: [
          development ? 'style-loader' :  MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 4 version'],
                }),
              ],
            },
          },
          'less-loader',
        ],
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      }],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.css', '.less'],
    },

    devtool: development && 'cheap-inline-module-source-map',

    devServer: {
      contentBase: path.resolve(__dirname),
      hot: true,
    },
  };
};
