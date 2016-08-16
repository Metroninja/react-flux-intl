import alt from 'app/alt';
import {createStore} from 'alt-utils/lib/decorators';
import routes from 'app/constants/routes.js';

@createStore(alt)
export default class AppStore {
  constructor() {
    this.apiPath = null;
    this.basename = null;
    this.hosts = {},
    this.text = {};
    this.routes = {};
    this.env = null;

    this.on('bootstrap', () => {
      this.routes = routes;
    });
  }

  static apiRoute(route) {
    return this.state.apiPath + this.state.routes.api[route];
  }

  static getEnv() {
    return this.state.env;
  }
  static getBasename() {
    return this.state.basename;
  }

  static getRoute(route) {
    return this.state.routes.app[route];
  }

}
