import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { Icon, Text } from 'app/components/common/index';

/*
  Composite component containg an input box with a select attached to it.
  Best used for preditive search/saved input scenarios.
*/

export default class InputSelect extends Component {
  static propTypes = {
    className: PropTypes.string,
    onBlur: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    tabEvent: PropTypes.func,
    selectItems: PropTypes.array,
    title: PropTypes.string.isRequired,
  };

  renderListItem(item, index) {
    return (
      <li className="item" key={index} onClick={this.listItemSelected.bind(this, item)}><div className="profile-image">
        </div>{item}</li>
    );
  }

  listItemSelected(item){
    this.props.onChange(item);
  }
  onBlur(){
    //an onblur event will always fire before the onClick event of the child list itesm
    //so we need to delay to let said event fire if there is one.  if not then we should
    //still have a ref value and everything will filter up without issue
    if(this.props.onBlur){
      setTimeout(() => {
        if(this.refs.inputSelect){
          this.props.onChange(this.refs.inputSelect.value);
        }
     },200);
    }
  }

  handleKeyDown(event) {
    switch(event.keyCode){
      //tab
      case 9:
      //enter
      case 13:
        this.props.onChange(this.refs.inputSelect.value);
        break;
      //esc
      case 27:
        this.props.close();
        break;
    }
  }

  render() {
    const classes = classNames('input-select', this.props.className);

    return (
      <div className={classes} onKeyDown={this.handleKeyDown.bind(this)} onBlur={this.onBlur.bind(this)}>
          <div className='input-wrapper'>
            <input 
              autoFocus={true}
              ref="inputSelect"
            />
          </div>
          <div className="title-wrapper">
            <Text className="select-title" message={this.props.title} />
          </div>
          <ReactCSSTransitionGroup
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}
            transitionName="dropdown-menu"
          > 
            <ul className="dropdown-menu">
              {this.props.selectItems.map(this.renderListItem, this)}
            </ul>
          </ReactCSSTransitionGroup>
      </div>
    )
  }
}