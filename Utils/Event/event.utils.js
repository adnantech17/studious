import { formatDate, incrementDate } from "../date.utils";
import { REPEAT_NEVER } from "./repeat.utils";

export const getDateTime = (date, time) => {
    let dateTime = new Date();
    dateTime.setFullYear(date.getFullYear(),date.getMonth(),date.getDate());
    dateTime.setHours(time.getHours());
    dateTime.setMinutes(time.getMinutes());
    dateTime.setSeconds(time.getSeconds());
    dateTime.setMilliseconds(time.getMilliseconds());
    return dateTime;
}

export const incrementMonth = (date, increment) => {
    const dateOfMonth = date.getDate();
    for(let i = 1; i < 100; i++) {
        const newDate = new Date(date.getFullYear(), date.getMonth() + i * increment, date.getDate());
        if(dateOfMonth == newDate.getDate()) return newDate;
    }
}

export const generateDisplayEvents = (events) => {
    const pastEvents = [];
    const futureEvents = [];

    const timeLimit = incrementDate(new Date(),30);
    const now = new Date();
    events?.forEach((item) => {
        const event = {
            ...item,
            date : formatDate(item.date),
            time : formatDate(item.time),
        };
        const displayEvent = {
            ...event,
            displayId: event.id  + "0",
        }
        const dateTime = getDateTime(event.date, event.time);
        if(dateTime < now) pastEvents.push(displayEvent);
        else futureEvents.push(displayEvent);
        if(event.repeatEvent != REPEAT_NEVER) {
            let repeatedEvent = {
                ...event,
            };
            for(let i = 1; i < 10000; i++)
            {
                repeatedEvent = {
                    ...repeatedEvent,
                    displayId: event.id + i,
                }

                if(repeatedEvent.repeatEvent.incrementDay) {
                    repeatedEvent.date =  incrementDate(repeatedEvent.date,event.repeatEvent.incrementDay);
                }
                else {
                    repeatedEvent.date = incrementMonth(repeatedEvent.date,event.repeatEvent.incrementMonth);
                }

                const repeatedDateTime = getDateTime(repeatedEvent.date, repeatedEvent.time);
                if(repeatedDateTime > timeLimit) break;
                if(repeatedDateTime < now) pastEvents.push(repeatedEvent);
                else futureEvents.push(repeatedEvent);
            };
        };
    });
    return {
        pastEvents : [...pastEvents],
        futureEvents : [...futureEvents],
    }
}

export const deleteObsoleteEvents = (events) => {
    const updatedEvents = [];
    const timeLimit = incrementDate(new Date(), -7);
    events?.forEach((item) => {
        const event = {
            ...item,
            date : formatDate(item.date),
            time : formatDate(item.time),
        };
        const dateTime = getDateTime(event.date, event.time);
        if(dateTime < timeLimit) {
            if(event.repeatEvent != REPEAT_NEVER) {
                let newEvent = {...event};
                while(true) {
                    if(newEvent.repeatEvent.incrementDay) {
                        newEvent.date =  incrementDate(newEvent.date,newEvent.repeatEvent.incrementDay);
                    }
                    else {
                        newEvent.date = incrementMonth(newEvent.date,newEvent.repeatEvent.incrementMonth);
                    }
                    let newDateTime = getDateTime(newEvent.date, newEvent.time);
                    if(newDateTime > timeLimit) break;
                }
                updatedEvents.push(newEvent);
            }
        }
        else updatedEvents.push(event);
    });
    return [...updatedEvents];
}