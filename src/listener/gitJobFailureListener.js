'use strict';

const GitError = require('../model/gitError');
const gitErrorService = require('../service/gitErrorService');

function handler({ repositoryPath, error }) {
    const { commands } = error.task;
    gitErrorService.collect(new GitError({ repositoryPath, commands, error }));
}

module.exports = handler;
