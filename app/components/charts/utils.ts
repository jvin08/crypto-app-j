//five years
function getDatesWithHalfYearInterval() {
    const currentDate = new Date();
    const dates = [];
    for (let i = 0; i <= 5; i++) {
      const newDate = new Date(currentDate);
      newDate.setFullYear(currentDate.getFullYear() - (5-i));
      dates.push(newDate.toISOString().split("T")[0].slice(5,7) + "/" + newDate.toISOString().split("T")[0].slice(2,4));
    }
    return dates;
  }
  export const fiveYears = getDatesWithHalfYearInterval();
  //one year
  function formatDate(date: Date) {
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    return `${month.toString().padStart(2, "0")}/${year}`;
  }
  function generateDatesWithInterval(interval: number, numberOfDates: number) {
    const dates = [];
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth()); // Start from 12 months ago
    for (let i = 0; i < numberOfDates; i++) {
      dates.push(formatDate(currentDate));
      currentDate.setMonth(currentDate.getMonth() - interval);
    }
    dates.push(formatDate(currentDate));
    return dates.reverse();
  }
  export const oneYear = generateDatesWithInterval(2, 6);
  //one month, 14days, 7days
  function formatDates(date: Date) {
    const month = date.getMonth() + 1; // Month is zero-based
    const day = date.getDate();
    return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}`;
  }
  function generateDatesWithIntervals(interval: number, numberOfDates: number) {
    const dates = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - numberOfDates * interval); // Start from 31 days ago
    for (let i = 0; i < numberOfDates; i++) {
      dates.push(formatDates(currentDate));
      currentDate.setDate(currentDate.getDate() + interval);
    }
    dates.push(formatDates(currentDate));
    return dates;
  }
  // 14days - 3 and 15, 7 days - 1 and 7, 31 day - 7 and 31
  export const oneQuater = generateDatesWithInterval(1, 3);
  export const oneMonth = generateDatesWithIntervals(6, 5);
  export const fourteenDays = generateDatesWithIntervals(2,7);
  export const sevenDays = generateDatesWithIntervals(1,7);
  //one day
  function formatHour(date: Date) {
    const hours = date.getHours().toString().padStart(2, "0");
    return `${hours}:00`;
  }
  function generateHoursWithInterval(interval: number, numberOfHours: number) {
    const hoursArray = [];
    const currentHour = new Date();
    currentHour.setHours(currentHour.getHours() - numberOfHours);
    for (let i = 0; i < numberOfHours; i += interval) {
      hoursArray.push(formatHour(currentHour));
      currentHour.setHours(currentHour.getHours() + interval);
    }
    hoursArray.push(formatHour(currentHour));
    return hoursArray;
  }
  // Example: Generate an array of hours with a 4-hour interval for the last 24 hours
  export const oneDay = generateHoursWithInterval(4, 24);