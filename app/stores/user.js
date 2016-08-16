import alt from 'app/alt';
import { bind, createStore } from 'alt-utils/lib/decorators';
import { reject } from 'lodash';

import { TwitterActions } from 'app/actions/index.js';


@createStore(alt)
export default class UserStore {
  constructor() {
    this.user = {};
  }

  static getUser() {
    return this.state.user;
  }

  @bind(TwitterActions.DELETE_PROFILE_SUCCESS)
  removeUser(state){
    console.log(state.body);
    //find the pid, reject it from the wonk_data;
    //this.user.wonk_data.users = reject(this.user.wonk_data.users, {pid: state.body.pid})
  }

  @bind(TwitterActions.DELETE_TRACKED_SUCCESS)
  removeTracked(state){
        console.log(state.body);
    //find the pid, reject it from the wonk_data;
    //this.user.wonk_data.tracked = reject(this.user.wonk_data.tracked, {pid: state.body.pid})
  }
}