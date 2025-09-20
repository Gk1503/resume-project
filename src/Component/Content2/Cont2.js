import React, { useState } from "react";
import "../Content2/Cont2.css";
import Rocket from "../Gallery/rocket.svg";
import Bulb from "../Gallery/bulb.svg";
import Checklist from "../Gallery/checklist.svg";
import Cloud from "../Gallery/cloud.svg";
import Smile from "../Gallery/smile.svg";
import Suitcase from "../Gallery/suitcase.svg";
import { useNavigate } from "react-router-dom";


function Content2 () {

const navigate = useNavigate();

const OpenDesgin = () => {

navigate('/DesginOne');

}


const [displaycontent ,setDisplaycontent] = useState([
{
    Content :"1",
    ContentHeading: "Build a professional resume in minutes",
    ContentDes:"Effortlessly craft a compelling resume with our Resume Builder. Convert your resume into a free Bold.pro online profile to elevate your digital presence and grow your professional network.",
    ContentImg : Rocket,
},
{
    Content:"2" ,
    ContentHeading : "Select from 40+ ATS-friendly templates",
    ContentDes: "Make an ATS-friendly resume with customizable, professionally designed resume templates built to pass applicant tracking systems (ATS) and impress recruiters.",
    ContentImg : Smile,


},
{
    Content:"3" ,
    ContentHeading : "Click to add expert content suggestions",
    ContentDes: "Overcome writer’s block with ready-made content from professional resume analysts. Click or tap to add skills and work history bullet points tailored to your experience.",
    ContentImg : Checklist,


},


]);

const [displaycontent2 ,setDisplaycontent2] = useState([

    {
        Content:"4" ,
        ContentHeading : "Scan your resume for ATS compatibility",
        ContentDes: "Use our mobile-friendly ATS Resume Checker to scan your resume for 30+ common errors. Tap to implement expert-recommended fixes to improve your resume score.",
        ContentImg : Cloud,
    
    
    },
    {
        Content:"5" ,
        ContentHeading : "Get inspired by professionally made samples",
        ContentDes: "Explore resume examples and cover letter examples for any position. Our samples are professionally written and crafted according to industry standards.",
        ContentImg : Bulb,
    
    
    },
    {
        Content:"6" ,
        ContentHeading : "Outperform the competition with expert help",
        ContentDes: "Visit our career center for expert advice on navigating your job search, or contact our dedicated customer support team for your account needs.  ",
        ContentImg : Suitcase,
    
    
    },
    
    

])



return(
<>
<div className="maincontent">
<div><h1>Get Hired Fast With <span>MyPerfectResume</span></h1></div>    

<div className="Content2">

   
    {displaycontent.map(item => { 
        return(
           
            <>
             <div className="mainbox">
             <div className="row1con">
           <div> <img src={item.ContentImg} /></div>
           <div>   <h2>{item.ContentHeading}</h2></div>
           <div> <p>{item.ContentDes}</p></div>
            
            
</div>
</div>


            
            </>
        );



    })} 
    </div>
    <div className="Content3">
      {displaycontent2.map(item => { 
        return(
           
            <>
             <div className="mainbox2">
             <div className="row1con2">
           <div> <img src={item.ContentImg} /></div>
           <div>   <h2>{item.ContentHeading}</h2></div>
           <div> <p> {item.ContentDes}</p></div>
            
            
</div>
</div>


            
            </>
        );



    })} 
    </div>
 <button className="resumebtn"onClick={OpenDesgin}>Build my resume</button>

    </div>

</>



)




}

export default Content2 ;

