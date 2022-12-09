'use strict';

const loggerService = require('../service/loggerService');

function handler(message) {
    loggerService.info('skipping repository', message);
}

module.exports = handler;
