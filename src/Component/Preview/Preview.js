import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { jsPDF } from "jspdf";
import axios from "axios";
import "./Preview.css";

function Preview({ show, handleClose }) {
  const [resumeData, setResumeData] = useState({
    personalDetails: {},
    educationDetails: [],
    workHistory: [],
    skills: [],
    summary: "",
  });
  const [pdfUrl, setPdfUrl] = useState(null);
  const [template, setTemplate] = useState("template1"); // default template

  // Fetch resume data from backend
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/resume/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ensure defaults in case some data is missing
        setResumeData({
          personalDetails: res.data.personalDetails || {},
          educationDetails: res.data.educationDetails || [],
          workHistory: res.data.workHistory || [],
          skills: res.data.skills || [],
          summary: res.data.summary || "",
        });
      } catch (err) {
        console.error("Error fetching resume:", err);
      }
    };

    if (show) fetchResume();
  }, [show]);

  // Generate PDF
  const generatePdf = () => {
    const doc = new jsPDF();
    if (!resumeData) return doc;

    let y = 20;
    const marginLeft = 20;

    const { personalDetails, educationDetails, workHistory, skills, summary } = resumeData;

    const headerColor = template === "template1" ? [52, 152, 219] : [231, 76, 60];
    const fontSizeName = template === "template1" ? 18 : 20;

    // Header: Name & Contact
    doc.setFontSize(fontSizeName);
    doc.setFont(undefined, "bold");
    doc.setTextColor(44, 62, 80);
    doc.text(`${personalDetails.FirstName || ""} ${personalDetails.SurName || ""}`, marginLeft, y);
    y += 10;

    doc.setFontSize(11);
    doc.setFont(undefined, "normal");
    doc.setTextColor(100);
    doc.text(
      `${personalDetails.EmailId || ""} | ${personalDetails.PhoneNumber || ""} | ${personalDetails.City || ""}, ${personalDetails.Country || ""}`,
      marginLeft,
      y
    );
    y += 10;

    // Helper for section headers
    const drawSectionHeader = (title) => {
      doc.setFillColor(...headerColor);
      doc.setTextColor(255, 255, 255);
      doc.rect(marginLeft, y, 170, 10, "F");
      doc.setFontSize(12);
      doc.setFont(undefined, "bold");
      doc.text(title, marginLeft + 2, y + 7);
      y += 15;
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "normal");
    };


    // Summary
    if (summary) {
      drawSectionHeader("Summary");
      const summaryLines = doc.splitTextToSize(summary, 170);
      doc.text(summaryLines, marginLeft, y);
      y += summaryLines.length * 7 + 5;
    }

    // Education Section
    if (educationDetails.length) {
      drawSectionHeader("Education");
      educationDetails.forEach((edu) => {
        doc.setFont(undefined, "bold");
        doc.text(`${edu.Degree || ""} in ${edu.FieldOfStudy || ""}`, marginLeft, y);
        y += 7;
        doc.setFont(undefined, "normal");
        doc.text(`${edu.SchoolName || ""}, ${edu.SchoolLocation || ""}`, marginLeft, y);
        y += 7;
        doc.text(`Graduation: ${edu.GraduationMonth || ""} ${edu.GraduationYear || ""}`, marginLeft, y);
        y += 10;
      });
    }

    // Work History Section
    if (workHistory.length) {
      drawSectionHeader("Work Experience");
      workHistory.forEach((job) => {
        doc.setFont(undefined, "bold");
        doc.text(`${job.JobTitle || ""} at ${job.Employer || ""}`, marginLeft, y);
        y += 7;
        doc.setFont(undefined, "normal");
        doc.text(`Location: ${job.JobLocation || ""}`, marginLeft, y);
        y += 7;
        doc.text(
          `Duration: ${job.JobStartMonth || ""} ${job.JobStartYear || ""} to ${job.JobEndMonth || ""} ${job.JobEndYear || ""}`,
          marginLeft,
          y
        );
        y += 10;
      });
    }

    // Skills Section
    if (skills.length) {
      drawSectionHeader("Skills");
      skills.forEach((skill, index) => {
        doc.circle(marginLeft + 2, y + index * 7 - 1, 1.5, "F");
        doc.text(`${skill.name || ""} (${skill.rating || 0}/5)`, marginLeft + 6, y + index * 7);
      });
      y += skills.length * 7 + 10;
    }

    return doc;
  };

  const generatePdfPreview = () => {
    if (!resumeData) return;
    const doc = generatePdf();
    const blob = doc.output("blob");
    const pdfPreviewUrl = URL.createObjectURL(blob);
    setPdfUrl(pdfPreviewUrl);
  };

  useEffect(() => {
    if (show && resumeData) generatePdfPreview();
  }, [show, template, resumeData]);

  const handleDownload = () => {
    const doc = generatePdf();
    if (!doc) return;
    doc.save("resume.pdf");
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" scrollable className="custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Resume PDF Preview</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Select Template:</Form.Label>
          <Form.Select value={template} onChange={(e) => setTemplate(e.target.value)}>
            <option value="template1">Template 1 (Blue)</option>
            <option value="template2">Template 2 (Red)</option>
          </Form.Select>
        </Form.Group>
        {pdfUrl ? (
          <iframe
            src={pdfUrl}
            title="PDF Preview"
            width="100%"
            height="500px"
            style={{ border: "1px solid #ccc", marginTop: "10px" }}
          />
        ) : (
          <p>Generating PDF...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleDownload} disabled={!pdfUrl}>Download PDF</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Preview;
