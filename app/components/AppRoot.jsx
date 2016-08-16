import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';
import { injectIntl } from 'react-intl';

import Layout, { Masthead } from 'app/components/common/Layout.jsx';
import { AppStore } from 'app/stores/index.js';
import SubNav from 'app/components/navigation/SubNav.jsx';
import { Alerts, Modal } from 'app/components/common/index';

@injectIntl
export default class AppRoot extends Component {
  static propTypes = {
    body: PropTypes.element,
    children: PropTypes.element,
    history: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    masthead: PropTypes.element,
    transition: PropTypes.string,
  }

  static childContextTypes = {
    intl: PropTypes.object,
    location: PropTypes.object,
    routes: PropTypes.object,
  };

  getChildContext() {
    return {
      intl: this.props.intl,
      location: this.props.location,
      routes: AppStore.getRoutes(),
    };
  }

  renderBody() {
    if (this.props.body) {
      return <Layout children={this.props.body} sidenav={this.props.sidenav} />;
    } else {
      return this.props.children;
    }
  }

  renderMasthead() {
    if (this.props.masthead) {
      return <Masthead children={this.props.masthead} />;
    }
  }
  render() {
    return (
      <section>
        <SubNav />
        {this.renderMasthead()}
        {this.renderBody()}
        <Modal />
        <Alerts position="fixed" />
      </section>
    );
  }
}
