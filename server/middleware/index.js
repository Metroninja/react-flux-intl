'use strict';

let fs = require('fs');

for (const file of fs.readdirSync(__dirname)) {
  const basename = file.split('.').shift();

  if (basename !== 'index') {
    exports[basename] = require(`./${file}`);
  }
}
