import { useState } from 'react';
import Progressbar from './Progressbar';
import SelectAppointmentType from './SelectAppointmentType';
import SelectDateTime from './SelectDateTime';
import Confirmation from './Confirmation';

function Booking() {
  const [currentStep, setCurrentStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');

  const handleAppointmentTypeChange = (type) => {
    setAppointmentType(type);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date); // Keep as Date object
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  return (
    <div className="booking-container">
      <Progressbar currentStep={currentStep} />
      {currentStep === 1 && (
        <SelectAppointmentType
          appointmentType={appointmentType}
          onAppointmentTypeChange={handleAppointmentTypeChange}
          setCurrentStep={setCurrentStep}
        />
      )}
      {currentStep === 2 && (
        <SelectDateTime
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onDateChange={handleDateChange}
          setCurrentStep={setCurrentStep}
          onTimeSelect={handleTimeChange} // Update this to use handleTimeChange
        />
      )}
      {currentStep === 3 && (
        <Confirmation
          appointmentType={appointmentType}
          selectedDate={selectedDate.toLocaleDateString('en-GB')} // Format date for display
          selectedTime={selectedTime}
          setCurrentStep={setCurrentStep}
        />
      )}
    </div>
  );
}

// Remove unnecessary PropTypes
Booking.propTypes = {};

export default Booking;
