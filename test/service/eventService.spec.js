'use strict';

const eventService = require('../../src/service/eventService');

describe('eventService', () => {
    test('shoud call all registered listeners', () => {
        const event = 'test-event';
        const callback1 = jest.fn();
        const callback2 = jest.fn();
        const callback3 = jest.fn();

        eventService.on(event, callback1);
        eventService.on(event, callback2);
        eventService.on(event, callback3);

        eventService.emit(event);

        expect(callback1).toBeCalledTimes(1);
        expect(callback2).toBeCalledTimes(1);
        expect(callback2).toBeCalledTimes(1);
    });
});
