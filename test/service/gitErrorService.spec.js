'use strict';

const { GitError } = require('simple-git');
const gitErrorService = require('../../src/service/gitErrorService');
const loggerService = require('../../src/service/loggerService');

jest.mock('../../src/service/loggerService');

describe('gitErrorService', () => {
    let error;

    beforeEach(() => {
        error = new GitError({
            repositoryPath: '/home/user/project',
            gitCommands: ['fetch', 'pull'],
            error: new Error('test message'),
        });
    });

    afterEach(() => {
        gitErrorService.clean();
    });

    test('errors should be collected', () => {
        gitErrorService.collect(new Error('Error'));
        gitErrorService.collect(
            new GitError({
                repositoryPath: '/home/user/project',
                gitCommands: ['fetch', 'pull'],
                error: new Error('test message'),
            }),
        );
        gitErrorService.collect(new Array(1));
        gitErrorService.collect({
            repositoryPath: '/home/user/project',
            gitCommands: ['fetch', 'pull'],
            error: new Error('test message'),
        });

        const collected = gitErrorService.getAll();

        expect(collected.length).toBe(2);
        expect(collected[1]).toMatchInlineSnapshot(`
            GitError {
              "error": [Error: test message],
              "gitCommands": [
                "fetch",
                "pull",
              ],
              "repositoryPath": "/home/user/project",
            }
        `);
    });

    test('should print simple messages', () => {
        const fn = jest.fn();

        loggerService.error = fn;
        gitErrorService.collect(error);
        gitErrorService.print();

        expect(fn).toBeCalledTimes(1);
        expect(fn).toBeCalledWith('ERROR [fetch, pull] /home/user/project');
    });
});
