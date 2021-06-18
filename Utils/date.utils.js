const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function incrementDate(date, n) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + n);
}

export function formatDate(dt) {
  if (dt === null) return dt;
  return dt.toDate ? dt.toDate() : dt;
}

export const getDateText = (dt) => {
  const today = incrementDate(new Date(), 0);
  const tomorrow = incrementDate(new Date(), 1);
  const yesterday = incrementDate(new Date(), -1);
  dt = formatDate(dt);
  if (dt === null) return "No Date";
  else if (
    dt.getFullYear() === today.getFullYear() &&
    dt.getMonth() === today.getMonth() &&
    dt.getDate() == today.getDate()
  )
    return "Today";
  else if (
    dt.getFullYear() === tomorrow.getFullYear() &&
    dt.getMonth() === tomorrow.getMonth() &&
    dt.getDate() == tomorrow.getDate()
  )
    return "Tomorrow";
  else if (
    dt.getFullYear() === yesterday.getFullYear() &&
    dt.getMonth() === yesterday.getMonth() &&
    dt.getDate() == yesterday.getDate()
  )
    return "Yesterday";
  else if (dt.getFullYear() === today.getFullYear())
    return monthNames[dt.getMonth()] + " " + dt.getDate();
  return dt.getDate() + "/" + (dt.getMonth() + 1) + "/" + dt.getFullYear();
};

export const getTimeText = (dt) => {
  dt = formatDate(dt);
  if (dt === null) return "No Time";
  var hours = dt.getHours();
  var minutes = dt.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
};
