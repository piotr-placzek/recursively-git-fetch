'use strict';

const loggerService = require('../service/loggerService');

function handler() {
    loggerService.incrementProgressBar();
}

module.exports = handler;
