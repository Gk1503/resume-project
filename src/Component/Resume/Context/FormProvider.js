import React, { useState } from "react";
import FormContext from "../Context/FormContext";

const FormProvider = ({ children }) => {
  const [personalDetails, setPersonalDetails] = useState({
    FirstName: "", SurName: "", PhoneNumber: "", City: "", Country: "",
    Pincode: "", EmailId: "", LinkedIn: "", Website: "", DrivingLicence: ""
  });

  // Active form entries (what's currently being typed)
  const [activeEducation, setActiveEducation] = useState({
    SchoolName: "", SchoolLocation: "", Degree: "", FieldOfStudy: "",
    GraduationMonth: "", GraduationYear: "", Score: "", GradeType: ""
  });

  const [activeWorkHistory , setActiveWorkHistory] = useState({
    JobTitle: "", Employer: "", JobLocation: "", JobStartMonth: "",
    JobStartYear: "", JobEndMonth: "", JobEndYear: ""
  });

  // Full lists (saved entries)
  const [educationList, setEducationList] = useState([]);
  const [workHistoryList, setWorkHistoryList] = useState([]);

  const [isFresher, setIsFresher] = useState(false); 
  const [skills, setSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [summary, setSummary] = useState("");
  const [changebtn , setchangebtn] = useState(1);

  return (
    <FormContext.Provider
      value={{
        personalDetails, setPersonalDetails,
        activeEducation, setActiveEducation,
        activeWorkHistory, setActiveWorkHistory,
        educationList, setEducationList,
        workHistoryList, setWorkHistoryList,
        isFresher, setIsFresher, 
        skills, setSkills,
        hobbies, setHobbies,
        summary, setSummary,
        changebtn,setchangebtn
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
