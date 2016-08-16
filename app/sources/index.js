
import { AppStore } from 'app/stores/index.js';

export CompareSource from './compare';
export DailyActivitySource from './dailyActivity';
export ExportsSource from './exports';
export MentionsSource from './mentions';
export PdfSource from './pdf';
export ProfileSource from './profile';
export ProfileSearchSource from './profileSearch';
export SegmentSource from './segment';
export SocialGraphSource from './socialGraph';
export TwitterSource from './twitter';
export UserAnalysisSource from './userAnalysis';
export UserOverviewSource from './userOverview';



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