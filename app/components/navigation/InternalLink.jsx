import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

export default class InternalLink extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    query: PropTypes.object,
    route: PropTypes.string,
    to: PropTypes.string,
    disabled: PropTypes.bool,
  };

  static contextTypes = {
    routes: PropTypes.object.isRequired,
  };

  path() {
    if (this.props.route) {
      return this.context.routes.app[this.props.route];
    } else {
      return this.props.to;
    }
  }

  to() {
    return {
      pathname: this.path(),
      query: this.props.query,
    };
  }

  render() {
    let Component = this.props.route === 'INDEX' ? IndexLink : Link;
    if(this.props.disabled){
      Component = 'span';
    }

    return (
      <Component className={this.props.className} to={this.to()}>
        {this.props.children}
      </Component>
    );
  }
}
