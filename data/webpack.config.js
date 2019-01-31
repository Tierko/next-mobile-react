const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = {
  cabinet: '8081',
  site: '8082',
};
const URL = {
  cabinet: 'http://next-promo-v2.dev.design.ru',
  site: 'http://next-mobile-v2.dev.design.ru',
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
      path: path.resolve(__dirname, '../www'),
      filename: '[name].js',
      publicPath: isDevelopment ? '/' : '',
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
        NODE_ENV: isDevelopment ? JSON.stringify('development') : JSON.stringify('production'),
      }),
      new Dotenv(),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: './index.html',
        hash: true,
        inject: true,
        filename: type === 'site' && !isDevelopment ? 'index.php' : 'index.html',
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
      proxy: {
        '/api//*': {
          target: 'http://next-promo-v2.dev.design.ru',
          secure: false,
          changeOrigin: true,
        },
        '/cabinet-api//*': {
          target: 'http://qa.next.agimagroup.ru',
          pathRewrite: {'^/cabinet-api' : '/api'},
          secure: false,
          changeOrigin: true,
        },
      },
    },
  };
};
