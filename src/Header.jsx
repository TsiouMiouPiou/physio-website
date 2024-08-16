import { useState } from 'react';
import physiotherapistImg from './assets/physiotherapist1.png';
import first from './assets/first.png';
import second from './assets/second.png';
import third from './assets/third.png';
import fourth from './assets/fourth.png';
import fifth from './assets/fifth.png';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './index.css';

Modal.setAppElement('#root'); // Ensure to set your app root element

function Header({ onAppointmentClick }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleContactClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className='smooth-wrapper'>
        <div className='smooth-content'>
          <header>
            <nav className='nav-contain'>
              <h1 className='logo'>GA</h1>
              <button onClick={onAppointmentClick} className='btn-appointment'>MAKE AN APPOINTMENT</button>
            </nav>
            <hr className='first-hr' />
            <div className='container'>
              <div className='name-container'>
                <h2 className="name">George Anastasiou <br /> Physiotherapist. <hr className='name-line' /></h2>
                <p className='title-description'>A dedicated physiotherapist you can trust. Passionate about helping patients achieve their best health through personalized care and effective treatments.</p>
                <button className='btn-contact' onClick={handleContactClick}>CONTACT ME</button>
              </div>
              <img src={physiotherapistImg} alt="Physiotherapist" className="physiotherapist" />
            </div>
            <div className='trusted-logos-container'>
              <h4 className='trusted'>TRUSTED BY: </h4>
              <div className='logos-container'>
                <img className='logos' src={first} alt="first" />
                <img className='logos' src={second} alt="second" />
                <img className='logos' src={third} alt="third" />
                <img className='logos' src={fourth} alt="fourth" />
                <img className='logos' src={fifth} alt="fifth" />
              </div>
            </div>
          </header>
          <main>
            <div className='lines'>
              <hr className='hr-line' />
              <hr className='vr-line' />
            </div>
          </main>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Contact Information"
        className="Modal"
        overlayClassName="Overlay"
      >
        <h2>Contact Information</h2>
        <p>Phone: +123456789</p>
        <p>Address: Strassenstr 49, 12876 Berlin, DE</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </>
  );
}

Header.propTypes = {
  onAppointmentClick: PropTypes.func.isRequired,
};

export default Header;
