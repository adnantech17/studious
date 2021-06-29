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