import alt from 'app/alt.js';
import { concat, filter, find, get, isEmpty, merge, reject } from 'lodash';
import { bind, createStore } from 'alt-utils/lib/decorators';

import { AlertActions } from 'app/actions/index.js';

@createStore(alt)
export default class AlertsStore {
  constructor() {
    this.alerts = [];
  }

  @bind(AlertActions.EMPTY)
  clearAlerts() {
    this.alerts = filter(this.alerts, ['sticky', true]);
  }

  @bind(AlertActions.CREATE)
  addAlert(alert) {
    //message hash is a placeholder 'constant' key so we use it to 
    //store messages by said type.
    const id = typeof(alert.message) === 'object' ? 
      `${alert.message.join('.')}.${alert.position}` : 
      `${alert.message}.${alert.position}`;
    const alertExists = find(this.alerts, ['id', id]);

    if (!alertExists) {
      //@TODO - maybe we should check to see what page we are on, and only add the alert
      //if we are still on this page (for quick successive back navigration)
      alert.id = id;
      this.alerts = concat(this.alerts, alert);
      //if warning or success, auto hide feature
      if (alert.type !== 'error' && !alert.sticky) {
        setTimeout( ()=> {
          AlertActions.remove(id);
        }, 5000);
      }
    }
  }

  @bind(AlertActions.CLEAR_FIXED)
  clearFixed(data) {
    if(isEmpty(data)) {
      this.alerts = reject(this.alerts, ['position', 'fixed'] );
    } else {
      this.alerts = reject(this.alerts, {position: 'fixed', type: data.type});
    }
  }
  @bind(AlertActions.CLEAR_PAGE)
  clearPage(data) {
    //need to check if data is array or string. if array reject all of em
    this.alerts = reject(this.alerts, (alert) => {
      return get(alert, 'page') == data.page;
    });
  }

  @bind(AlertActions.REMOVE)
  removeAlert(id) {
    this.alerts = reject(this.alerts, ['id', id]);
  }

}
