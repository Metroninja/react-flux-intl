
import { AppStore } from 'app/stores/index.js';

export PretendSource from './pretend';
export DownloadsSource from './downloads';



/**
 * The full path to the API endpoint.
 *
 * @param {string} path - Append path to the API's versioned base path.
 * @return {string}
 */
export function apiRoute(route) {
  const { api } = AppStore.getState();
  const apiRoute = api.routes[route];
  return `${api.base}${apiRoute}`;
}