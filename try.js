function getAvailableDays(selectedDay) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDate = new Date();
    const selectedDayIndex = daysOfWeek.indexOf(selectedDay);
    const selectedDate = new Date();
    selectedDate.setDate(currentDate.getDate() + (selectedDayIndex - currentDate.getDay() + 7) % 7);
    
    const availableDays = [];
    for (let i = 0; i < 30; i++) {
        const nextDay = new Date(selectedDate);
        nextDay.setDate(selectedDate.getDate() + i * 7);
        const difference = nextDay - currentDate;
        if (difference >= 0 && difference <= 30 * 24 * 60 * 60 * 1000) {
            availableDays.push(nextDay.toDateString());
        }
    }
    return availableDays;
}

const selectedDay = 'Sunday'; // Change this to the day selected by the user
const availableDays = getAvailableDays(selectedDay);
console.log(`Available ${selectedDay}s in the next 30 days:`);
availableDays.forEach(day => console.log(day));