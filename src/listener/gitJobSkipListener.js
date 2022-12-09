'use strict';

const loggerService = require('../service/loggerService');

/**
 * @param {String} message
 */
function handler(message) {
    loggerService.info('skipping repository', message);
}

module.exports = handler;
