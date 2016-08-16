import AppRoot from 'app/components/AppRoot.jsx';
import Dashboard from 'app/components/pages/Dashboard/index.jsx';
import Exports from 'app/components/pages/Exports/index.jsx';

import Homepage from 'app/components/pages/Homepage/index.jsx';
import Mentions from 'app/components/pages/Mentions/index.jsx';
import NotFound from 'app/components/NotFound/index.jsx';
import ProfileSearch from 'app/components/pages/ProfileSearch/index.jsx';
import SocialGraph from 'app/components/pages/SocialGraph/index.jsx';
import UserAnalysis from 'app/components/pages/UserAnalysis/index.jsx';
import UserCompare from 'app/components/pages/UserCompare/index.jsx';
import UserOverview from 'app/components/pages/UserOverview/index.jsx';

import routes from 'app/constants/routes.js';


export default [{
  component: AppRoot,
  path: routes.app.INDEX,
  indexRoute: { component: Homepage },
  childRoutes: [{
    components: { body: Dashboard },
    path: `${routes.app.DASHBOARD}(/:status/:user)`,
  }, {
    components: { body: NotFound },
    path: '*',
    status: 404,
  }]
}];

