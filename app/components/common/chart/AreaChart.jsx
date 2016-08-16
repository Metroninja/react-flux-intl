import { isEqual } from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import connectToStores from 'alt-utils/lib/connectToStores';
import { injectIntl } from 'react-intl';
import { AppStore } from 'app/stores/index.js';
import { Text } from 'app/components/common/index.js';

@connectToStores  
export default class AreaChart extends Component {
  
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    data: PropTypes.array,
    gridLines: PropTypes.array,
    groups: PropTypes.array,
    label: PropTypes.string,
    customLegend: PropTypes.bool,
    xKey: PropTypes.string,
    xIsCategory: PropTypes.bool,
    range: PropTypes.number,
    showLegend: PropTypes.bool,
    showPoint: PropTypes.bool,
    colors: PropTypes.array,
    text: PropTypes.object.isRequired,
    height: PropTypes.number,
  };

  static defaultProps = {
    groups: [],
    gridLines: [],
    xKey: '',
    xIsCategory: false,
    showLegend: true,
    showPoint: false,
    customLegend: false,
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

  //since a graph with 30 or 60 items has too many ticks, we will render our own legend
  //showing just begining and end values from the x axis data.
  renderCustomLegend() {
    if(this.props.customLegend){
      return (
        <div className="align custom-legend">
          <div>{this.props.data[0][1]}</div>
          <div className="right-content ">{this.props.data[0][this.props.data[0].length -1]}</div>
        </div>
      );
    } else {
      return null;
    }
  }

  renderChart() {
    const { formatMessage } = this.context.intl;
    const label = this.props.label ? formatMessage(this.props.text[this.props.label]) : '';
    //c3 needs to be required after render, app won't compile server side otherwise since c3 requires window reference
    const c3 = require('c3');

    let chart = {
      //ID the element will be bound to
      bindto: `#${this.props.id}`,
      data: {
        //actual column data passed in as a prop
        columns: this.props.data,
        type: 'area',
        //if there was groupings passed in, group the data (for stacked area charts)
        groups: this.props.groups,
        //data order defaults to desc, if you set it to null it orders it based on how it was passed in
        order: null
      },
      //we want to hide the points of the line graphs
      point: {
        show: this.props.showPoint,
        r: 4
      },
      //custom colors for each graph are passed in as props
      color: {
        pattern: this.props.colors,
      },
      axis: {
        //hide the y axis
        y: {
          show: false,
        },
        x: {
          tick: {
            //show all ticks, don't cull them
            culling: {
              max: 24,
            },
            //for every other tick after 0 show a dot instead of the number
            format: (x) => {return x },
            //hide the outer ticks
            outer: false,
          }
        }
      },
      legend: {
        show: this.props.showLegend
      }
    };
    //if we have a custom height lets set it
    if(this.props.height){
      chart.size = {height: this.props.height};
    }
    //if custom x row data was passed along as a column, then the key for said data
    //should be passed in as the xData prop (ex: 'x');
    if(this.props.xKey){
      chart.data.x = this.props.xKey;
    }
    //if we have a Y value range lets set the min/max
    if(this.props.range){
      let max = this.props.range;
      let min = -this.props.range;
      if(this.props.range < 0){
        min = this.props.range;
        max = -(this.props.range);
      }
      chart.axis.y = {max, min, show: false};
    }
    //if we have custom x data that isn't values, switch it to category display
    if(this.props.xIsCategory){
      chart.axis.x = {type: 'category', tick: {outer: false}};
    }
    //hide the legend if prop says so
    if(this.props.gridLines.length){
      chart.grid = { y: { lines:  this.props.gridLines  } }
    }
    c3.generate(chart);
  }

  render() {
    const classes = classNames('line-chart moz-chart', this.props.className, {'hide-ticks': this.props.customLegend} );
    return (
      <div className={classes}>
        <div id={this.props.id}></div>
        {this.renderCustomLegend()}
      </div>
    );
  }
};
