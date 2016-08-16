FROM node:5.10.1
MAINTAINER Roger Mozbot <roger.mozbot@moz.com>

# Global NPM Packages
RUN npm install -g webpack nodemon --silent

ENV SOURCE /src
ENV NODE_PATH=$SOURCE

ENV APP_PORT=3000
EXPOSE $APP_PORT

WORKDIR $SOURCE
ADD . $SOURCE

RUN npm install --loglevel warn --slient
RUN npm run bundle
CMD npm start
