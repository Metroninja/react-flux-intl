import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

export default class Icon extends Component {
  static propTypes = {
    className: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
  };

  static defaultProps = {
    size: null,
    name: '',
  };

  render() {
    const icon = `icon-${this.props.name}`;
    
    /*eslint-disable */
    // supress warnings to use dangerouslySetInnerHTML.
    return (
      <svg
        className={classNames('icon', icon, this.props.size, this.props.className)}
        dangerouslySetInnerHTML={{__html:`<use xlink:href="#${icon}"></use>'`}}
      />
    );
    /*eslint-enable */
  }
}
