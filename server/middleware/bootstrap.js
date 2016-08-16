
module.exports = (req, res, next) => {

  //pre populate our store
  res.bootstrapData = {
    AppStore: {
      basename: process.env.HTTP_PREFIX,
      env: process.env.NODE_ENV,
      text: require('app/content/default').default,
      apiPath: req.app.locals.apiPath,
      locale: res.locals.locale.language,
    },
    QueryStore: {
      query: req.query || '',
    },
    UserStore: {
      user: res.user || {}
    }
  };
  return next();
};