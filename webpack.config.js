require('app-module-path').addPath(__dirname);

const AssetsPlugin = require('assets-webpack-plugin');
const autoprefixer = require('autoprefixer');
const config = require('config/default.json');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const browserslist = require('browserslist');
const merge = require('webpack-merge');
const webpack = require('webpack');

const ASSETS_PATH = process.env.HTTP_PREFIX + process.env.ASSETS_PATH;
const TARGET = process.env.npm_lifecycle_event;
const WEBPACK_URL = `http://${process.env.WEBPACK_HOST}:${process.env.WEBPACK_PORT}`;

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  `sass-loader?sourceMap`,
];

const browsersListConfig = {
  browsers: 'last 2 versions,iOS >= 8,Safari >= 8',
}
process.env.BROWSERSLIST = browsersListConfig.browsers;

const common = {
  entry: {
    main: config.assets.entryScript,
  },
  module: {
    loaders: [{
      test: /app\/images\/icons\/.*.svg$/,
      loader: 'svg-sprite?' + JSON.stringify({
        name: 'icon-[name]',
        prefixize: false,
      }),
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }],
  },
  postcss: [
    autoprefixer(browsersListConfig),
  ],
  progress: true,
  resolve: {
    root: [
      process.cwd(),
    ],
  },
};

if(TARGET === 'start-dev') {
  module.exports = merge.smart(common, {
    cache: true,
    devTool: 'inline-source-map',
    entry: [
      `webpack-dev-server/client?${WEBPACK_URL}`,
      'webpack/hot/only-dev-server',
      config.assets.entryScript,
    ],
    module: {
      loaders: [{
        test: /\.js.?$/,
        include: /app/,
        loaders: ['react-hot', 'babel-loader'],
      }, {
        test: /\.scss$/,
        loader: `style-loader!${sassLoaders.join('!')}`,
      }],
    },
    output: {
      filename: '[name].js',
      path: process.cwd(),
      publicPath: `${WEBPACK_URL}${ASSETS_PATH}`,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('development'),
        },
      }),
    ],
  });
}

if(TARGET === 'bundle') {
  module.exports = merge.smart(common, {
    entry: ['babel-polyfill', config.assets.entryScript],
    devTool: 'source-map',
    module: {
      loaders: [{
        test: /\.js.?$/,
        include: /app/,
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!')),
      }],
    },
    output: {
      filename: '[name]-[hash].js',
      path: config.assets.compilePath,
    },
    plugins: [
      new AssetsPlugin({
        filename: config.assets.manifest,
        path: config.assets.compilePath,
        prettyPrint: true,
      }),
      new ExtractTextPlugin('[name]-[hash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        mangle: false,
      }),
    ],
  });
}
