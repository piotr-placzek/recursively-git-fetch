'use strict';

const GitError = require('../model/gitError');
const gitErrorService = require('../service/gitErrorService');
const loggerService = require('../service/loggerService');

function handler({ repositoryPath, error }) {
    const { commands } = error.task;
    gitErrorService.collect(new GitError({ repositoryPath, commands, error }));
    loggerService.incrementProgressBar();
}

module.exports = handler;
