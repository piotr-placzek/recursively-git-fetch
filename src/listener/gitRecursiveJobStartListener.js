'use strict';

const loggerService = require('../service/loggerService');

function handler(message) {
    loggerService.log('Found', message.length, 'repositories.');
}

module.exports = handler;
