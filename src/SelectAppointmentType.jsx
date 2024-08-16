import PropTypes from 'prop-types';
import { useState } from 'react';
import './selectAppointmentType.css'

function SelectAppointmentType({ appointmentType, onAppointmentTypeChange, setCurrentStep }) {
  const [checked, setChecked] = useState(appointmentType);


  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    setChecked(value === checked ? 'value' : value);
    onAppointmentTypeChange(value === checked ? 'value' : value);
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  return (
    <form className="booking-btn" onSubmit={handleNextStep}>
      <div className="input-app">
        <label>
          <input
            type="radio"
            value="First-appointment"
            checked={checked === 'First-appointment'}
            onChange={handleCheckboxChange}
            className="checkbox1"
          />
          <input
            type="text"
            value="First appointment"
            className="text"
            readOnly
          />
        </label>
        <p>
          A first-time consultation costs 100e and you will be required to pay by
          bank transfer after your consultation in the next 10 days.
        </p>
        <label>
          <input 
            type="radio" 
            value="Follow-up"
            checked={checked === 'Follow-up'}
            onChange={handleCheckboxChange}
            className="checkbox2"
          />
          <input
            type="text"
            value="Follow up appointment"
            className="text"
            readOnly
          />
        </label>
      </div>
      <button type="submit" className='check-availability'>CHECK AVAILABILITY</button>
    </form> 
  );
}

SelectAppointmentType.propTypes = {
  appointmentType: PropTypes.string.isRequired,
  onAppointmentTypeChange: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default SelectAppointmentType;


