import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';
import './confirmation.css';

function Confirmation({ appointmentType, selectedDate, selectedTime, setCurrentStep }) {
  const [client, setClient] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const handlePreviousStep = () => {
    setCurrentStep(2);
  };

  const handleChange = (e) => {
    setClient((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    if (!client.name || !client.phone || !client.email) {
      alert("Please fill out all the fields");
      return;
    }
  
    // Step 1: Save client data to the backend
    axios.post('http://localhost:3000/clients', client)
      .then(response => {
        console.log('Client added:', response.data);
  
        const clientId = response.data.clientId; // Adjusted to capture the returned clientId
        console.log('Client ID:', clientId);
  
        if (!clientId) {
          throw new Error('Failed to retrieve client ID');
        }
  
        // Step 2: Prepare appointment data
        const appointmentData = {
          client_id: clientId,
          appointment_type: appointmentType,
          appointment_date: selectedDate.split('/').reverse().join('-'), // Convert to YYYY-MM-DD
          appointment_time: selectedTime, // Ensure this is in HH:MM:SS format
          status: 'booked' // Default status
        };
  
        console.log('Sending appointment data:', appointmentData);
  
        // Step 3: Save appointment data to the backend
        return axios.post('http://localhost:3000/appointments', appointmentData);
      })
      .then(response => {
        console.log('Appointment saved:', response.data);
  
        // Step 4: Send confirmation email
        return axios.post('http://localhost:3000/send-confirmation-email', {
          email: client.email,
          appointmentType,
          selectedDate,
          selectedTime
        });
      })
      .then(response => {
        if (response.data.success) {
          alert('Confirmation email sent!');
        } else {
          alert('Failed to send confirmation email.');
        }
      })
      .catch(error => {
        console.error('Error:', error.response?.data || error.message);
        alert('Failed to complete the booking process.');
      });
  };
    
  return (
    <>
      <div className="confirmation">
        <br />
        <h2>Booking Summary</h2>
        <br />
        <p>{appointmentType} appointment</p>
        <p className='address'>at Strassenstr 49,<br />12876 Berlin, DE</p>
        <p>{selectedDate} at: {selectedTime}</p>
      </div>
      <div>
        <div className='confirmation-input'>
          <p className='confirmation-p'>Enter your details to confirm your appointment.</p>
          <input
            className='confirmation-email'
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            placeholder='John Wick'
          />
          <input
            className='confirmation-email'
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            placeholder='+306984786860'
          />
          <input
            className='confirmation-email'
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder='example@hotmail.com'
          />
        </div>
      </div>
      <div className='confirmation-buttons'>
        <div type="button" className='back-btn' onClick={handlePreviousStep}>&lt; BACK</div>
        <div type="button" className='confirmation-book' onClick={handleSubmit}>CONFIRM</div>
      </div>
    </>
  );
}

Confirmation.propTypes = {
  appointmentType: PropTypes.string.isRequired,
  selectedDate: PropTypes.string,
  selectedTime: PropTypes.string,
  setCurrentStep: PropTypes.func.isRequired,
};

export default Confirmation;
