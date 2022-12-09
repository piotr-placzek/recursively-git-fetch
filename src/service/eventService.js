'use strict';

const EventEmitter = require('events');
const events = require('../events');
const gitJobFailureListener = require('../listener/gitJobFailureListener');
const gitJobSuccessListener = require('../listener/gitJobSuccessListener');
const gitJobSkipListener = require('../listener/gitJobSkipListener');
const gitRecursiveJobFinishListener = require('../listener/gitRecursiveJobFinishListener');
const gitRecursiveJobStartListener = require('../listener/gitRecursiveJobStartListener');

const ee = new EventEmitter();

/**
 * @returns {Map}
 */
function listenersMap() {
    const listenersMap = new Map();
    listenersMap.set(events.GIT_JOB_SUCCESS, gitJobSuccessListener);
    listenersMap.set(events.GIT_JOB_FAILURE, gitJobFailureListener);
    listenersMap.set(events.GIT_JOB_SKIP, gitJobSkipListener);
    listenersMap.set(events.GIT_RECURSIVE_JOB_FINISH, gitRecursiveJobFinishListener);
    listenersMap.set(events.GIT_RECURSIVE_JOB_START, gitRecursiveJobStartListener);
    return listenersMap;
}

function registerListeners() {
    const map = listenersMap();
    for (let [key, value] of map) {
        ee.on(key, value);
    }
}

function unregisterListeners() {
    const map = listenersMap();
    for (let [key, value] of map) {
        ee.removeAllListeners(key, value);
    }
}

module.exports = {
    on: ee.on,
    emit: ee.emit,
    listenersMap,
    registerListeners,
    unregisterListeners,
};
