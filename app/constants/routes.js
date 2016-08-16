/**
 * Routes
 **/

const app = {
  INDEX: '/',
  DASHBOARD: '/dashboard',
  EXPORTS: '/exports',
  MENTIONS: '/mentions',
  SAVED_USER_LIST: '/list',
  USER_ANALYSIS: '/user-analysis',
  USER_COMPARE: '/user-compare',
  USER_OVERVIEW: '/user-overview',
  PROFILE_SEARCH: '/profile-search',
  SOCIAL_GRAPH: '/social-graph',
};

const api = {
  COMPARE: '/compare',
  DASHBOARD: '/dashboard',
  EXPORTS: '/exports',
  FOLLOWS: '/twitter/follows',
  PROFILE: '/profile',
  PROFILE_SEARCH: '/bio',
  SOCIAL_GRAPH: '/sort',
  TWITTER: '/twitter/profile',
  TRACKED: '/twitter/competitor',
  USER_ANALYSIS: '/analyze',
  USER_OVERVIEW: '/track',
};

export default { app, api };