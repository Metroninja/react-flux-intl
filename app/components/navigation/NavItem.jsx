import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import Link from 'app/components/navigation/Link.jsx';

export default class NavItem extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    host: PropTypes.string,
    query: PropTypes.object,
    route: PropTypes.string,
    to: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  };

  path() {
    if (this.props.route) {
      return this.context.routes.app[this.props.route];
    } else {
      return this.props.to;
    }
  }

  isActive() {
    const path = this.path();
    if (path) {
      return this.context.router.isActive(path);
    }
  }

  render() {
    const classes = classNames('item', this.props.className, {
      active: this.isActive(),
    });

    return (
      <li className={classes}>
        <Link {...this.props} />
      </li>
    );
  }
}
