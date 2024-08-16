import man from './assets/man.png';
import woman from './assets/woman.png';
import backticks from './assets/backticks.png';

function Testimonials(){

    return(
        <>
        <div className='testimonials-patients-container'>
        <h1 className='h1-patients'>What our Patients say</h1>
            <div className='testimonials-container'>
                <img className='testi-img' src={man}/>
                    <div className='testi-content'>
                        <p> <img src={backticks} className='backticks'/>"The physiotherapy sessions have significantly improved my mobility. The staff is incredibly knowledgeable and attentive. Highly recommend!" </p>
                            <h2 className='patient-names'>Harry Potter</h2>
                    </div>
                    
                <img className='testi-img' src={woman}/>
                    <div className='testi-content'>
                        <p> <img src={backticks} className='backticks'/> "I've never felt better! The personalized treatment plans and the professional approach of the therapists made all the difference in my recovery."</p>
                            <h2 className='patient-names'>Sarah Conor</h2>
                    </div>
            </div>
            </div>
        </>
    );
}
export default Testimonials;