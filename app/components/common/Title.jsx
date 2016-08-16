import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Text, Icon } from 'app/components/common/index.js';

export default class Title extends Component {

  static propTypes = {
    quotedText: PropTypes.string,
    rawText: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string,
    className: PropTypes.string,
  };

  shouldRenderInput(){
    if(this.props.quotedText){
      return <span>"{this.props.quotedText}"</span>
    } else if(this.props.rawText) {
      return <span>{this.props.rawText}</span>
    } else {
      return null;
    }
  }

  render(){ 
    return (
      <h2 className={classNames("h2 alt flex top0", this.props.className)}>
        <Icon name={this.props.icon} />
        <div className="line-block"></div>
        <Text message={this.props.text} />{this.props.rawText ? <span>:</span> : null} &nbsp;
        {this.shouldRenderInput()}
      </h2>
    )
  }
}