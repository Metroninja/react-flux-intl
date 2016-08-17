/**
 * Routes
 **/

//routes for the app, all supported paths
const app = {
  INDEX: '/',
  DASHBOARD: '/dashboard',
  DOWNLOADS: '/downloads',
};

/**
* routes for whatever api you will be connecting to
* there is obviously no api with this app, this is just 
* here as an example
*/
const api = {
  GET_SOMETHING: '/get/something',
};

export default { app, api };