module.exports = (app) => {
  app.locals.apiPath = process.env.WONK_PATH;
  app.locals.environment = process.env.NODE_ENV;
};


