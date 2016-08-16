import React, { Component } from 'react';

export default class NotFound extends Component {
  render() {
    return (
      <div className="container layout-not-found">
        <hgroup>
          <h2 className="alt">{'The page you are looking for cannot be found.'}</h2>
          <h4 className="alt">{'We are very sorry for the inconvenience.'}</h4>
        </hgroup>
      </div>
    );
  }
}
