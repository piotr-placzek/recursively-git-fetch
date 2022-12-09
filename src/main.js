'use strict';

const { ROOT_DIR_PATH, SKIP_REPOSITORY_PATH_REGEX } = require('./config');
const events = require('./events');
const eventService = require('./service/eventService');
const gitJobFailureListener = require('./listener/gitJobFailureListener');
const gitJobSuccessListener = require('./listener/gitJobSuccessListener');
const gitJobSkipListener = require('./listener/gitJobSkipListener');
const gitRecursiveJobFinishListener = require('./listener/gitRecursiveJobFinishListener');
const gitRecursiveJobStartListener = require('./listener/gitRecursiveJobStartListener');
const gitService = require('./service/gitService');
const loggerService = require('./service/loggerService');

function listeners(fn) {
    fn(events.GIT_JOB_SUCCESS, gitJobSuccessListener);
    fn(events.GIT_JOB_FAILURE, gitJobFailureListener);
    fn(events.GIT_JOB_SKIP, gitJobSkipListener);
    fn(events.GIT_RECURSIVE_JOB_FINISH, gitRecursiveJobFinishListener);
    fn(events.GIT_RECURSIVE_JOB_START, gitRecursiveJobStartListener);
}

function registerListeners() {
    listeners(eventService.on);
}

function unregisterListeners() {
    listeners(eventService.removeAllListeners);
}

/**
 * @param {Array<String} argv
 */
async function main(argv) {
    const rootDirectoriesPaths = argv.length ? argv : [ROOT_DIR_PATH];
    const options = {
        skipRe: SKIP_REPOSITORY_PATH_REGEX,
    };

    registerListeners();

    for (let i = 0; i < rootDirectoriesPaths.length; ++i) {
        try {
            await gitService.fetchRecursively(rootDirectoriesPaths[i], options);
        } catch (error) {
            loggerService.error(error);
        }
    }
}

process.on('SIGTERM', () => {
    unregisterListeners();
});

module.exports = main;
