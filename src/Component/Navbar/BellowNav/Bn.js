import React, { useEffect, useState } from "react";
import "../BellowNav/Bn.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Resume from "../../Gallery/Resumetem.avif";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp,faStar,faStarHalf,faStarOfDavid} from '@fortawesome/free-solid-svg-icons';

function BN() { 

 const navigate = useNavigate();
 
 
 const OpenDesgin = () =>{
  navigate('/DesginOne');


 }

const [showElement , setShowElement] = useState(false);


useEffect (() => {

    const timer = setTimeout(()=>{
        setShowElement(true);
    },1000);

    return () => clearTimeout(timer);
},[]);
    
return(

<>

    
    
    <div className="container-fluid Bn">
    <div>
    <img alt="..." src={Resume} className="Resume-builder" />
    </div>
    <div className="Bn2">
        {showElement && (
        <div className="bn2 fade-in">
    <p>My<span> Perfect</span></p>   
    <p>Resume Builder</p>
    
    <div className="bn3">
    <p>Our free Resume Builder offers content suggestions, ATS-friendly templates, & expert tips to help you build a resume from any device. Stand out with MyPerfectResume!</p>        

    </div>
  
            <button className="button" onClick={OpenDesgin} >Build my resume today</button>

    </div>
      )}
      <div className="uparrow">
      <div><FontAwesomeIcon icon={faArrowUp} />&nbsp;&nbsp;&nbsp;30% higher chance of getting a job‡ </div>
      <div><FontAwesomeIcon icon={faArrowUp} />&nbsp;&nbsp;&nbsp;42% higher response rate from recruiters‡ </div>
      </div>

      <div>

        <p className="Ex">EXCELLENT<span><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStarHalf} /></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;14,399 reviews on&nbsp;&nbsp;&nbsp;<span> <FontAwesomeIcon icon={faStarOfDavid} /></span> &nbsp;&nbsp;&nbsp; TrustPilot</p>
      </div>
    </div>
   

    </div>
    
   

    



</>

)


 }

 export default BN;