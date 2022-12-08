'use strict';

const GitError = require('../../src/model/gitError');
const gitErrorService = require('../../src/service/gitErrorService');
const loggerService = require('../../src/service/loggerService');

jest.mock('../../src/service/loggerService');

describe('gitErrorService', () => {
    let error;

    beforeEach(() => {
        error = new GitError({
            repositoryPath: '/home/user/project',
            commands: ['fetch', 'pull'],
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
                commands: ['fetch', 'pull'],
                error: new Error('test message'),
            }),
        );
        const collected = gitErrorService.getAll();

        expect(collected.length).toBe(2);
        expect(collected.at(1)).toMatchInlineSnapshot(`
            GitError {
              "commands": [
                "fetch",
                "pull",
              ],
              "error": [Error: test message],
              "repositoryPath": "/home/user/project",
            }
        `);
    });

    test('collection should be cleaned', () => {
        gitErrorService.collect(new Error('Error'));
        gitErrorService.collect(new Error('Error'));
        gitErrorService.collect(new Error('Error'));

        let collected = gitErrorService.getAll();
        expect(collected.length).toBe(3);

        gitErrorService.clean();
        collected = gitErrorService.getAll();
        expect(collected.length).toBe(0);
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
