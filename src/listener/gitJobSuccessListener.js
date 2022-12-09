'use strict';

const loggerService = require('../service/loggerService');

function handler(message) {
    loggerService.log('OK', message);
}

module.exports = handler;
