import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';

import { ModalStore } from 'app/stores/index.js';
import { ModalActions } from 'app/actions/index.js';
import Text from 'app/components/common/Text.jsx';

@connectToStores
export default class Modal extends Component {
  static propTypes = {
    active: PropTypes.bool,
    content: PropTypes.node.isRequired,
    dismissible: PropTypes.bool,
    title: PropTypes.string.isRequired,
  };

  static getStores() {
    return [ModalStore];
  }

  static getPropsFromStores() {
    const { active, content, dismissible, title } = ModalStore.getState();

    return {
      active,
      content,
      dismissible,
      title,
    };
  }

  constructor(props) {
    super(props);

    this.handleDismiss = this.handleDismiss.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleDismiss() {
    if (this.props.dismissible) {
      ModalActions.dismiss();
    }
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.keyCode == 27) {
      event.preventDefault();
      this.handleDismiss();
    }
  }

  renderClose() {
    if (this.props.dismissible) {
      return <span className="modal-close" onClick={this.handleDismiss}></span>;
    } else {
      return false;
    }
  }

  renderModal() {
    document.addEventListener('keydown', this.handleKeyDown);

    return (
      <div>
        <section className="modal" id="modal">
          <div className="modal-header">
            <h1 className="modal-title">
              <Text message={this.props.title} />
            </h1>
            {this.renderClose()}
          </div>
          {this.props.content}
        </section>
        <div className="modal-backdrop" onClick={this.handleDismiss}></div>
      </div>
    );
  }

  render() {
    return this.props.active ? this.renderModal() : false;
  }
}
