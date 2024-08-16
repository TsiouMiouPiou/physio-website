import massage from './assets/massage.png';
import manual from './assets/manual.png';
import acupuncture from './assets/acupuncture.png';
import grid from './assets/grid.png';



function Treatment(){

    return(
        <>
        <div className='treatment-container'>
        <h1 className='experience'>Experienced in Multiple <br /> Physiotherapy specialities</h1>
            <div className="treatment">
                <img className='t1' src={massage}/>
                <img className='t2' src={manual}/>
                <img className='t3' src={acupuncture}/>        
            </div>
        <div className='title-paragraphs'> 
            <h2 className='therapy-title1'>Therapeutic Massage</h2>
            <h2 className='therapy-title2'>Manual Therapy</h2>
            <h2 className='therapy-title3'>Acupuncture</h2>   
                <p className='p1'>"Relieve pain and stress with our tailored therapeutic massage."</p>
                <p className='p2'>"Hands-on techniques to improve movement and reduce tension."</p>
                <p className='p3'>"Stimulate healing and pain relief through targeted acupuncture." </p>
        </div>
            <img src={grid} className='grid'/>
            </div>
        </>
    );
}

export default Treatment;