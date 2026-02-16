import React from "react";
import "./Content3.css";
import List1 from "../Gallery/list1.png";
import List2 from "../Gallery/list2.png";
import List3 from "../Gallery/list3.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";

function Content3() {

    const steps = [
        {
            id: 1,
            img: List1,
            title: "Expert Content",
            desc: "Click to add job-specific content written by professional resume analysts.",
            delay: 0.1
        },
        {
            id: 2,
            img: List2,
            title: "Target Your Job",
            desc: "Easily tailor your resume to target a specific job title or industry.",
            delay: 0.2
        },
        {
            id: 3,
            img: List3,
            title: "Professional Format",
            desc: "Customize the design and format of your resume to match your professional style.",
            delay: 0.3
        }
    ];

    return(
        <section className="steps-section">
            <div className="steps-container">
                
                <div className="steps-header">
                    <span className="steps-badge">Why Choose Us?</span>
                    <h2>42% Higher Recruiter Response Rate</h2>
                    <p>
                        Our advanced Resume Builder helps job seekers craft tailored resumes 
                        that capture the attention of recruiters and hiring managers.
                    </p>
                </div>

                <div className="steps-grid">
                    {steps.map((step) => (
                        <motion.div 
                            className="step-card" 
                            key={step.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: step.delay }}
                        >
                            <div className="step-image-wrapper">
                                <span className="step-number">{step.id}</span>
                                <img src={step.img} alt={step.title} className="step-img"/>
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.desc}</p>
                            <div className="step-check">
                                <FontAwesomeIcon icon={faCheckCircle} /> Proven Results
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Content3;