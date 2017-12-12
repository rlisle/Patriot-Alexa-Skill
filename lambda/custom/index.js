'use strict';

const main = require('./src/main');
const config = require('./config');

function handler(event, context) {
    main.handler(event, context, config);
}

module.exports = {
    handler:handler
};
