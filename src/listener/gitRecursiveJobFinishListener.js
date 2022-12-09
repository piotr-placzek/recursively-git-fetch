'use strict';

const gitErrorService = require('../service/gitErrorService');

function handler() {
    gitErrorService.print();
}

module.exports = handler;
