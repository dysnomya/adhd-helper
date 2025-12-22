function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

// YYYY-MM-DD format from Date object in calendar
function getDateString(date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
}

export {
  capitalizeFirstLetter,
  getDateString,
}