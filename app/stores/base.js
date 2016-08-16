
export default class BaseStore {
  constructor() {
    this.on('init', () => {
      this.history = {};
      this.results = {};
      this.keys = {};
      this.error = false;
    });
  }

  setLoadingState(){
    this.results = {};
    this.error = false;
  }

  pushHistory(id, state){
    let key = btoa(this.keys[id]);
    this.history[key] = { data: state, timestamp: Date.now() };
  }


  retrieve(id, query, Action, fetchMethod, params={}) {
    let key = btoa(query);
    let existing = this.history[key];
    let old = Date.now() - (20*60*1000);
    if(params.tab){
        this.tab = params.tab;
      }
    //check if we have fetched before and it's over 20 minutes old
    if(existing && existing.timestamp >= old ? existing.data : null){
      this.setLoadingState();
      Action(existing.data);
    } else {
      this.keys[id] = query;
      fetchMethod(params);
    }
  }

}
