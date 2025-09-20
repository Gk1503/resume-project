import React,{useContext} from "react";
import "../Education/Education.css";
import FormContext from "../../Context/FormContext";

function Education() {

  const { educationDetails, setEducationDetails } = useContext(FormContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails(prev => ({ ...prev, [name]: value }));
    // console.log("educationDetails = "+ JSON.stringify(educationDetails));
  };
  return (
    <>
      <div className="education">
        <h2>Tell us about your education</h2>
        
          Enter your education experience so far, even if you are a current student or did not graduate.
      
        
        <form className="education-form">
          {/* Row 1: School Name and Location */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="schoolName">School Name *</label>
              <input name="SchoolName" type="text" id="schoolName" value={educationDetails.SchoolName}
              onChange={handleChange} placeholder="e.g. Oxford Software Institute & Oxford School of English" />
            </div>
            <div className="form-group">
              <label htmlFor="schoolLocation">School Location</label>
              <input type="text" id="schoolLocation" name="SchoolLocation" value={educationDetails.SchoolLocation}
              onChange={handleChange} placeholder="e.g. New Delhi, India" />
            </div>
          </div>


          {/* Row 2: Degree */}
          <div className="form-row">
            <div className="form-group fullwidth">
              <label htmlFor="degree">Degree</label>
              <select id="degree"  name="Degree"
              value={educationDetails.Degree}
              onChange={handleChange}>
                <option value="">Select</option>
                <option value="bachelor">Bachelor’s</option>
                <option value="master">Master’s</option>
                <option value="phd">Ph.D</option>
                <option value="diploma">Diploma</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          {/* Row 3: Field of Study and Graduation Date */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fieldOfStudy">Field of Study</label>
              <input type="text" id="fieldOfStudy" name="FieldOfStudy"  value={educationDetails.FieldOfStudy}
              onChange={handleChange} placeholder="e.g. Financial Accounting" />
             </div>
            <div className="form-group">
              <label>Graduation Date (or expected Graduation Date)</label>
              <div className="grad-date-selectors">
                <select name="GraduationMonth"
                value={educationDetails.GraduationMonth}
                onChange={handleChange} >
                  <option>Month</option>
                  {/* Add months */}
                  {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, idx) => (
                    <option key={idx} value={month}>{month}</option>
                  ))}
                </select>
                <select name="GraduationYear"
                value={educationDetails.GraduationYear}
                onChange={handleChange}>
                  <option>Year</option>
                  {/* Add years */}
                  {Array.from({ length: 20 }, (_, i) => new Date().getFullYear() + i).map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
                

          </div>
        </form>
        <div ><button className="AddAnother">+ Add Another </button></div>
      </div>
    </>
  );
}

export default Education;
