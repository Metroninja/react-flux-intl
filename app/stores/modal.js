import alt from 'app/alt.js';
import { bind, createStore } from 'alt-utils/lib/decorators';

import { ModalActions } from 'app/actions/index.js';

@createStore(alt)
export default class ModalStore {
  constructor() {
    this.on('init', () => {
      this.active = false;
      this.content = '';
      this.dismissible = true;
      this.title = '';
    });
  }

  @bind(ModalActions.DISMISS)
  recycle() {
    alt.recycle(this);
  }

  @bind(ModalActions.ACTIVATE)
  activate(state) {
    this.active = true;
    this.content = state.content;
    this.title = state.title;
  }

  @bind(ModalActions.PREVENT_DISMISS)
  preventDismiss() {
    this.dismissible = false;
  }

  @bind(ModalActions.ALLOW_DISMISS)
  allowDismiss() {
    this.dismissible = true;
  }
}
