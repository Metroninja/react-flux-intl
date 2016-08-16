import _ from 'lodash';
import qs from 'qs';
import alt from 'app/alt';
import { bind, createStore } from 'alt-utils/lib/decorators';
import { QueryActions } from 'app/actions/index';
import routes from 'app/constants/routes';

@createStore(alt)
export default class QueryStore {
  constructor() {
    this.query = '';
    this.rawInput = '';
    this.on('bootstrap', () => {
      this.filters = {
        Location: [],
        Name: [],
        Website: [],
        orderBy: 'social_authority',
        orderType: 'desc',
        followers: {min: 0, max: 1000000},
        following: {min: 0, max: 1000000},
        tweets: {min: 0, max: 1000000},
        engagement: {min: 0, max: 100},
        sa: {min: 0, max: 100},
      };
      this.users = [];
      this.history = [];
      this.input = '';
      this.transition = routes.app.PROFILE_SEARCH;
      this.page = 1;
      //if we have a query, deconstruct it
      if(this.query){
        this.loadQuery(this.query);
      }
    });
  }
  @bind(QueryActions.UPDATE_BUILD)
  updateBuildQuery(query) {
    this.updateSearch(query);
    this.buildQuery();
    this.updateQueryHistory(this.query);
  }

  @bind(QueryActions.LOAD_QUERY)
  loadQuery(query) {
    let queryObj = qs.parse(query);
    //check and see if someone broke the queryObj, if so start over
    if(_.isEmpty(queryObj) || _.isEmpty(queryObj.filters) || _.isEmpty(queryObj.filters)){
      //@TODO - need to send them elsewhere.  maybe set the transition to root and
      //read that in profile search, pop and alert to not mess with the query string
    }
    this.input = this.rawInput = queryObj.input;
    this.page = parseInt(queryObj.page) || 1;
    this.filters.Location = queryObj.filters.Location || [];
    this.filters.Name = queryObj.filters.Name || [];
    this.filters.Website = queryObj.filters.Website || [];
    this.filters.orderBy = queryObj.filters.orderBy;
    this.filters.orderType = queryObj.filters.orderType;
    this.filters.followers = queryObj.filters.followers || {min: 0, max: 1000000};
    this.filters.following = queryObj.filters.following || {min: 0, max: 1000000};
    this.filters.tweets = queryObj.filters.tweets || {min: 0, max: 1000000};
    this.filters.engagement = queryObj.filters.engagement || {min: 0, max: 100};
    this.filters.sa= queryObj.filters.sa || {min: 0, max: 100};


    this.users = queryObj.users || [];
    this.buildQuery();
  }

  @bind(QueryActions.UPDATE)
  update(input) {
    this.updateSearch(input);
  }

  buildQuery(){
    //encode our query
    this.query = qs.stringify({
      input: this.input, 
      users: this.users, 
      filters: this.filters,
      page: this.page,
    });
  }

  updateSearch(input) {
    input = input.trim();
    this.rawInput = input;
    //check if we are doing a user search, or profile search
    if(input.charAt(0) === '@' || this.users.length > 0) {
      //user compare or search
      //make sure everything is prepended with an @
      if(input) {
        let newProfiles = _.map(input.split(' '),  (item) => {
          return item.charAt(0) === '@' ? item.substring(1) : item;
        });
        this.users = this.users.concat(newProfiles);
      }
      //remove all duplicates
      this.users = _.uniq(this.users);
      //profile count must be 3 or less
      if(this.users.length > 3) {
        //show and alert that we removed the last X entries
        this.users = _.slice(this.users, 0, 3);
        //remove extra users from query as well
      }
      //user object will be rendered, input is 2 way bound so clear it out
      this.input = '';
      //update filter to default to followers
      this.filters.orderBy = 'social_authority';
      //validate if twitter user search or comparison
      this.transition = this.users.length > 1 ? 
        `${routes.app.USER_COMPARE}/followers/${this.users.join('/')}` : 
        `${routes.app.USER_OVERVIEW}/${this.users[0]}`;
    } else {
      //profile serarch
      this.input = input;
      this.users = [];
      //twitter profile search
      this.transition = routes.app.PROFILE_SEARCH;
    }
  }

  @bind(QueryActions.EMPTY)
  empty() {
    this.input = this.rawInput = '';
    this.users = [];
    this.page = 1;
    this.filters = {
      Location: [],
      Name: [],
      Website: [],
      orderBy: 'social_authority',
      orderType: 'desc',
      followers: {min: 0, max: 1000000},
      following: {min: 0, max: 1000000},
      tweets: {min: 0, max: 1000000},
      engagement: {min: 0, max: 100},
      sa: {min: 0, max: 100},
    }
  }

  @bind(QueryActions.REMOVE_USER)
  removeUser(user) {
    this.users = this.users.filter( (item) => {
      return item !== user;
    });
  }

  @bind(QueryActions.ADD_USER)
  addUser(user){
    if(user) {
      user = user.charAt(0) === '@' ? user.substring(1) : user;
      //if they put in two users, clear it
      this.users = this.users.concat(user.split(" ")[0]);
      
      //remove all duplicates
      this.users = _.uniq(this.users);
      //profile count must be 3 or less
      if(this.users.length > 3) {
        //show and alert that we removed the last X entries
        this.users = _.slice(this.users, 0, 3);
        //remove extra users from query as well
      }
    }
  }

  @bind(QueryActions.SET_USER)
  setUser(user){
    this.users = typeof(user) === "object" ? user : [user];
    this.input = this.rawInput = '';
    this.page = 1;
    this.filters = {
      Location: [],
      Name: [],
      Website: [],
      orderBy: 'social_authority',
      orderType: 'desc',
      followers: {min: 0, max: 1000000},
      following: {min: 0, max: 1000000},
      tweets: {min: 0, max: 1000000},
      engagement: {min: 0, max: 100},
      sa: {min: 0, max: 100},
    }
  }

  @bind(QueryActions.HANDLE_CHANGE)
  handleChange(value) {
    this.input = value;
  }

  @bind(QueryActions.UPDATE_FILTER)
  updateFilter(filter) {

    this.filters[filter.name].push(filter.value);
    //strip any duplicates
    this.filters[filter.name] = _.uniq(this.filters[filter.name]);
    this.buildQuery();
  }

  @bind(QueryActions.UPDATE_PAGE)
  updatePage(page) {
    this.page = page;
    this.buildQuery();
    this.updateQueryHistory(this.query);
    
  }

  @bind(QueryActions.UPDATE_SLIDER_VALUE)
  updateSliderValue(params){
    this.filters[params.type].min = parseInt(params.values[0]);
    this.filters[params.type].max = parseInt(params.values[1]);
    this.buildQuery();
  }

  @bind(QueryActions.UPDATE_SORT)
  updateSort(order) {
    this.filters.orderBy = order.by;
    this.filters.orderType = order.type;
    this.buildQuery();
    this.updateQueryHistory(this.query);
  }

  @bind(QueryActions.REMOVE_FILTER)
  removerFilter(filter) {
    this.filters[filter.name] = _.filter(this.filters[filter.name], (item) => {
      return item !== filter.value;
    });
    this.buildQuery();
  }

  updateQueryHistory(query) {
    // remove current query from history.
    this.history = this.history.filter( (item) => {
      return item.query !== query;
    });

    // add previous query to history.
    if (this.query !== query && this.query !== '') {
      this.history = this.history.concat({
        query: this.query,
        users: this.users,
      });
    }
  }
  static getQuery() {
    return this.state.query;
  }
  static getInput() {
    return this.state.input;
  }
  static getUsers(){
    return this.state.users;
  }
}
