//pull in package css so webpack loads it in
require('c3/c3.css');
//make sure babel loads on the client side
require('babel-polyfill');

import Iso from 'iso';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, useRouterHistory } from 'react-router';
import { createHistory } from 'history';
import { IntlProvider } from 'react-intl';
import alt from 'app/alt.js';
import { AppStore } from 'app/stores/index.js';
import routes from 'app/routes.jsx';

let icons = require.context('app/images/icons', false, /.svg$/);
icons.keys().forEach(icons);

require('app/styles/main.scss');

Iso.bootstrap( (state, metaData, container) => {
  alt.bootstrap(state);

  const { basename, locale } = AppStore.getState();
  const history = useRouterHistory(createHistory)({
    basename: basename,
  });

  const App = (
    <IntlProvider locale={locale}>
      <Router history={history} routes={routes} />
    </IntlProvider>
  );

  ReactDOM.render(App, container);
});
