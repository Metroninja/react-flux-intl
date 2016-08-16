import classNames from 'classnames';
import React, { PropTypes } from 'react';
import { Text } from 'app/components/common/index';

const AlertStatic = ({ text, className, type, style }) => (
  <div className={classNames(`alert-${style}`, className, type)}>
    <span className="alert-icon"></span>
    <div className="alert-content">
      <Text message={text} />
    </div>
  </div>
);

AlertStatic.propTypes = {
  text: PropTypes.string,
  style: PropTypes.oneOf([
    'inline',
    'page',
  ]),
  type: PropTypes.oneOf([
    'error',
    'warning',
    'success',
    'info',
  ]),
};

export default AlertStatic;
