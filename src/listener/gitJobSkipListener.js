'use strict';

const loggerService = require('../service/loggerService');

function handler(message) {
    loggerService.log('SKIP', message);
}

module.exports = handler;
