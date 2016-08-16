import alt from 'app/alt.js';
import { bind, createStore, datasource } from 'alt-utils/lib/decorators';

import { PretendActions } from 'app/actions/index.js';
import { PretendSource } from 'app/sources/index.js';
import { QueryStore } from 'app/stores/index.js';
import BaseStore from './base.js';

@createStore(alt)
@datasource(PretendSource)
export default class PretendStore extends BaseStore {
  constructor() {
    super();
  }
  @bind(CompareActions.FETCHING)
  loading(){
    this.setLoadingState();
  }

  @bind(CompareActions.GET_SUCCESS)
  updateCompare(state){
    this.results = state.body;
  }

  @bind(CompareActions.GET_SUCCESS)
  updateHistory(state){
    this.pushHistory('compare', state.body);
  }

  @bind(CompareActions.UPDATE)
  update(state){
    this.results = state;
  }
  @bind(CompareActions.GET_FAILED)
  getFailed(state){
    this.error = true;
  }

  static getData(params) {
    //downside of doing this is that different ordered users will hit the backend again
    let compareKey = `compare.${params.tab}.${params.user1}.${params.user2}`;
    compareKey += params.user3 ? params.user3 : '';
    this.state.retrieve('compare', compareKey, CompareActions.update, this.get, params);
  }

}
