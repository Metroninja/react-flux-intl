import alt from 'app/alt';
import { createActions } from 'alt-utils/lib/decorators';

@createActions(alt)
export default class AlertActions {
  constructor() {
    this.generateActions(
      'create',
      'empty',
      'remove',
      'clearPage',
      'clearFixed',
    );
  }

  fixed(data) {
    return this.create({...data, position: 'fixed'});
  }

  fixedBottom(data) {
    return this.fixed({...data, type:'bottom', sticky: true });
  }

  inline(data) {
    return this.create({ ...data, position: 'inline' });
  }

  inlineError(data) {
    return this.inline({ ...data, type: 'error', sticky: true });
  }

  inlineInfo(data) {
    return this.inline({ ...data, type: 'info', sticky: true });
  }

  inlineSuccess(data) {
    return this.inline({ ...data, type: 'success', sticky: false });
  }

  inlineWarning(data) {
    return this.inline({ ...data, type: 'warning', sticky: true });
  }

  page(data) {
    return this.create({ ...data, position: 'page' });
  }

  pageError(data) {
    return this.page({ ...data, type: 'error', sticky: true });
  }

  pageInfo(data) {
    return this.page({ ...data, type: 'info', sticky: true });
  }

  pageSuccess(data) {
    return this.page({ ...data, type: 'success', sticky: false });
  }

  pageWarning(data) {
    return this.page({ ...data, type: 'warning', sticky: true });
  }
}
