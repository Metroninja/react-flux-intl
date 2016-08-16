import { filter, includes, reject } from 'lodash';
import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup';

import { AlertActions } from 'app/actions/index.js';
import { AlertsStore } from 'app/stores/index.js';
import AlertInline from './Inline.jsx';
import AlertPage from './Page.jsx';
import AlertFixed from './Fixed.jsx';

import Text from 'app/components/common/Text.jsx';

@connectToStores
export default class Alerts extends Component {
  static propTypes = {
    alerts: PropTypes.arrayOf(
      PropTypes.shape({
        component: PropTypes.func,
        message: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
        values: PropTypes.object,
      })
    ).isRequired,
    group: PropTypes.string,
    hidden: PropTypes.array,
    only: PropTypes.array,
    position: PropTypes.string,
    keyId: PropTypes.string,
  };

  static defaultProps = {
    hidden: [],
    only: [],
    position: 'page',
  }

  static getStores() {
    return [AlertsStore];
  }

  static getPropsFromStores() {
    return { alerts: AlertsStore.getState().alerts };
  }

  constructor(props) {
    super(props);

    this.state = {
      alerts: this.visibleAlerts(props.alerts),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.alerts.length !== nextProps.alerts.length) {
      this.setState({
        alerts: this.visibleAlerts(nextProps.alerts),
      });
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.alerts.length !== nextProps.alerts.length;
  }

  visibleAlerts(alerts) {
    let visible;
    if (this.props.only.length) {
      visible = filter(alerts, (alert) => {
        return includes(this.props.only, alert.id);
      });
    } else if (this.props.hidden.length) {
      visible = reject(alerts, (alert) => {
        return includes(this.props.hidden, alert.id);
      });
    }
    if (this.props.position === 'inline') {
      visible = filter(alerts, (alert) => {
        if(this.props.group) {
          return alert.position === 'inline' && this.props.group === alert.group;
        } else {
          return alert.position === 'inline';
        }
      });
    } else {
      visible = filter(alerts, (alert) => {
        return alert.position === this.props.position;
      });
    }

    return visible;
  }

  handleClose(message) {
    const id = typeof(message) === 'object' ? message.join('.') : message;
    AlertActions.remove(id);
  }

  //generally render text message, but if we have a special type of alert
  //use special alert component type.
  renderContent(item) {
    if (item.component) {
      return <item.component message={item.message} values={item.values} />;
    } else if (item.message) {
      if(typeof(item.message) === 'object'){
        //need bold and regular part
        return (
          <span>
            <Text message={item.message[0]}  values={item.values} className="strong" />&nbsp;
            <Text message={item.message[1]}  values={item.values} />
          </span>
        );
      } else {
        return <Text message={item.message} values={item.values} />;
      }
    }
  }

  renderAlert(item, index) {
    if (item.position === 'inline') {
      return (
        <AlertInline id={item.id} key={this.props.keyId || item.id} type={item.type}>
          {this.renderContent(item)}
        </AlertInline>
      );
    } else if (item.position === 'page'){
      return (
        <AlertPage
          content={this.renderContent(item)}
          dismissible={item.dismissible}
          id={item.id}
          key={this.props.keyId || item.message}
          onClose={this.handleClose.bind(this, `${item.message}.${item.position}`)}
          type={item.type}
        />
      );
    } else if(item.position === 'fixed'){
      return (
        <AlertFixed
          content={this.renderContent(item)}
          dismissible={item.dismissible}
          id={item.id}
          key={this.props.keyId || item.message}
          onClose={this.handleClose.bind(this, `${item.message}.${item.position}`)}
          type={item.type}
        />
      )
    }
  }

  render() {
    if (this.state.alerts.length) {
      return (
        <section className="alerts-block">
          <ReactCSSTransitionGroup
            transitionEnterTimeout={400}
            transitionLeaveTimeout={200}
            transitionName="alerts"
          >
            {this.state.alerts.map(this.renderAlert, this)}
          </ReactCSSTransitionGroup>
        </section>
      );
    } else {
      return false;
    }
  }
}
