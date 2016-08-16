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

  renderDashboard(){
    if(!isEmpty(this.props.user)){
      return <NavItem to={routes.app.DASHBOARD}><Text message="DASHBOARD" /></NavItem>
    } else {
      return null;
    }
  }

  renderExports(){
    if(!isEmpty(this.props.user)){
      return <NavItem to={routes.app.EXPORTS}><Text message="EXPORTS_HEADER" /></NavItem>
    } else {
      return null;
    }
  }

  render() {
    return (
      <nav className="subnav">
        <div className="container">
          <h3 className="subnav-title">
            <Link to="/" message="APP_TITLE"></Link>
          </h3>&nbsp;
          <span className="tag-standard orange subnav-tag-alpha">ALPHA</span>
          <ul className="subnav-items">
            <li className="item help">
              <a href="http://moz.com/help">
                <Icon name="moz-help">help</Icon>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
};
