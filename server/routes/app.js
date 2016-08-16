'use strict';

const _ = require('lodash');
const appRoutes = require('app/routes').default;
const alt = require('app/alt').default;
const express = require('express');
const IntlProvider = require('react-intl').IntlProvider;
const Iso = require('iso');
const React = require('react');
const renderToString = require('react-dom/server').renderToString;
const ReactRouter = require('react-router');
const routes = require('app/constants/routes').default;

var router;
module.exports = router = express.Router();


router.get('/*', (req, res, next) => {
  /** 
  * if you want to do some white listing this is where you would do it
  
  if(process.env.NODE_ENV === 'beta') {
   
   if(not whitelisted check){
      res.redirect(302, 'http://some.redirect.url');
    }
  } else {
    return next();
  }
  **/
  return next();
});


/**
* example of ensuring certain routes have a specific query parameter
* you could do the same thing to secure a logged in only path

for (let route of [
  routes.app.SOME_PATH_CONSTANT,
]) {
  router.get(route, (req, res, next) => {
    if (req.query.q) {
      return next();
    } else {
      res.redirect(302, process.env.HTTP_PREFIX);
    }
  });
}
*/


router.get('/*', (req, res) => {
  //put the boostrap data from your middleware boostrap object into your stores
  alt.bootstrap(JSON.stringify(res.bootstrapData));

  const location = {
    routes: appRoutes,
    location: req.url,
    basename: process.env.HTTP_PREFIX,
  };

  ReactRouter.match(location, (error, redirectLocation, renderProps) => {
    const content = React.createElement(
      IntlProvider,
      { locale: res.locals.locale.language },
      React.createElement(ReactRouter.RouterContext, renderProps)
    );

    const iso = new Iso();
    iso.add(renderToString(content), alt.flush());

    if (_.find(renderProps.routes, ['status', 404])) {
      res.status(404);
    }

    res.render('server', {
      markup: {
        app: iso.render(),
      },
    });
    
  });
});
