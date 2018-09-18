let path = require('path');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');
let autoprefixer = require('autoprefixer');
let HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = {
  cabinet: '8081',
  site: '8082',
};
const URL = {
  cabinet: 'http://next-promo.dev.design.ru',
  site: 'http://next-mobile.dev.design.ru',
};

module.exports = (env, { mode }) => {
  const isDevelopment = mode === 'development';
  const { type } = env;
  const port = PORT[type] || '8080';
  const urlPort = type === 'cabinet' ? '8082' : '8081';
  const url = isDevelopment ? `http://localhost:${urlPort}` : URL[type];

  return {
    entry: {
      bundle: [
        './src/common/js/polyfill.js',
        'babel-polyfill',
        'scroll-behaviour/polyfill',
        'whatwg-fetch',
        `./src/${type}/js/index.jsx`,
      ],
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      publicPath: isDevelopment ? '/dist/' : '',
    },

    module: {
      rules: [{
        test: [/\.jsx$/, /\.js$/],
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      }, {
        test: /\.less$/,
        loaders: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                autoprefixer({
                  browsers: ['last 4 version', 'ie >= 10'],
                }),
              ],
            },
          },
          'less-loader',
        ],
      }, {
        test: /\.css/,
        loaders: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
      }],
    },

    plugins: [
      new webpack.DefinePlugin({
        SERVICE_URL: JSON.stringify(url),
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
        inject: true,
      }),
    ],

    resolve: {
      extensions: ['.js', '.jsx', '.css', '.less'],
    },

    devtool: isDevelopment && 'cheap-inline-module-source-map',

    devServer: {
      contentBase: path.resolve(__dirname),
      hot: true,
      host: '0.0.0.0',
      public: `localhost:${port}`,
      port,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
};
