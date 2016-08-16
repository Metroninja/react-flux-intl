import { isEmpty } from 'lodash';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

import { Icon } from 'app/components/common/index';

/*
  Input menu with functionality for a clear button and parent event handling
  Complexity comes from different states parent components may/can pass down
*/

export default class InputMenu extends Component {
  static propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    closeClass: PropTypes.string,
    inputClass: PropTypes.string,
    inputType: PropTypes.string,
    maxItems: PropTypes.number,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    title: PropTypes.string,
    tabEvent: PropTypes.func,
    userCount: PropTypes.number,
    clearFunc: PropTypes.func,
    blurEvent: PropTypes.func,
    disabled: PropTypes.bool,
    onFocus: PropTypes.func,
    hasInput: PropTypes.bool,
  };

  static defaultProps = {
    autoFocus: false,
    menuVisible: false,
    type: 'input',
    userCount: 0,
    disabled: false,
  };

  handleKeyDown(event) {
    switch(event.keyCode){
      //tab
      case 9:
      if(this.props.tabEvent){
        this.props.tabEvent();
      }
        break;
      //enter
      case 13:
        if(this.props.blurEvent) {
          this.props.blurEvent();

        }
        break;
    }
  }

  onChange(event){
    if(this.props.onChange) {
      this.props.onChange(this.refs.input.value);
    }
  }

  clearInput(){
    this.props.clearFunc();
    this.refs.input.value = '';
  }

  renderClearQuery() {
    if(this.props.userCount > 0 || this.props.hasInput){
      return (
        <span className={this.props.closeClass} onClick={this.clearInput.bind(this)}>
          <Icon name="moz-close" className="pointer" />
        </span>
      )
    } else {
      return null;
    }
  }
  render() {
    const classes = classNames('input-menu', this.props.className);

    return (
      <div className={classes}>
        {this.props.disabled ?
          <input
            ref="input"
            autoFocus={this.props.autoFocus}
            className={this.props.inputClass}
            name={this.props.inputType}
            placeholder={this.props.placeholder}
            type={this.props.inputType}
            disabled={true}
          />
        :
        <input
            autoFocus={this.props.autoFocus}
            className={this.props.inputClass}
            name={this.props.inputType}
            placeholder={this.props.placeholder}
            ref="input"
            type={this.props.inputType}
            onKeyDown={this.handleKeyDown.bind(this)}
            onChange={this.onChange.bind(this)}
            onFocus={this.props.onFocus}
            disabled={this.props.userCount >= 3 || this.props.disabled}
          />
        }
        {this.renderClearQuery()}
      </div>
    );
  }
}
