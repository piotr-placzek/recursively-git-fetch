'use strict';

const loggerService = require('../service/loggerService');

/**
 * @param {Array<String} message
 */
function handler(message) {
    loggerService.log('Found', message.length, 'repositories.');
    loggerService.initProgressBar(message.length);
}

module.exports = handler;
