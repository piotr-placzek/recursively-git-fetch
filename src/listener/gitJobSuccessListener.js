'use strict';

const loggerService = require('../service/loggerService');

function handler(message) {
    loggerService.success(message);
}

module.exports = handler;
