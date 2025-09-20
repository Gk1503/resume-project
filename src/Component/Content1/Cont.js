import React from "react";
import  "../Content1/Cont.css";
import amazon from "../Gallery/amazon.svg";
import Boeing from "../Gallery/Boeing.svg";
import google from "../Gallery/google.svg";
import verizon from "../Gallery/verizon.svg";
import medtronic from "../Gallery/medtronic.svg";

function content() {

return(


    <>

    <div className="Cont2">
    <div className="our">
    <div><label>Our customers have been hired at:</label></div>
    <div><img src={amazon} alt="..." /></div>
    <div><img src={Boeing} alt="..." /></div>
    <div><img src={google} alt="..." /></div>
    <div><img src={verizon} alt="..." /></div>
    <div><img src={medtronic} alt="..." /></div>
</div>

    <h1>Job Seekers Trust MyPerfectResume’s Builder</h1>

<div className="count1">

    <div className="counting">
   
        <div className="mbox">
        
    <div className="box">6</div>
    <div className="box">8</div>
    <div className="box">7</div>
    
</div>
<div className="h1">People are creating a Resume right now with MyPerfectResume.</div>

    </div>
</div>


    </div>
    
    
    </>
)

}

export default content;