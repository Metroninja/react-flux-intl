import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class AlertPage extends Component {
  static propTypes = {
    content: PropTypes.node.isRequired,
    dismissible: PropTypes.bool,
    id: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    type: PropTypes.oneOf([
      'error',
      'warning',
      'success',
      'info',
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
      <span
        className="alert-close"
        onClick={this.props.onClose.bind(this, this.props.id)}
      >
      </span>
    );
  }

  render() {
    const className = classNames('alert-page', this.props.type);

    return (
      <div className={className}>
        <span className="alert-icon"></span>
        <div className="alert-content">
          {this.props.content}
        </div>
        {this.props.dismissible ? this.renderClose() : false}
      </div>
    );
  }
}
