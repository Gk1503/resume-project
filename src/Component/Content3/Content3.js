import React from "react";
import "../Content3/Content3.css";
import List1 from "../Gallery/list1.png";
import List2 from "../Gallery/list2.png";
import List3 from "../Gallery/list3.png";


function Content3() {


return(
<>

<div className="Content33">


<h1>42% Higher Recruiter Response Rate</h1>

<h6>Our advanced Resume Builder helps job seekers craft tailored resumes that capture the attention of<br></br> recruiters and hiring managers, improving interview call-back rates and job prospects.</h6>
<div className="subcont33">
   <div>
    <img src={List1} alt=".."/>
   <h5>Click to add job-specific content written by<br></br> professional resume analysts.</h5>
   </div>
   <div>
    <img src={List2} alt=".."/>
   <h5>Easily tailor your resume to target a specific job<br></br> title or industry.</h5>
   </div>
   <div>
    <img src={List3} alt=".."/>
   <h5>Customize the design and format of your <br></br>resume to match your professional style.</h5>
   </div>

</div>


</div>

</>


)

}
export default Content3;