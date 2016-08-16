const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('webpack.config');

const server = new WebpackDevServer(webpack(webpackConfig), {
  compress: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  host: '0.0.0.0',
  hot: true,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
  stats: {
    colors: true,
  },
});

server.listen(process.env.WEBPACK_PORT, function() {
  /*eslint-disable */
  console.log(`Webpack: HOST=${process.env.WEBPACK_HOST} PORT=${process.env.WEBPACK_PORT}`);
  /*eslint-enable */
});
