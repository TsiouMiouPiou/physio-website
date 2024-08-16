import PropTypes from 'prop-types';
import ReactCalendar from './ReactCalendar';
import './selectDateTime.css';

function SelectDateTime({  onDateChange, onTimeSelect, setCurrentStep }) {
  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(3);
  };

  return (
    <div className="select-date-time">
      <ReactCalendar onDateChange={onDateChange} onTimeSelect={onTimeSelect} />
      <div className="navigation-buttons">
        <div className='navigation-buttons1' type="button" onClick={handlePreviousStep}>&lt; Back</div>
        <div className='navigation-buttons2' type="button" onClick={handleNextStep}>Continue</div>
      </div>
    </div>
  );
}

SelectDateTime.propTypes = {
  selectedDate: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func.isRequired,
  onTimeSelect: PropTypes.func.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default SelectDateTime;

