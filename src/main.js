'use strict';

const { ROOT_DIR_PATH, SKIP_REPOSITORY_PATH_REGEX } = require('./config');
const eventService = require('./service/eventService');
const gitService = require('./service/gitService');
const loggerService = require('./service/loggerService');

/**
 * @param {Array<String} argv
 */
async function main(argv) {
    const rootDirectoriesPaths = argv.length ? argv : [ROOT_DIR_PATH];
    const options = {
        skipRe: SKIP_REPOSITORY_PATH_REGEX,
    };

    eventService.registerListeners();

    for (let i = 0; i < rootDirectoriesPaths.length; ++i) {
        try {
            await gitService.fetchRecursively(rootDirectoriesPaths[i], options);
        } catch (error) {
            loggerService.error(error);
        }
    }
}

process.on('SIGTERM', () => {
    eventService.unregisterListeners();
});

module.exports = main;
