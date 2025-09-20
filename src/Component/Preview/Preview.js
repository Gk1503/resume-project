import React, { useEffect, useState, useContext  } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Preview.css";
import { jsPDF } from "jspdf";
import FormContext from "../Resume/Context/FormContext";
import { useNavigate } from "react-router-dom";

function Preview({ show, handleClose }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  const navigate = useNavigate();


  const {
    personalDetails,
    educationDetails,
    workHistory,
    skills,
    summary,
    isFresher,
  } = useContext(FormContext);

  useEffect(() => {
    if (show) {
      generatePdfPreview();
    }
  }, [show]);

  const generatePdf = () => {
    const doc = new jsPDF();
    let y = 20;
    const marginLeft = 20;

    // Helper to draw section header
    const drawSectionHeader = (title) => {
      doc.setFillColor(52, 152, 219); // Blue background
      doc.setTextColor(255, 255, 255); // White text
      doc.rect(marginLeft, y, 170, 10, "F");
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(title, marginLeft + 2, y + 7);
      y += 15;
      doc.setTextColor(0, 0, 0); // Reset to black
      doc.setFont(undefined, "normal");
    };

    // Header: Name & Contact
    doc.setFontSize(18);
    doc.setTextColor(44, 62, 80);
    doc.setFont(undefined, "bold");
    doc.text(
      `${personalDetails.FirstName} ${personalDetails.SurName}`,
      marginLeft,
      y
    );
    y += 10;

    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.setFont(undefined, "normal");
    doc.text(
      `${personalDetails.EmailId} | ${personalDetails.PhoneNumber} | ${personalDetails.City}, ${personalDetails.Country} - ${personalDetails.Pincode}`,
      marginLeft,
      y
    );
    y += 10;

    // Summary
    if (summary) {
      drawSectionHeader(" Summary");
      const summaryLines = doc.splitTextToSize(summary, 170);
      doc.text(summaryLines, marginLeft, y);
      y += summaryLines.length * 7 + 5;
    }

    // Education
    drawSectionHeader(" Education");
    doc.setFont(undefined, "bold");
    doc.text(
      `${educationDetails.Degree} in ${educationDetails.FieldOfStudy}`,
      marginLeft,
      y
    );
    y += 7;
    doc.setFont(undefined, "normal");
    doc.text(
      `${educationDetails.SchoolName}, ${educationDetails.SchoolLocation}`,
      marginLeft,
      y
    );
    y += 7;
    doc.text(
      `Graduation: ${educationDetails.GraduationMonth} ${educationDetails.GraduationYear}`,
      marginLeft,
      y
    );
    y += 10;

    // Work Experience
    drawSectionHeader(" Work Experience");
    if (isFresher) {
      doc.text("Fresher", marginLeft, y);
      y += 10;
    } else {
      doc.setFont(undefined, "bold");
      doc.text(`${workHistory.JobTitle} at ${workHistory.Employer}`, marginLeft, y);
      y += 7;
      doc.setFont(undefined, "normal");
      doc.text(`Location: ${workHistory.JobLocation}`, marginLeft, y);
      y += 7;
      doc.text(
        `Duration: ${workHistory.JobStartMonth} ${workHistory.JobStartYear} to ${workHistory.JobEndMonth} ${workHistory.JobEndYear}`,
        marginLeft,
        y
      );
      y += 10;
    }

    // Skills
    drawSectionHeader("Skills");
    skills.forEach((skill, index) => {
      doc.circle(marginLeft + 2, y + index * 7 - 1, 1.5, "F");
      doc.text(`${skill.name} (${skill.rating}/5)`, marginLeft + 6, y + index * 7);
    });
    y += skills.length * 7 + 10;

    return doc;
  };

  const generatePdfPreview = () => {
    const doc = generatePdf();
    const blob = doc.output("blob");
    const pdfPreviewUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfPreviewUrl);
  };

  const handleDownload = () => {
    const doc = generatePdf();
    doc.save("resume-preview.pdf");
    navigate('/');
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      scrollable
      dialogClassName="custom-modal"
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Resume PDF Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="500px"
            style={{ border: "1px solid #ccc" }}
          />
        ) : (
          <p>Generating PDF...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="sec" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className="Downloadbtn" onClick={handleDownload} disabled={!pdfUrl}>
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Preview;
