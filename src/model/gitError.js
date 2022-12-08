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

    get errorDetails() {
        return this.error.message;
    }

    get message() {
        return `ERROR [${this.commands.join(', ')}] ${this.repositoryPath}`;
    }
}

module.exports = GitError;
