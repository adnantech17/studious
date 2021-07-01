import { incrementDate } from "../../Utils/date.utils";
import { generateDisplayEvents, getDateTime, incrementMonth } from "../../Utils/Event/event.utils";

export const addEventUtil = (events, newEvent) => {
    return events ? [...events, newEvent] : [newEvent];
}

export const deleteEventUtil = (events, deletedEvent) => {
    return events.filter((item) => item.id != deletedEvent.id);
}

export const editEventUtil = (events, editedEvent) => {
    return events.map((item) => item.id == editedEvent.id ? editedEvent : item);
}

export const updateDisplayEventUtil = (events) => {
    return events ? generateDisplayEvents(events) : {
        pastEvents : [],
        futureEvents : [],
    };
}