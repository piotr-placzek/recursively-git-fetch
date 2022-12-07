'use strict';

const loggerService = require('./loggerService');

const errors = [];

/**
 * @param {GitError} error
 */
function collect(error) {
    errors.push(error);
}

/**
 * @returns {Array<GitError>}
 */
function getAll() {
    return new Array(...errors);
}

/**
 * @param {Boolean} detailed
 */
function print(detailed = false) {
    console.log(errors);
    for (let i = 0; i < errors.length; ++i) {
        loggerService.error(errors[i].simpleMessage);
        if (detailed) {
            loggerService.error(errors[i].message);
        }
    }
}

/**
 */
function clean() {
    errors.length = 0;
}

module.exports = {
    collect,
    getAll,
    print,
    clean,
};
