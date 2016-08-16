const middleware = require('server/middleware');

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'production') {
    app.use((req, res, next) => {
      res.header('X-Environment', process.env.NODE_ENV);
      return next();
    });
  }
  app.use(process.env.HTTP_PREFIX, 
    require('./healthcheck')
  );

  app.use(process.env.HTTP_PREFIX,
    middleware.locale,
    middleware.user,
    middleware.bootstrap,
    require('./app')
  );
};