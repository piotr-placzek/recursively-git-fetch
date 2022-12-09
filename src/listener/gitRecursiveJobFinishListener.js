'use strict';

const gitErrorService = require('../service/gitErrorService');
const loggerService = require('../service/loggerService');

function handler() {
    gitErrorService.print();
    loggerService.complete();
}

module.exports = handler;
