import alt from 'app/alt';
import { createActions } from 'alt-utils/lib/decorators';
import { AlertActions } from 'app/actions/index.js';

@createActions(alt)
export default class PretendActions {
  constructor() {
    this.generateActions(
      'fetching',
      'getSuccess',
      'update',
    );
  }

  fetching(state){
    // clear all alerts related to comparison page before fetch fetch
    AlertActions.clearPage({page: 'compare'});
    return state;
  }

  getFailed(state) {
    //@TODO - watch for 403's and/or 400's, send to previous page data with alert.
    switch(state.status) {
      //example 500 error custom error
      //case 500: 
      //  AlertActions.pageError({ message: 'ALERT_500_ERROR', page: 'pretend' });
      //  break;
      default:
      AlertActions.pageError({ message: 'ALERT_GENERIC', page: 'pretend' });
        break;


    }
    return state;
  }
}
