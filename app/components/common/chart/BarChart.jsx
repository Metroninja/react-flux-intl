import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import { AppStore } from 'app/stores/index.js';
import { Text } from 'app/components/common/index.js';

@connectToStores  
export default class BarChart extends Component {
  
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    data: PropTypes.array,
    dataClick: PropTypes.func,
    label: PropTypes.string,
    barLabel: PropTypes.string,
    barRatio: PropTypes.number,
    xKey: PropTypes.string,
    xWdith: PropTypes.number,
    rotate: PropTypes.bool,
    colors: PropTypes.array,
    colorsIndex: PropTypes.number,
    text: PropTypes.object.isRequired,
    legendHeight: PropTypes.number,
    height: PropTypes.number,
  };

  static defaultProps = {
    rotate: false,
    barLabel: '',
    xKey: '',
    legendHeight: 30,
    height: 220
  }

  static contextTypes = {
    intl: PropTypes.object.isRequired
  }

  static getStores() {
    return [AppStore];
  }

  static getPropsFromStores() {
    return {
      text: AppStore.getState().text,
    };
  }
  //@TODO - need to watch for componentUpdates to re-render the chart

  componentDidMount() {
    this.renderChart();      
  }

  componentDidUpdate(prevProps, prevState) {
    if(!isEqual(this.props.data, prevProps.data)) {
      this.renderChart();
    }  
  }

  renderChart() {
    const { formatMessage } = this.context.intl;
    const label = this.props.label ? formatMessage(this.props.text[this.props.label]) : '';
    const barLabel = this.props.barLabel ? formatMessage(this.props.text[this.props.barLabel]) : '';
    //c3 needs to be required after render, app won't compile server side otherwise since c3 requires window reference
    //see http://c3js.org/reference.html for reference on charts
    const c3 = require('c3');

    let chart = {
      bindto: `#${this.props.id}`,
      size: {
        height: this.props.height,
      },
      data: {
        columns: this.props.data,
        type: 'bar',
        labels: {
          format: (v, id, i, j) => { return `${v} ${barLabel}`},
        },
      },
      color: {
        pattern: this.props.colors,
      },
      axis: {
        y: {
          show: false,
        },
        x: { 
          type: 'category',
          tick: {
            outer: false,
          },
          height: this.props.legendHeight,
        }
      },
      legend: {
        show: false
      },
      tooltip: {
        show: false,
      },
      padding: {
        bottom: 10
      }
    };
    //if there is a chart label, display said chart label
    if(label){
      chart.axis.x.label = {
        text: label,
        position: 'outer-center' 
      };
    }
    //spacing each bar takes up, controls spacing between each bar.  value from 0-1
    if(this.props.barRatio){
      chart.bar = {width: { ratio: this.props.barRatio }};
    }
    //if we have custom strings for the x axis passed in to the data set
    //the first value of the array will have a key, this is that key so use it
    if(this.props.xKey){
      if(this.props.xKey){
        chart.data.x = this.props.xKey;
        chart.axis.x.culling = false;
      }
    }
    //if we have an onclick data function, bind it to the data set
    if(this.props.dataClick){
      chart.data.onclick = this.props.dataClick;
    }
    //rotate the x axies to be vertical if passed in
    if(this.props.rotate) {
      chart.axis.rotated = true;
    }
    //if we xWidth it means we want to control the width of the x axis label so set it.
    if(this.props.xWidth) {
      chart.axis.x.tick.width = this.props.xWidth;
    }

    //if we have a colorsIndex, it means we want the graph to be a 50/50 color split.
    //at said colorsIndex key, we will change the color to the second value of the colors array
    if(this.props.colorsIndex){
      delete chart.color;
      chart.data.color = ( color, d ) => {
        return this.props.colors[d.index > this.props.colorsIndex ? 1 : 0];
      }
    }
    c3.generate(chart);
  }

  render() {
    const classes = classNames('bar-chart moz-chart', this.props.className );
    return (
      <div className={classes} id={this.props.id}>
      </div>
    );
  }
};
