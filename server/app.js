/*eslint-disable */
console.time('start time');
/*eslint-enable */

require('babel-register')({
  extensions: ['.js', '.jsx'],
  only: /app/,
});

const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const expressReactViews = require('express-react-views');
const responseTime = require('response-time');

const http = require('http');
http.globalAgent.maxSockets = 500;

var app;
module.exports = app = express();

app.enable('trust proxy');
app.disable('x-powered-by');

app.use(bodyParser.json({ strict: true }));
app.use(compression());
app.use(responseTime());

app.set('views', `${process.cwd()}/app`);
app.set('view engine', 'jsx');
app.engine('jsx', expressReactViews.createEngine({ transformViews: false }));

require('server/locals')(app);
require('server/assets')(app);
require('server/routes')(app);

if (require.main === module) {
  app.listen(process.env.APP_PORT, function() {
    if (process.env.NODE_ENV === 'development') {
      require('server/webpack');
    }

    /*eslint-disable */
    console.log(`Chimera: NODE_ENV=${process.env.NODE_ENV} PORT=${process.env.APP_PORT}`);
    console.timeEnd('start time');
    /*eslint-enable */
  });
}
