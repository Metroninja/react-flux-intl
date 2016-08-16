import { isEmpty, remove } from 'lodash';
import alt from 'app/alt.js';
import { bind, createStore, datasource } from 'alt-utils/lib/decorators';

import { DownloadsActions } from 'app/actions/index.js';
import { ExportsSource } from 'app/sources/index.js';
import BaseStore from './base.js';

@createStore(alt)
@datasource(DownloadsSource)
export default class DownloadsStore extends BaseStore {
  constructor() {
    super();
    this.active = [];
    this.complete = [];
    this.metaData = {};
    this.success = false;
    this.polling = false;
  }
  
  @bind(DownloadsActions.FETCHING)
  loading(){
    this.setLoadingState();
    this.success = false;
  }

  @bind(DownloadsActions.GET_FAILED)
  errors(state){
    this.error = true;
  }

  @bind(DownloadsActions.GET_SUCCESS)
  getSuccess(state){
    this.results = state.body;
  }

  /***
    @param format (string) - the format of the download, csv or xls
    @param filterCount (int) - the count of filters used (ex 3)
    @param size (string) - the aproximate size of the download (ex 2MB)
  ***/
  @bind(DownloadsActions.SET_META)
  postData(params){
    this.metaData = params;
  }
  
  @bind(DownloadsActions.POST_SUCCESS)
  postSuccess(state){
    this.success = true;
    // take the metaData, add the location url, reset the metaData, push 
    // the new active data to the active downloads
    let active = this.metaData;
    this.metaData = {};
    active.url = state.headers.location;
    this.active.push(active);
    const self = this;
    //if there isn't already in inflight polling, kick off the polling process
    if(!this.polling) {
      //mark polling as happening, kick one off in a few seconds
      this.polling = true;
      setTimeout(() => {
        self.pollData();
      },3000);
    }
  }

  @bind(DownloadsActions.POLL_SUCCESS, DownloadsActions.POLL_FAILED)
  pollAfter(state){
    //if this poll was successful, kick off the download, remove it from the active list.
    console.log('poll after count of active', this.active.length);
    if(state.status === 200){
      //download
      location.href = state.req.url;
      //remove the download from the active list
      let complete = remove(this.active, (item) => {
        return item.url === state.req.url;
      });
      //add download to complete list
      this.complete = this.complete.concat(complete);
      console.log('we have a completed download (active/complete)', this.active, this.complete);
    } else if (state.status === 404 && !this.polling){
      //not ready yet.  if we haven't already kicked off another
      //polling pass in a different action lets do so now.
      this.polling = true;
      let self = this;
      //wait 5 seconds to ensure all other poll requests are cleared
      //even though they are probably done in less than 500ms
      console.log('polling is going to kick off again');
      setTimeout(() => {
        self.pollData(this.active);
      }, 5000);
    }
  }

  @bind(DownloadsActions.FETCHING, DownloadsActions.UPDATE)
  resetSuccess() {
    this.success = false;
  }

  pollData(){
    //double check we should be polling
    console.log('poll data function', this.active, this.polling);
    if(!isEmpty(this.active) && this.polling) {
      for(let active of this.active){
        console.log('polling for ', active);
        this.getInstance().poll(active);
      }
    }
    //disable polling so the next time around we can start it back up.
    this.polling = false;

  }
}
