'use strict';

class GitError {
    /**
     * @param {String} repositoryPath
     * @param {Array<String>} gitCommands
     * @param {Error} error
     */
    constructor({ repositoryPath, gitCommands, error }) {
        this.repositoryPath = repositoryPath;
        this.gitCommands = gitCommands;
        this.error = error;
    }

    get message() {
        return this.error.message;
    }

    get simpleMessage() {
        return `ERROR [${this.gitCommands.join(', ')}] ${this.repositoryPath}`;
    }
}

module.exports = GitError;
