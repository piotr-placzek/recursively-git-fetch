'use strict';

const GitError = require('../../src/model/gitError');

describe('GitError', () => {
    let error;

    beforeEach(() => {
        error = new GitError({
            repositoryPath: '/home/user/project',
            commands: ['fetch', 'pull'],
            error: new Error('test message'),
        });
    });

    test('construct new GitError', () => {
        expect(error).toMatchInlineSnapshot(`
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

    test('should has got own error message', () => {
        expect(error.message).toBe('ERROR [fetch, pull] /home/user/project');
    });

    test("error message coudn't be changed", () => {
        function modify() {
            error.message = 'changed message';
        }
        expect(modify).toThrowError();
    });

    test('should return error message as error details', () => {
        expect(error.errorDetails).toBe('test message');
    });

    test("error details coudn't be changed", () => {
        function modify() {
            error.errorDetails = 'changed message';
        }
        expect(modify).toThrowError();
    });
});
