'use strict';

class GitError {
    /**
     * @param {String} repositoryPath
     * @param {Array<String>} commands
     * @param {Error} error
     */
    constructor({ repositoryPath, commands, error }) {
        this.repositoryPath = repositoryPath;
        this.commands = commands;
        this.error = error;
    }

    get message() {
        return this.error.message;
    }

    get simpleMessage() {
        return `ERROR [${this.commands.join(', ')}] ${this.repositoryPath}`;
    }
}

module.exports = GitError;
