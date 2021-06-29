import { incrementDate } from "../../Utils/date.utils";
import { getDateTime, incrementMonth } from "../../Utils/Event/event.utils";

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
    const pastEvents = [];
    const futureEvents = [];

    const timeLimit = incrementDate(new Date(),30);
    const now = new Date();
    events?.forEach((event) => {
        const displayEvent = {
            ...event,
            displayId: event.id  + "0",
        }
        const dateTime = getDateTime(event.date, event.time);
        if(dateTime < now) pastEvents.push(displayEvent);
        else futureEvents.push(displayEvent);
        if(event.repeatEvent.value != 0) {
            let repeatedEvent = {
                ...event,
            }
            for(let i = 1; i < 10000; i++)
            {
                repeatedEvent = {
                    ...repeatedEvent,
                    displayId: event.id + i,
                }

                if(event.repeatEvent.incrementDay) {
                    repeatedEvent.date =  incrementDate(repeatedEvent.date,event.repeatEvent.incrementDay);
                }
                else {
                    repeatedEvent.date = incrementMonth(repeatedEvent.date,event.repeatEvent.incrementMonth);
                }

                const repeatedDateTime = getDateTime(repeatedEvent.date, repeatedEvent.time);
                if(repeatedDateTime > timeLimit) break;
                if(repeatedDateTime < now) pastEvents.push(repeatedEvent);
                else futureEvents.push(repeatedEvent);
            }
        }
    });
    return {
        pastEvents : [...pastEvents],
        futureEvents : [...futureEvents],
    }
}