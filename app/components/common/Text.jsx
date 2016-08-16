import React, { Component, PropTypes } from 'react';
import connectToStores from 'alt-utils/lib/connectToStores';

import { AppStore } from 'app/stores/index.js';

@connectToStores
export default class Text extends Component {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    text: PropTypes.object.isRequired,
    values: PropTypes.object,
    uppercase: PropTypes.bool,
  };

  static propDefaults = {
    uppercase: false,
  }

  static contextTypes = {
    intl: PropTypes.object.isRequired
  }

  static getStores() {
    return [AppStore];
  }

  static getPropsFromStores() {
    return {
      text: AppStore.getState().text,
    };
  }

  getText(item){
    const { formatMessage } = this.context.intl;
    if(this.props.uppercase){
      let intlObj = this.props.text[item];
      intlObj.defaultMessage = intlObj.defaultMessage.toUpperCase();
      return formatMessage(intlObj, { ...this.props.values });
    } else {
      return formatMessage(this.props.text[item], { ...this.props.values });
    }
  }

  render() {
    let message = '';
    if(Array.isArray(this.props.message)) {
      return (
        <span className={this.props.className}>
          {this.props.message.map( (item) => {
            return this.getText(item) + ' '
          })}
        </span>
      )

    } else {
      return (
        <span className={this.props.className}>
          {this.getText(this.props.message)}
        </span>
      );
    }
    
  }
}
