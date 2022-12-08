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
              "error": [Error: test message],
              "commands": [
                "fetch",
                "pull",
              ],
              "repositoryPath": "/home/user/project",
            }
        `);
    });

    test('should has got error message', () => {
        function modify() {
            error.message = 'changed message';
        }
        expect(modify).toThrowError();
    });

    test("error message coudn't be changed", () => {
        expect(error.message).toBe('test message');
    });

    test('should has got own simple message', () => {
        expect(error.simpleMessage).toBe('ERROR [fetch, pull] /home/user/project');
    });

    test("simple message coudn't be changed", () => {
        function modify() {
            error.simpleMessage = 'changed message';
        }
        expect(modify).toThrowError();
    });
});
