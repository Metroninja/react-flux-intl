import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';
import { AppStore } from 'app/stores/index.js';
import { Text, OmniSearch } from 'app/components/common/index.js';
import { QueryActions } from 'app/actions/index.js';


@connectToStores
export default class Homepage extends Component {
  static propTypes = {
    routes: PropTypes.object.isRequired,
  };

  static getStores() {
    return [AppStore];
  }

  static getPropsFromStores() {
    return {
      routes: AppStore.getState().routes,
    };
  }

  componentDidMount() {
    QueryActions.empty();
  }
  render() {
    return (
      <div className="layout-homepage">
        <section className="homepage-upper">
          <div className="container">
            <h2 className="heading">
              <Text message="HOMEPAGE_HEADER" />
            </h2>
            <OmniSearch autofocus />
          </div>
        </section>
      </div>
    );
  }
};
