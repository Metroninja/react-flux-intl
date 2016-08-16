import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import ExternalLink from './ExternalLink.jsx';
import Icon from 'app/components/common/Icon.jsx';
import InternalLink from './InternalLink.jsx';
import Text from 'app/components/common/Text.jsx';

export default class Link extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    icon: PropTypes.string,
    exertnalUrl: PropTypes.string,
    iconBefore: PropTypes.string,
    iconSize: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]),
    text: PropTypes.string,
    newTab: PropTypes.bool,
    query: PropTypes.object,
    route: PropTypes.string,
    to: PropTypes.string,
    disabled: PropTypes.bool,
  };

  children() {
    return this.props.children || this.content();
  }

  className() {
    return classNames('link-line align',this.props.className);
  }

  content() {
    return [this.renderIconBefore(), this.renderText(), this.renderAfterIcon()];
  }
  renderIconBefore() {
    if (this.props.iconBefore) {
      return <Icon key="icon" name={this.props.iconBefore} size={this.props.iconSize} />;
    }
  }
  renderAfterIcon() {
    if (this.props.icon) {
      return <Icon key="icon" name={this.props.icon} size={this.props.iconSize} />;
    }
  }

  renderText() {
    if (this.props.message) {
      return <Text key="text" message={this.props.message} />;
    }
    else if(this.props.text){
      return this.props.text;
    }
  }

  render() {
    const children = this.children();
    const className = this.className();
    const linkProps = { ...this.props, children, className };

    if (this.props.externalUrl) {
      return <ExternalLink {...linkProps} />;
    } else {
      return <InternalLink {...linkProps} />;
    }
  }
}
