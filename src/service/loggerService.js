'use strict';

const ProgressBar = require('progress');
const signale = require('signale');
const { TARGET_BRANCH } = require('../config');

let progress = null;

/**
 * @param {Number} total
 */
function initProgressBar(total) {
    progress = new ProgressBar('[:bar] :current/:total :percent', {
        total,
        width: 40,
        complete: '=',
        incomplete: ' ',
        head: '-',
    });
}

function incrementProgressBar() {
    if (progress) {
        progress.tick();
        if (progress.complete) {
            signale.success('All repositories are up to date with', TARGET_BRANCH);
        }
    }
}

module.exports = {
    complete: signale.complete,
    error: signale.error,
    info: signale.info,
    log: signale.log,
    success: signale.success,
    initProgressBar,
    incrementProgressBar,
};
