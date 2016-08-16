import connectToStores from 'alt-utils/lib/connectToStores';
import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

import { UserAnalysisStore, QueryStore } from 'app/stores/index.js';
import { BarChart, Loading, Text } from 'app/components/common/index.js';

export default class Graph extends Component {
  static propTypes = {
    followCountCharts: PropTypes.object,
    rawInput: PropTypes.string,
    className: PropTypes.string,
    renderGraph: PropTypes.element,
    titlePre: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    titlePost: PropTypes.string,
    input: PropTypes.string,
    rightSubTitle: PropTypes.string,
    timezone: PropTypes.string,
    average: PropTypes.number,
    mean: PropTypes.number,
  };

  propDefaults = {
    mean: 0,
    average: 0,
    timezone: ''
  }

  renderAfterMessage(){
    if(this.props.titlePost) {
      return <Text message={this.props.titlePost} />;
    } else {
      return null;
    }
  }
  renderRightText(){
    if(this.props.timezone){
      return (
        <div className="right-content" >
          <Text message="USER_ANALYSIS_TIMEZONE" />:&nbsp;
          {this.props.timezone}
        </div>
      );
    } else if(this.props.average) {
      return (
        <div className="right-content flex" >
          <Text message="USER_ANALYSIS_AVERAGE" />:&nbsp;
          {this.props.average}
          <div className="line-block small"></div>
          <Text message="USER_ANALYSIS_MEDIAN" />:&nbsp;
          {this.props.mean}
        </div>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="align">
          <h4>
            <Text message={this.props.titlePre} />&nbsp;
            {this.props.input}
            {this.renderAfterMessage()}
          </h4>
          {this.renderRightText()}
        </div>
        {this.props.renderGraph}
      </div>
    );
  }
};
