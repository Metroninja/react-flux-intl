const config = require('config/default.json');

module.exports = (req, res, next) => {
  const reqLocale = req.acceptsLanguages(req.app.locals.locales);
  var locale;
  if (reqLocale) {
    locale = {
      code: reqLocale,
      language: reqLocale[1],
    };
  }

  res.locals.locale = locale || config.locale;
  return next();
};
