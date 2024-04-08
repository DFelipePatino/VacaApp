import {
    create_New_Event
} from './action-types';


const initialState = {
    events: {
        nameOfEvent: '',
        participats: [],
        date: '',
        details: ''
    }
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case create_New_Event:
            return { ...state, events: payload };
        default:
            return state;
    }
}


export default reducer;