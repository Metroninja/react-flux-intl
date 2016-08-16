import alt from 'app/alt';
import { createActions } from 'alt-utils/lib/decorators';
import { AlertActions } from 'app/actions/index.js';
import DownloadAlert from 'app/components/common/alerts/Download.jsx';

@createActions(alt)
export default class ExportsActions {
  constructor() {
    this.generateActions(
      'fetching',
      'polling',
      'posting',
      'setMeta',
      'getSuccess',
      'pollSuccess',
      'pollFailed',
      
    );
  }
  postSuccess(state){
    AlertActions.fixedBottom({
      message: 'EXPORT_PREPERATION_NOTIFICATION', 
      values: {loading: true}, 
      component: DownloadAlert,
      dismissible: false,
    });
    return state;
  }
  getFailed(state) {
    switch(state.status){
      case 403:
        AlertActions.pageError({ message: 'ALERT_PROFILE_FORBIDDEN_ERROR', page: 'exports' });
        break;
      default:
        AlertActions.pageError({ message: 'ALERT_GENERIC', page: 'exports' });
        break;
    }
    return state;
  }
  postFailed(state) {
    switch(state.status){
      case 403:
        AlertActions.pageError({ message: 'ALERT_PROFILE_FORBIDDEN_ERROR' });
        break;
      default:
        AlertActions.pageError({ message: 'ALERT_GENERIC' });
        break;
    }
    return state;
  }
}