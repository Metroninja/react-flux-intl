import classNames from 'classnames';
import React, { PropTypes } from 'react';

const AlertInline = ({ children, className, type }) => (
  <div className={classNames('alert-inline', className, type)}>
    <span className="alert-icon"></span>
    <div className="alert-content">{children}</div>
  </div>
);

AlertInline.propTypes = {
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf([
    'inline',
    'page',
  ]),
  style: PropTypes.oneOf([
    'error',
    'warning',
    'success',
    'info',
  ]),
};

export default AlertInline;
