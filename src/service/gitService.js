'use strict';

const fse = require('fs-extra');
const git = require('simple-git');
const gitErrorService = require('./gitErrorService');
const path = require('path');
const GitError = require('../model/gitError');

const { TARGET_BRANCH } = require('../config');
const loggerService = require('./loggerService');
const GIT_DIR = '.git';

/**
 * @param {String} repositoryPath
 */
async function fetch(repositoryPath) {
    await git(repositoryPath).fetch().checkout(TARGET_BRANCH).pull(TARGET_BRANCH);
}

/**
 * @param {String} rootDirPath
 */
async function fetchRecursively(rootDirPath, options) {
    const repositories = findGitRepositories(rootDirPath, options);
    for (let i = 0; i < repositories.length; ++i) {
        const repositoryPath = repositories[i];
        try {
            await fetch(repositoryPath);
            loggerService.log('OK', repositoryPath);
        } catch (error) {
            if (error.task) {
                const { commands } = error.task;
                gitErrorService.collect(new GitError({ repositoryPath, commands, error }));
            }
        }
    }
    gitErrorService.print();
}

/**
 * @param {String} rootDirPath
 * @param {Array<String>} repositories
 * @returns {Array<String>}
 */
function findGitRepositories(rootDirPath, options, repositories = []) {
    const re = new RegExp(options.skipRe);
    if (re.test(rootDirPath)) {
        return repositories;
    }

    const rootDir = fse.readdirSync(rootDirPath);
    if (rootDir.includes(GIT_DIR)) {
        repositories.push(rootDirPath);
    } else {
        rootDir.forEach((entry) => {
            const nextDir = path.join(rootDirPath, entry);
            if (fse.statSync(nextDir).isDirectory()) {
                repositories = findGitRepositories(nextDir, options, repositories);
            }
        });
    }
    return repositories;
}

module.exports = {
    fetchRecursively,
};
