import { ADD_EVENT, DELETE_EVENT, EDIT_EVENT, SET_EVENT_DATA, SET_SELECTED_EVENT, UPDATE_DISPLAY_EVENT } from "./event.action"
import { addEventUtil, deleteEventUtil, editEventUtil, updateDisplayEventUtil } from "./event.utils";

const INITIAL_STATE = {
    eventData: null,
    displayEvents: null,
    selectedEvent: null,
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
            return ({
                ...state,
                eventData : action.payload,
            })
        case UPDATE_DISPLAY_EVENT:
            return ({
                ...state,
                displayEvents: updateDisplayEventUtil(state.eventData),
            })
        case SET_SELECTED_EVENT:
            return ({
                ...state,
                selectedEvent: action.payload,
            })
        default:
            return state;
    }
}

export default eventReducer;