import React, { Component, PropTypes } from 'react';

import { Text } from 'app/components/common/index';
import Link from 'app/components/navigation/Link.jsx';

export default class InfoModal extends Component {
  static propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    linkText: PropTypes.string,
    linkUrl: PropTypes.string,
  };



  render() {
    return (
        <section className="modal-content">
          <p><Text message={this.props.body} /></p>
          <p>
            <Text message={["MODAL_TIP_MORE_INFO", this.props.title, "MODAL_TIP_VISIT"]} /><br/>
            <Link message={this.props.linkText} to={this.props.linkUrl} />
          </p>
        </section>
      );
  }
}
