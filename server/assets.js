const config = require('config/default.json');
const express = require('express');
const globalnav = require(`node_modules/globalnav/config/${process.env.GLOBALNAV_ENV}.json`);

const ASSETS_PATH = process.env.HTTP_PREFIX + process.env.ASSETS_PATH;
const COMPILED_ASSETS = config.assets.compilePath;

/**
 * Generate the url for a static asset file.
 *
 * @param {string} name - asset's filename
 * @param {string} ext - asset's .ext
 * @return {string}
 */
function asset(name, ext) {
  if (process.env.NODE_ENV !== 'development') {
    const CDN = process.env.CDN || '';
    const manifest = require(`${COMPILED_ASSETS}/${config.assets.manifest}`);

    return `${CDN}${ASSETS_PATH}/${manifest[name][ext]}`;
  }
}

/**
 * Generate the url for a webpack asset.
 *
 * @param {string} name - asset's filename
 * @param {string} type - asset's .ext
 * @return {string}
 */
function webpackAsset(name, ext) {
  if (process.env.NODE_ENV === 'development') {
    const host = process.env.WEBPACK_HOST;
    const port = process.env.WEBPACK_PORT;

    return `//${host}:${port}${ASSETS_PATH}/${name}.${ext}`;
  } else {
    return asset(name, ext);
  }
}

module.exports = (app) => {
  app.use(ASSETS_PATH, express.static(COMPILED_ASSETS, { maxAge: 31536000000 }));

  app.locals.assets = {
    styles: {
      main: asset('main', 'css'),
    },
    scripts: {
      main: webpackAsset('main', 'js'),
      polyfill: config.assets.scripts.polyfill,
    },
  };
};
