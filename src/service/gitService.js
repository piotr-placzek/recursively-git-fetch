'use strict';

const eventService = require('./eventService');
const fse = require('fs-extra');
const git = require('simple-git');
const path = require('path');

const { TARGET_BRANCH } = require('../config');
const events = require('../events');
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
    eventService.emit(events.GIT_RECURSIVE_JOB_START, repositories);
    for (let i = 0; i < repositories.length; ++i) {
        const repositoryPath = repositories[i];
        try {
            await fetch(repositoryPath);
            eventService.emit(events.GIT_JOB_SUCCESS, repositoryPath);
        } catch (error) {
            if (error.task) {
                eventService.emit(events.GIT_JOB_FAILURE, { repositoryPath, error });
            }
        }
    }
    eventService.emit(events.GIT_RECURSIVE_JOB_FINISH);
}

/**
 * @param {String} rootDirPath
 * @param {Array<String>} repositories
 * @returns {Array<String>}
 */
function findGitRepositories(rootDirPath, options, repositories = []) {
    const re = new RegExp(options.skipRe);
    if (re.test(rootDirPath)) {
        eventService.emit(events.GIT_JOB_SKIP, rootDirPath);
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
