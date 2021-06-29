import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, SET_EVENT_DATA } from "./event.action"
import { addEventUtil, deleteEventUtil, editEventUtil } from "./event.utils";

const INITIAL_STATE = {
    eventData: null,
}

const eventReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ADD_EVENT:
            return ({
                ...state,
                eventData : addEventUtil(state.eventData, action.payload),
            })
        case EDIT_EVENT:
            return ({
                ...state,
                eventData : editEventUtil(state.eventData, action.payload),
            })
        case DELETE_EVENT:
            return ({
                ...state,
                eventData : deleteEventUtil(state.eventData, action.payload),
            })
        case SET_EVENT_DATA:
        default:
            return state;
    }
}

export default eventReducer;