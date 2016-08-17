import { isEmpty } from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';

import { UserStore } from 'app/stores/index.js';
import { Icon, Text } from 'app/components/common/index.js';
import NavItem from 'app/components/navigation/NavItem.jsx';
import routes from 'app/constants/routes.js';
import Link from 'app/components/navigation/Link.jsx';

@connectToStores
export default class SubNav extends Component {
  static propTypes = {
    user: PropTypes.object,
  };
  
  static getStores() {
    return [UserStore];
  }

  static getPropsFromStores() {
    return {
      user: UserStore.getState().user,
    };
  }

  render() {
    return (
      <nav className="subnav">
        <div className="container">
          <h3 className="subnav-title">
            <Link to="/" message="APP_TITLE"></Link>
          </h3>&nbsp;
          <span className="tag-standard orange subnav-tag-alpha">Demo</span>
          <ul className="subnav-items">
            <li className="item help">
              <NavItem to={routes.app.DASHBOARD}><Text message="DASHBOARD" /></NavItem>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};
