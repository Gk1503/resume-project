import React, { useContext, useState } from "react";
import "../../QuestionBank/Heading/Heading.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import FormContext from "../../Context/FormContext";


function HeadingQuestion() {
  const [showLinkedIn, setShowLinkedIn] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [showDriving, setShowDriving] = useState(false);
  const {personalDetails,setPersonalDetails} = useContext(FormContext);
  
  
  const handleChange = (e) => {
    setPersonalDetails({
      ...personalDetails,
      [e.target.name]: e.target.value,

    });
    console.log("personalDetails = "+ JSON.stringify(personalDetails));
  };
  
  
  const renderInputField = (label, showSetter,Key) => (
    <div className="input-wrapper">
      <label>{label}</label>
      <div className="input-with-delete">
        <input type="text" placeholder={`Enter your ${label}`} value={personalDetails[Key]} onChange ={handleChange} />
         <FontAwesomeIcon icon={faTrash} className="faTrash" onClick={() => showSetter(false)} />
    
      </div>
    </div>
  );

 

  return (
    <div className="Desgin2">

      <h1 id="Designhtag">
        What’s the best way for employers to <br />
        contact you?
      </h1>
      <h6 id="Designhtag">
        We suggest including an email and phone number.
      </h6>

      <div id="indicates">* indicates a required field</div>

      <form>
        <div className="mainfromdiv">
          <div id="sideone" className="sidedes">
            <div>
              <label htmlFor="Firstname">FIRSTNAME</label>
              <input name="FirstName"  type="text" value={personalDetails.FirstName} onChange={handleChange} placeholder="e.g. Saanvi" />
            </div>

            <div>
              <label htmlFor="City">CITY</label>
              <input type="text" placeholder="e.g. Mumbai"value={personalDetails.City} onChange={handleChange}  name="City" />
            </div>

            <div>
              <label htmlFor="PhoneNumber">PHONENUMBER</label>
              <input
                type="text"
                placeholder="e.g. +91 22 1234 5677"
                name="PhoneNumber"
                value={personalDetails.PhoneNumber} onChange={handleChange}
              />
            </div>
            <div>
            {showLinkedIn && renderInputField("LinkedIn", setShowLinkedIn)}
          </div>
          <div>
       {showWebsite && renderInputField("Website", setShowWebsite)}
     </div>
          </div>

          <div id="sidetwo" className="sidedes">
            <div>
              <label htmlFor="SurName">SURNAME</label>
              <input type="text" placeholder="e.g. Patel" value={personalDetails.SurName} onChange={handleChange} name="SurName" />
            </div>

            <div id="country">
              <label htmlFor="Country">COUNTRY</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <label htmlFor="Pincode">PINCODE</label>
              <br />
              <input
                type="text"
                className="countryy"
                placeholder="e.g. India"
                name="Country"
                value={personalDetails.Country} onChange={handleChange}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <input
                type="text"
                className="country"
                placeholder="e.g. 123456"
                name="Pincode"
                value={personalDetails.Pincode} onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="EmailId">EMAIL</label>
              <input
                type="email"
                placeholder="e.g. Spatel@Sample.in"
                name="EmailId"
                value={personalDetails.EmailId} onChange={handleChange}
              />
              
            </div>
            
<div>
            {showDriving && renderInputField("Driving Licence", setShowDriving)}
     </div>
     
          </div>
        </div>
        
      </form>

      <div className="AdditionalInformation">
        <h6 className="AdditionalInfor">
          Add additional information to your resume (optional)
        </h6>
        {!showLinkedIn && (
          <button onClick={() => setShowLinkedIn(true)}>LinkedIn</button>
        )}
        {!showDriving && (
          <button onClick={() => setShowDriving(true)}>Driving Licence</button>
        )}
        {!showWebsite && (
          <button onClick={() => setShowWebsite(true)}>Website</button>
        )}
        
      </div>
    </div>
    
    
  );
}

export default HeadingQuestion;
