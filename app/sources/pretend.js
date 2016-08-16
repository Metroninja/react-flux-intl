import request from 'superagent';

import { AppStore, QueryStore } from 'app/stores/index.js';
import { PretendActions } from 'app/actions/index.js';

export default {

  get: {
    remote(state, params={}) {
      const path = AppStore.apiRoute('COMPARE');
      let users = `${params.user1}/${params.user2}`;
      users += params.user3 ? `/${params.user3}` : '';
      const filter = params.tab === 'followers' ? 'fl' : 'fr';
      let qs = `${users}?op=${filter}`;
      return request.get(`${path}/${qs}`).withCredentials();
    },
    loading: PretendActions.fetching,
    success: PretendActions.getSuccess,
    error: PretendActions.getFailed,
  }
}