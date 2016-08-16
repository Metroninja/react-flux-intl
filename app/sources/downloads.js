import _ from 'lodash';
import request from 'superagent';

import { AppStore, QueryStore } from 'app/stores/index.js';
import { DownloadsActions } from 'app/actions/index.js';

export default {

  get: {
    remote(state, params={}) {
      const path = AppStore.apiRoute('EXPORTS');
      return request
        .get(`${path}`)
        .set('Accept', 'application/json')
        .withCredentials();
    },
    loading: DownloadsActions.fetching,
    success: DownloadsActions.getSuccess,
    error: DownloadsActions.getFailed,
  },
  post: {
    remote(state, params={}) {
      const { filters, input, page  } = QueryStore.getState();
      const path = AppStore.apiRoute('EXPORTS');
      return request.post(`${path}`)
        .set('Accept', 'application/json')
        .send({
          format: params.format || "csv",
          all: input,
          order_by: filters.orderBy,
          order_type: filters.orderType,
          loc: _.join(filters.Location, "|"),
          fulln: _.join(filters.Name, "|"),
          web: _.join(filters.Website.map( (item) => 
            {
              return item.replace(/.*?:\/\//g, "");
            }), "|"),
          flmin: filters.followers.min,
          flmax: filters.followers.max < 1000000 ? filters.followers.max : "",
          frmin: filters.following.min,
          frmax: filters.following.max < 1000000 ? filters.following.max :  "",
          stctmin: filters.tweets.min,
          stctmax: filters.tweets.max < 1000000 ? filters.tweets.max : "",
          inflmin: filters.sa.min,
          inflmax: filters.sa.max < 100 ? filters.sa.max : "",
          page: page
        })
        .withCredentials();
    },
    loading: DownloadsActions.posting,
    success: DownloadsActions.postSuccess,
    error: DownloadsActions.postFailed,
  },
    poll: {
    //This will not work in dev environment, pdfit can't get to your local dev environment
    remote(state, params={}) {
      //pdfit can't connect to your dev environment so send it to the ise if your on dev
      return request
        .get(`${params.url}`)
        .set('Accept', 'application/json')
        .withCredentials();
    },
    loading: DownloadsActions.polling,
    success: DownloadsActions.pollSuccess,
    error: DownloadsActions.pollFailed,
  }

}
