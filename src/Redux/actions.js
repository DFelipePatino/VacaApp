import {
    create_New_Event
} from './action-types';

export const createEvent = (nameOfEvent) => {
    return {
        type: create_New_Event,
        payload: nameOfEvent
    }
}
