'use strict';

const ProgressBar = require('progress');
const signale = require('signale');

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
    }
}

module.exports = {
    complete: signale.complete,
    error: signale.error,
    log: signale.log,
    success: signale.success,
    initProgressBar,
    incrementProgressBar,
};
