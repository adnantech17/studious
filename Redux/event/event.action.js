export const ADD_EVENT = "ADD_EVENT";
export const addEvent = (newEvent) => ({
    type: ADD_EVENT,
    payload: newEvent,
})

export const EDIT_EVENT = "EDIT_EVENT";
export const editEvent = (editedEvent) => ({
    type: EDIT_EVENT,
    payload: editedEvent,
})

export const DELETE_EVENT = "DELETE_EVENT";
export const deleteEvent = (deletedEvent) => ({
    type: DELETE_EVENT,
    payload: deletedEvent,
})

export const SET_EVENT_DATA = "SET_EVENT_DATA";
export const setEventData = (eventData) => ({
    type: SET_EVENT_DATA,
    payload: eventData,
})