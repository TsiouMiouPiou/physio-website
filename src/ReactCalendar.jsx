import { useState } from 'react';
import PropTypes from 'prop-types';
import './timePicker.css';
import './calendar.css';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const timeSlots = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

function ReactCalendar({ onDateChange, onTimeSelect }) {
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState({ date: null, time: null });

  function getCurrentWeek() {
    const today = new Date();
    const day = today.getDay();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - (day === 0 ? 6 : day - 1)); // Adjust for Sunday
    const week = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(firstDayOfWeek);
      day.setDate(firstDayOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  }

  function handlePreviousWeek() {
    const newWeek = currentWeek.map((date) => {
      const prevDate = new Date(date);
      prevDate.setDate(prevDate.getDate() - 7);
      return prevDate;
    });
    setCurrentWeek(newWeek);
  }

  function handleNextWeek() {
    const newWeek = currentWeek.map((date) => {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 7);
      return nextDate;
    });
    setCurrentWeek(newWeek);
  }

  function handleDateClick(date) {
    const today = new Date();
    const selected = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    if (selected < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
      return; // Prevent selecting past dates
    }
    onDateChange(date); // Call parent to notify date change
  }

  function handleTimeSlotClick(date, time) {
    const [selectedHours, selectedMinutes] = time.split(':').map(Number);
    const today = new Date();
    const selectedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), selectedHours, selectedMinutes);

    if (selectedDate < today) {
      return; // Prevent selecting past time slots
    }

    setSelectedTimeSlot({ date, time });
    onTimeSelect(time); // Pass selected time to parent
  }

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  return (
    <div className="calendar-container">
      <div className="week-navigation">
        <button className="nav-button" onClick={handlePreviousWeek}>&lt;</button>
        <div className="week-display">
          {daysOfWeek.map((day, index) => {
            const currentDay = currentWeek[index];
            const startOfCurrentDay = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate());
            const isDisabled = startOfCurrentDay < startOfToday; // Disable past dates

            return (
              <div
                key={day}
                className={`day ${isDisabled ? 'disabled' : ''}`}
                onClick={() => !isDisabled && handleDateClick(currentDay)} // Only allow click if not disabled
              >
                <div className="day-name">{day}</div>
                <div className="day-date">
                  {currentDay.getDate()}.{currentDay.toLocaleString("en-US", { month: 'short' })}
                </div>
                <div className="time-slots">
                  {timeSlots.map((time) => {
                    const [hours, minutes] = time.split(':').map(Number);
                    const timeSlotDate = new Date(currentDay.getFullYear(), currentDay.getMonth(), currentDay.getDate(), hours, minutes);
                    const isTimeDisabled =
                      timeSlotDate < today;

                    return (
                      <div
                        key={time}
                        className={`time-slot ${isDisabled || isTimeDisabled ? 'disabled' : ''} ${
                          selectedTimeSlot.date === currentDay && selectedTimeSlot.time === time ? 'selected' : ''
                        }`}
                        onClick={() => !isDisabled && !isTimeDisabled && handleTimeSlotClick(currentDay, time)}
                      >
                        {time}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <button className="nav-button" onClick={handleNextWeek}>&gt;</button>
      </div>
    </div>
  );
}

ReactCalendar.propTypes = {
  onDateChange: PropTypes.func.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
};

export default ReactCalendar;
