import Alt from 'alt';
import chromeDebug from 'alt-utils/lib/chromeDebug';

const alt = new Alt();

if ('production' !== process.env.NODE_ENV) {
  /*eslint-disable */

  // supress warnings to display dispatcher messages during development.
  alt.dispatcher.register(console.log.bind(console));
  /*eslint-enable */

  chromeDebug(alt);

}

export default alt;
