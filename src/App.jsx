import Header from './Header';
import Testimonials from './testimonials';
import Treatment from './treatment';
import Booking from './Booking';
import Footer from './footer';
import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP,  } from '@gsap/react';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

function App() {
  gsap.registerPlugin(ScrollToPlugin);
  const [showCalendar, setShowCalendar] = useState(false);

  const clickToBook = () => {
    gsap.to(window, { duration: 2, scrollTo: 3000 });
  };

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);
  
  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { duration: 1 }})
    timeline.
     from('.logo', { x:360})
    .from('.btn-appointment', { y:'-100px' })
    .from('.physiotherapist', { opacity:0})
    .from('.logos', {rotationZ:360 } )
    .from('.experience', {opacity:0, x:-500})
    
},); 

  return (
    <>
      <Header onAppointmentClick={clickToBook} />
      <Treatment />
      <Testimonials />
      <Booking setCalendar={setShowCalendar} showCalendar={showCalendar} />   
      <Footer />

    </>
  );
}

export default App;
