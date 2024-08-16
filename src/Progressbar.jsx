import PropTypes from 'prop-types';
import './progress.css';

function Progressbar({ currentStep }) {
  return (
    <section className="progressBar">
      <div className={`progressNum1 ${currentStep >= 1 ? 'active' : ''}`}>1.</div>
      <div
        className="progressBar1"
        style={{ backgroundColor: currentStep >= 2 ? "blue" : "" }}
      ></div>
      <div
        className="progressNum2"
        style={{
          color: currentStep >= 2 ? "white" : '#EE6CC2',
          backgroundColor: currentStep >= 2 ? "#3367CC" : "white",  
        }}
      >
        2.
      </div>
      <div className="progressBar2" style={{backgroundColor: currentStep >= 3 ? "blue" : ""}}></div>
      <div
        className="progressNum3"
        style={{
          color: currentStep >= 3 ? "white" : '#EE6CC2',
          backgroundColor: currentStep >= 3 ? "#3367CC" : "white",
        }}
      >
        3.
      </div>
    </section>
  );
}

Progressbar.propTypes = {
  currentStep: PropTypes.number.isRequired,
};

export default Progressbar;