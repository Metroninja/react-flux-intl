'use strict'
const _ = require('lodash');
const config = require('config/default.json');
const routes = require('app/constants/routes.js')
const request =  require('superagent');

module.exports = (req, res, next) => {
  /** example of setting a user from a secure backend api
  
  //get the api path
  let path = `${req.app.locals.apiPath}`;

  //use supagent request
  request.get(path)
    .end((err, response) => {
      if(err === null && !_.isEmpty(response.body)){
        res.user = response.body;
      }
      return next();
    });
  **/
  
  return next();
};
