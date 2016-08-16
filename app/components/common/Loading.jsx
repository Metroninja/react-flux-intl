import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Icon } from 'app/components/common/index.js';

export default class Loading extends Component {
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    size: 'large',
  };

  render() {
    return (
      <div className={classNames('loading-content', this.props.className)}>
        <Icon className="spinner" name="icon-spinner" size={this.props.size} />
      </div>
    );
  }
}
