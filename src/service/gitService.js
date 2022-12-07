'use strict';

const fse = require('fs-extra');
const git = require('simple-git');
const path = require('path');

const { TARGET_BRANCH } = require('../config');
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
async function fetchRecursively(rootDirPath) {
    const repositories = findGitRepositories(rootDirPath);
    for (let i = 0; i < repositories.length; ++i) {
        await fetch(repositories[i]);
    }
}

/**
 * @param {String} rootDirPath
 * @param {Array<String>} repositories
 * @returns {Array<String>}
 */
function findGitRepositories(rootDirPath, repositories = []) {
    const rootDir = fse.readdirSync(rootDirPath);
    if (rootDir.includes(GIT_DIR)) {
        repositories.push(rootDirPath);
    } else {
        rootDir.forEach((entry) => {
            const nextDir = path.join(rootDirPath, entry);
            if (fse.statSync(nextDir).isDirectory()) {
                repositories = findGitRepositories(nextDir, repositories);
            }
        });
    }
    return repositories;
}

module.exports = {
    fetchRecursively,
};
