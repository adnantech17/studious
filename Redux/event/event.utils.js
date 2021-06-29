export const addEventUtil = (events, newEvent) => {
    return events ? [...events, newEvent] : [newEvent];
}

export const deleteEventUtil = (events, deletedEvent) => {
    return events.filter((item) => item.id != deletedEvent.id);
}

export const editEventUtil = (events, editedEvent) => {
    return events.map((item) => item.id == editedEvent.id ? editedEvent : item);
}