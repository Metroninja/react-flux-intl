import React, { Component, PropTypes } from 'react';
import Qs from 'qs';

export default class ExternalLink extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    externalUrl: PropTypes.string,
    target: PropTypes.string,
  };

  render() {
    const target = this.props.target || '_blank';

    return (
      <a className={this.props.className} href={this.props.externalUrl} target={target}>
        {this.props.children}
      </a>
    );
  }
}
