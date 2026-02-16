import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { jsPDF } from "jspdf";
import api from "../../utils/api.config";
import { ENDPOINTS } from "../../utils/constant";
import FormContext from "../Resume/Context/FormContext";
import "./Preview.css";

function Preview({ show, handleClose }) {
  const contextData = useContext(FormContext);
  
  const [remoteData, setRemoteData] = useState({
    personalDetails: {},
    educationDetails: [],
    workHistory: [],
    skills: [],
    summary: "",
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [template, setTemplate] = useState("modern");
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const res = await api.get("/resume/get");
        if (res.data.success && res.data.resume) {
          const resume = res.data.resume;
          
          const [summaryRes, personalRes, eduRes, workRes, skillsRes] = await Promise.all([
            api.get(ENDPOINTS.GET_SUMMARY).catch(() => ({ data: {} })),
            api.get(ENDPOINTS.GET_PERSONAL_DETAILS).catch(() => ({ data: {} })),
            api.get(ENDPOINTS.GET_EDUCATION).catch(() => ({ data: {} })),
            api.get(ENDPOINTS.GET_WORK_HISTORY).catch(() => ({ data: {} })),
            api.get(ENDPOINTS.GET_SKILLS).catch(() => ({ data: {} }))
          ]);

          const safeGet = (res, keys, fallback = []) => {
             for (let key of keys) {
               if (res.data && res.data[key]) return res.data[key];
             }
             return Array.isArray(res.data) ? res.data : fallback;
          };

          const getSummaryText = (data) => {
            if (!data) return "";
            if (typeof data === 'string') return data;
            if (data.content) return data.content;
            if (data.summary?.content) return data.summary.content;
            if (data.summary && typeof data.summary === 'string') return data.summary;
            return "";
          };

          setRemoteData({
            personalDetails: personalRes.data.personalDetails || personalRes.data || resume.personalDetails || {},
            educationDetails: eduRes.data.educationDetails || eduRes.data.education || eduRes.data || resume.educationDetails || [],
            workHistory: workRes.data.workHistory || workRes.data.work || workRes.data || resume.workHistory || [],
            skills: skillsRes.data.skills || skillsRes.data.data || skillsRes.data || resume.skills || [],
            summary: getSummaryText(summaryRes.data) || getSummaryText(resume.summary) || getSummaryText(resume) || "",
          });
        }
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };

    if (show) fetchResume();
  }, [show]);

  const generatePdf = () => {
    const doc = new jsPDF();
    let y = 20;
    const marginLeft = 20;
    const pageWidth = 170;

    // Merge logic: Prioritize Context (Live UI) over Remote (Database)
    const hasData = (obj) => obj && Object.values(obj).some(val => val !== "" && val !== null && val !== undefined);

    const personalDetails = hasData(contextData?.personalDetails) ? contextData.personalDetails : remoteData.personalDetails;
    const summary = contextData?.summary || remoteData.summary;
    const skills = (contextData?.skills && contextData.skills.length > 0) ? contextData.skills : remoteData.skills;
    
    // Merge education: context list + active typing (if not already in list)
    let educationDetails = (contextData?.educationList && contextData.educationList.length > 0) ? [...contextData.educationList] : [...remoteData.educationDetails];
    if (hasData(contextData?.activeEducation)) {
        educationDetails.push(contextData.activeEducation);
    }

    console.log("=== EDUCATION DEBUG ===");
    console.log("Context educationList:", contextData?.educationList);
    console.log("Remote educationDetails:", remoteData.educationDetails);
    console.log("Merged educationDetails:", educationDetails);
    educationDetails.forEach((edu, idx) => {
      console.log(`Education ${idx}:`, {
        SchoolName: edu.SchoolName,
        Degree: edu.Degree,
        FieldOfStudy: edu.FieldOfStudy,
        Score: edu.Score,
        GradeType: edu.GradeType,
        GraduationYear: edu.GraduationYear
      });
    });

    // Merge work history
    let workHistory = (contextData?.workHistoryList && contextData.workHistoryList.length > 0) ? [...contextData.workHistoryList] : [...remoteData.workHistory];
    if (hasData(contextData?.activeWorkHistory)) {
        workHistory.push(contextData.activeWorkHistory);
    }

    const config = {
      modern: { primary: [37, 99, 235], secondary: [71, 85, 105], font: "helvetica", style: "bold" },
      executive: { primary: [15, 23, 42], secondary: [51, 65, 85], font: "times", style: "bold" },
      minimal: { primary: [0, 0, 0], secondary: [100, 116, 139], font: "helvetica", style: "normal" },
      photo: { primary: [37, 99, 235], secondary: [71, 85, 105], font: "helvetica", style: "bold" }
    }[template];

    const drawSectionHeader = (title) => {
      y += 5;
      doc.setFont(config.font, "bold");
      doc.setFontSize(12);
      doc.setTextColor(...config.primary);
      doc.text(title.toUpperCase(), marginLeft, y);
      
      y += 2;
      doc.setDrawColor(...config.primary);
      doc.setLineWidth(0.4);
      doc.line(marginLeft, y, marginLeft + pageWidth, y);
      y += 8;
      doc.setTextColor(0, 0, 0);
    };

    // Header Logic
    if (template === "photo") {
       // Photo Resume Layout
       const photoSize = 35;
       if (personalDetails.Photo) {
          try {
            doc.addImage(personalDetails.Photo, "JPEG", marginLeft, 20, photoSize, photoSize);
          } catch(e) {
             console.error("Error adding image to PDF", e);
          }
       }
       
       const textX = marginLeft + photoSize + 10;
       let textY = 30;
       
       doc.setFont(config.font, "bold");
       doc.setFontSize(26);
       doc.setTextColor(...config.primary);
       doc.text(`${personalDetails.FirstName || ""} ${personalDetails.SurName || ""}`, textX, textY);
       
       textY += 8;
       
       doc.setFontSize(10);
       doc.setFont(config.font, "normal");
       doc.setTextColor(...config.secondary);
       
       const contactItems = [
        personalDetails.EmailId,
        personalDetails.PhoneNumber,
        [personalDetails.City, personalDetails.Country].filter(Boolean).join(", "),
        personalDetails.DateOfBirth ? `DOB: ${personalDetails.DateOfBirth}` : null,
        personalDetails.MaritalStatus ? `${personalDetails.MaritalStatus}` : null
       ].filter(Boolean);
       
       // Render contact info in two columns if needed, or just list
       contactItems.forEach(item => {
           doc.text(`• ${item}`, textX, textY);
           textY += 5;
       });
       
       y = Math.max(y, 20 + photoSize + 10);

    } else if (template === "executive") {
       doc.setFont(config.font, "bold");
       doc.setFontSize(24);
       const name = `${personalDetails.FirstName || ""} ${personalDetails.SurName || ""}`.toUpperCase();
       doc.text(name, 105, y, { align: "center" });
       y += 10;
       doc.setFontSize(10);
       doc.setFont(config.font, "normal");
       const contact = [
        personalDetails.EmailId,
        personalDetails.PhoneNumber,
        [personalDetails.City, personalDetails.Country].filter(Boolean).join(", "),
        personalDetails.DateOfBirth ? `DOB: ${personalDetails.DateOfBirth}` : null,
        personalDetails.MaritalStatus ? `Status: ${personalDetails.MaritalStatus}` : null
      ].filter(Boolean).join(" | ");
      doc.text(contact, 105, y, { align: "center" });
      y += 15;

    } else {
       // Modern / Minimal
       doc.setFont(config.font, "bold");
       doc.setFontSize(26);
       doc.setTextColor(...config.primary);
       doc.text(`${personalDetails.FirstName || ""} ${personalDetails.SurName || ""}`, marginLeft, y);
       y += 10;
       doc.setFontSize(10);
       doc.setFont(config.font, "normal");
       doc.setTextColor(...config.secondary);
      
       const contact = [
        personalDetails.EmailId,
        personalDetails.PhoneNumber,
        [personalDetails.City, personalDetails.Country].filter(Boolean).join(", "),
        personalDetails.DateOfBirth ? `DOB: ${personalDetails.DateOfBirth}` : null,
        personalDetails.MaritalStatus ? `${personalDetails.MaritalStatus}` : null
       ].filter(Boolean).join("  •  ");
      
       doc.text(contact, marginLeft, y);
       y += 12;
    }

    // Summary
    if (summary && summary.trim()) {
      drawSectionHeader("Summary");
      doc.setFont(config.font, "normal");
      doc.setFontSize(10);
      const lines = doc.splitTextToSize(summary, pageWidth);
      doc.text(lines, marginLeft, y);
      y += (lines.length * 5) + 5;
    }

    // Experience
    if (workHistory.length) {
      drawSectionHeader("Experience");
      workHistory.forEach((job) => {
        doc.setFont(config.font, "bold");
        doc.setFontSize(11);
        doc.text(job.JobTitle || "Job Title", marginLeft, y);
        const dateRange = `${job.JobStartMonth || ""} ${job.JobStartYear || ""} - ${job.JobEndYear || "Present"}`;
        doc.setFont(config.font, "normal");
        doc.text(dateRange, marginLeft + pageWidth, y, { align: "right" });
        y += 5;
        doc.setFont(config.font, "italic");
        doc.setTextColor(...config.secondary);
        doc.text(`${job.Employer || "Company"} | ${job.JobLocation || "Location"}`, marginLeft, y);
        y += 8;
        doc.setTextColor(0, 0, 0);
        y += 2;
      });
    }

    // Education
    if (educationDetails.length) {
      drawSectionHeader("Education");
      educationDetails.forEach((edu) => {
        doc.setFont(config.font, "bold");
        doc.setFontSize(11);
        
        // Multi-line School Name
        const schoolNameLines = doc.splitTextToSize(edu.SchoolName || "University", pageWidth - 45);
        doc.text(schoolNameLines, marginLeft, y);
        
        // Date on the right
        doc.setFont(config.font, "normal");
        const gradDate = edu.GraduationYear ? `${edu.GraduationMonth ? edu.GraduationMonth + " " : ""}${edu.GraduationYear}` : "Date";
        doc.text(gradDate, marginLeft + pageWidth, y, { align: "right" });
        
        y += (schoolNameLines.length * 5);
        
        // Location (if present)
        if (edu.SchoolLocation) {
           doc.setFont(config.font, "italic");
           doc.setFontSize(10);
           doc.setTextColor(...config.secondary);
           doc.text(edu.SchoolLocation, marginLeft, y);
           y += 5;
           doc.setTextColor(0, 0, 0);
        }

        // Degree and Field
        doc.setFont(config.font, "normal");
        doc.setFontSize(10);
        let eduInfoLine = edu.Degree || "Degree";
        if (edu.Degree !== "10th" && edu.FieldOfStudy) {
          eduInfoLine += ` in ${edu.FieldOfStudy}`;
        }
        
        // Marks / Score
        if (edu.Score) {
          const scoreLabel = edu.GradeType === "Percentage" ? "Percentage" : "CGPA";
          eduInfoLine += `  •  ${scoreLabel}: ${edu.Score}${edu.GradeType === "Percentage" ? "%" : ""}`;
        }

        const infoLines = doc.splitTextToSize(eduInfoLine, pageWidth);
        doc.text(infoLines, marginLeft, y);
        y += (infoLines.length * 5) + 5;
      });
    }

    // Skills
    if (skills.length) {
      drawSectionHeader("Skills");
      doc.setFont(config.font, "normal");
      doc.setFontSize(10);
      let skillX = marginLeft;
      let skillY = y;
      const colWidth = pageWidth / 3;
      
      skills.forEach((skill, index) => {
        doc.text(`• ${skill.name}`, skillX, skillY);
        skillX += colWidth;
        if ((index + 1) % 3 === 0) {
          skillX = marginLeft;
          skillY += 6;
        }
      });
      y = skillY + 10;
    }

    // Hobbies
    if (contextData?.hobbies && contextData.hobbies.length) {
      drawSectionHeader("Hobbies");
      doc.setFont(config.font, "normal");
      doc.setFontSize(10);
      const hobbiesText = contextData.hobbies.join(", ");
      const lines = doc.splitTextToSize(hobbiesText, pageWidth);
      doc.text(lines, marginLeft, y);
      y += (lines.length * 5) + 5;
    }

    return doc;
  };

  const generatePdfPreview = () => {
    const doc = generatePdf();
    const blob = doc.output("blob");
    setPdfUrl(URL.createObjectURL(blob));
  };

  useEffect(() => {
    if (show) generatePdfPreview();
  }, [show, template, remoteData, contextData]);

  const handleDownload = () => {
    const doc = generatePdf();
    doc.save("resume.pdf");
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" scrollable className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Finalize Your Resume</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-light">
        <div className="preview-layout">
          <div className="preview-settings p-4 border-bottom bg-white">
            <h5 className="mb-3">Choose a Template</h5>
            <div className="template-grid d-flex gap-3">
              {[
                { id: "modern", name: "Modern Blue", color: "#2563eb" },
                { id: "executive", name: "Executive", color: "#0f172a" },
                { id: "minimal", name: "Sleek Minimal", color: "#000000" },
                { id: "photo", name: "Photo Resume", color: "#2563eb" }
              ].map(t => (
                <div 
                  key={t.id}
                  className={`template-card p-3 border rounded text-center cursor-pointer ${template === t.id ? "border-primary bg-primary text-white" : "bg-white"}`}
                  onClick={() => setTemplate(t.id)}
                  style={{ flex: 1, cursor: "pointer" }}
                >
                  <div className="template-dot mb-2 mx-auto" style={{ width: 12, height: 12, borderRadius: "50%", background: template === t.id ? "white" : t.color }}></div>
                  <div className="small fw-bold">{t.name}</div>
                </div>
              ))}
            </div>

            {template === 'photo' && (
              <div className="mt-4 p-3 bg-light rounded border">
                 <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label className="fw-bold">Upload Profile Photo</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={(e) => {
                       const file = e.target.files[0];
                       if (file) {
                         const reader = new FileReader();
                         reader.onloadend = () => {
                           const newPhoto = reader.result;
                           setPhoto(newPhoto);
                           
                           // Update local data to reflect change immediately in PDF
                           setRemoteData(prev => ({
                             ...prev,
                             personalDetails: { ...prev.personalDetails, Photo: newPhoto } 
                           }));

                           // Update Context if setter available (it should be)
                           if (contextData?.setPersonalDetails) {
                               contextData.setPersonalDetails(prev => ({ ...prev, Photo: newPhoto }));
                           }
                         };
                         reader.readAsDataURL(file);
                       }
                    }} />
                 </Form.Group>
                 {(photo || contextData?.personalDetails?.Photo || remoteData?.personalDetails?.Photo) && (
                    <div className="d-flex align-items-center gap-3">
                        <img 
                          src={photo || contextData?.personalDetails?.Photo || remoteData?.personalDetails?.Photo} 
                          alt="Preview" 
                          style={{ width: 60, height: 60, borderRadius: "50%", objectFit: "cover", border: "2px solid #2563eb" }} 
                        />
                        <span className="text-secondary small">Photo Selected</span>
                    </div>
                 )}
              </div>
            )}
          </div>

          <div className="pdf-container p-4 d-flex justify-content-center">
            {pdfUrl && (
              <iframe
                key={pdfUrl}
                src={pdfUrl}
                title="PDF Preview"
                width="100%"
                height="650px"
                style={{ border: "1px solid #e2e8f0", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", borderRadius: 8 }}
              />
            )}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="bg-white">
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownload} disabled={!pdfUrl} className="px-4 fw-bold">
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Preview;
