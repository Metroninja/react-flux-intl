import { isEmpty } from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';
import { FormattedDate } from 'react-intl';

import { AlertActions, ModalActions, QueryActions } from 'app/actions/index.js';
import { AppStore, UserStore, QueryStore } from 'app/stores/index.js';
import { Alerts, DropdownSelect, Icon, MiniSocialDetails, OmniSearch, PopUpMenu, Text, Title } from 'app/components/common/index.js';
import Link from 'app/components/navigation/Link.jsx';
import routes from 'app/constants/routes';
import RemoveAccount from 'app/components/modals/RemoveAccount.jsx';


@connectToStores
export default class Dashboard extends Component {

  static propTypes = {
    user: PropTypes.object,
    //params will be /:status/:user, used for redirect backs from /adding/removing accounts
    params: PropTypes.object,
    text: PropTypes.object.isRequired,
  };

  static contextTypes = {
    intl: PropTypes.object.isRequired,
    router: PropTypes.object,
  };

  static getStores() {
    return [AppStore, UserStore];
  }

  static getPropsFromStores() {
    return {
      user: UserStore.getState().user,
      text: AppStore.getState().text,
    };
  }

  componentWillMount() {
    let users = QueryStore.getUsers();
    if(users.indexOf(this.props.params.user)){
      QueryActions.empty(); 
    }
    const { formatMessage } = this.context.intl;
    const options = [
      { value: 'add_twitter', text: formatMessage(this.props.text.DASHBOARD_ADD_TWITTER_USER) }
    ];
    this.setState({
      options,
      selected: { value: 'default', text: formatMessage(this.props.text.DASHBOARD_DROPDOWN_SELECTED_STATE) }
    });
  }

  componentDidMount() {
    const params = this.props.params;
    //so the backend returns a status and a user PID based on how the oauth went.  this lets us know the state
    if(!isEmpty(params.status)){
      //see what kind of alert to throw based on the status
      switch(params.status){
        case 'added':
          // look up user scrn by pid
          AlertActions.pageSuccess({message: 'ALERT_TWITTER_ACCOUNT_ADDED', page: 'dashboard', sticky: false});
          break;
        default:
          console.log('state is not accounted for yet'); 
          break;
      }
    }
  }  

  transitionTo(scrn) {
    this.context.router.push({pathname: `${routes.app.USER_OVERVIEW}/${scrn}`, state: null});
  }

  addTwitter(){
    const path = AppStore.apiRoute('TWITTER');
    const { origin } = window.location;
    const basename = AppStore.getBasename();
    const component = AppStore.getRoute('DASHBOARD');
    //twitter oauth's take place on a page load, so actually navigate to the backend so it can setup the 
    //oauth token redirect.  it will send us back here with status when complete
    window.location.href= `${path}?redirect=${origin}${basename}${component}`;
  }

  optionSelected(option) {
    console.log('option selected', option)
    switch(option.value){
      case 'add_twitter':
        this.addTwitter();
        break;
      default:
        break;
    }
  }

  removeAccount(account){
    ModalActions.activate({
      title: 'DASHBOARD_REMOVE_ACCOUNT_TITLE',
      content: (
        <RemoveAccount
          profile={account}
        />
      ),
    });
  }

  renderTrackedUser(user,index){
    user.tracked = true;
    return this.renderUserCard(user, index, true);
  }
  renderAuthedUser(user, index){
    user.tracked = false;
    return this.renderUserCard(user, index, false);
  }

  renderUserCard(user, index, tracked = false){
    const { formatMessage } = this.context.intl;
    return (
      <div className="gutter" key={index}>
        <div className="user-card pointer">
          <div className="image-center pointer" onClick={this.transitionTo.bind(this, user.scrn)}>
            <img src={user.profile_image_url.replace('_normal', '')} className="user-image"  />
            {tracked ? <span className="tag-standard teal"><Text message="DASHBOARD_TRACKED_INFLUENCER" /></span> : null}
          </div>
          <div className="card-content" onClick={this.transitionTo.bind(this, user.scrn)}>
            <div className="align bottom1">
              <div className="basic-info">
                <h4 className="user-full-name top0 bottom0 align blue">
                  {user.fulln}
                </h4>
                <div className="user-social top0 bottom0">
                  {`@${user.scrn}`}
                </div>
              </div>
              <div className="right-content"><Icon name="moz-twitter" className="core-blue" /></div>
            </div>
            <MiniSocialDetails profile={user} />
          </div>
          <div className="card-footer align">
            <div>
              <Text message="DASHBOARD_UPDATED" />&nbsp;
              <FormattedDate 
                value={parseInt(user.lchk * 1000)} 
                year="numeric" 
                month="2-digit" 
                day="2-digit"
                hour="numeric"
                minute="numeric"
              />
            </div>
            <PopUpMenu 
              className="right-content"
              menuItems={[
                {text: formatMessage(this.props.text.DASHBOARD_REMOVE), action: this.removeAccount.bind(this,user) }
              ]}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    const wonkData = this.props.user.wonk_data || {users: [], tracking: []};
    const accountsAvailable = 10;
    const accountsRemaining = isEmpty(wonkData) ? 10 : accountsAvailable - wonkData.users.length - wonkData.tracking.length;
    return (
      <div className="layout-dashboard">
        <section className="layout-upper">
          <div className="container">
            <OmniSearch />
          </div>
        </section>
        <section className="layout-lower container">
          <div className="align">
            <h2 className="h2 alt flex top0 bottom2"><Text message="DASHBOARD_HEADER" /></h2>
            <DropdownSelect 
              className="right-content" 
              type="dropdown"
              itemClassName="link"
              options={this.state.options}
              onChange={this.optionSelected.bind(this)}
              selected={this.state.selected}
            />
          </div>
          <hr  className="bottom2"/>
          <div className='limits-info bottom5'>
            <strong>{accountsRemaining}&nbsp;<Text message="OF" />&nbsp;{accountsAvailable}</strong>&nbsp;
            <Text message="DASHBOARD_ACCOUNTS_REMAINING" />
          </div>
          <div className="bottom2"> 
            <Alerts />
          </div>
          <div className="user-cards grid">
            {wonkData.users.map(this.renderAuthedUser, this, false)}
            {wonkData.tracking.map(this.renderTrackedUser, this,)}
          </div>
        </section>
      </div>
    );
  }
};
