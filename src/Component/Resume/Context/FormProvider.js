import React, { useState } from "react";
import FormContext from "../Context/FormContext";

const FormProvider = ({ children }) => {
  const [personalDetails, setPersonalDetails] = useState({
    FirstName: "", SurName: "", PhoneNumber: "", City: "", Country: "",
    Pincode: "", EmailId: "", LinkedIn: "", Website: "", DrivingLicence: ""
  });

  const [educationDetails, setEducationDetails] = useState({
    SchoolName: "", SchoolLocation: "", Degree: "", FieldOfStudy: "",
    GraduationMonth: "", GraduationYear: ""
  });

  const [workHistory , setworkHistory] = useState({
    JobTitle: "", Employer: "", JobLocation: "", JobStartMonth: "",
    JobStartYear: "", JobEndMonth: "", JobEndYear: ""
  });

  const [isFresher, setIsFresher] = useState(false); 

  const [skills, setSkills] = useState([]);
  const [summary, setSummary] = useState("");

  const [changebtn , setchangebtn] = useState(1);

  return (
    <FormContext.Provider
      value={{
        personalDetails, setPersonalDetails,
        educationDetails, setEducationDetails,
        workHistory, setworkHistory,
        isFresher, setIsFresher, 
        skills, setSkills,
        summary, setSummary,
        changebtn,setchangebtn
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
