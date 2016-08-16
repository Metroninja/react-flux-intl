import classNames from 'classnames';
import React from 'react';

export default ({ children }) => (
  <div className="layout">
    <ColumnBody>{children}</ColumnBody>
  </div>
);

export const ColumnBody = ({ children }) => (
  <section className="column-page">{children}</section>
);

export const Masthead = ({ children }) => (
  <header className="masthead">
    <div className="container">
      {children}
    </div>
  </header>
);