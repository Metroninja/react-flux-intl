import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Icon } from 'app/components/common/index';

export default class AlertFixed extends Component {
  static propTypes = {
    content: PropTypes.node.isRequired,
    dismissible: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf([
      'bottom',
      'top',
    ]),
  };

  static defaultProps = {
    dismissible: true,
  }

  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }

  renderClose() {
    return (
      <div className="right-content alert-close"
        onClick={this.props.onClose.bind(this, this.props.id)}
      ><Icon name="moz-close" size="small"/>
      </div>
    );
  }

  render() {
    const className = classNames('alert-fixed align', this.props.type);
    return (
      <div className={className}>
        <div className="alert-content">
          {this.props.content}
        </div>
        {this.props.dismissible ? this.renderClose() : false}
      </div>
    );
  }
}
