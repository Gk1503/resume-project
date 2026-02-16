import React, { useState, useEffect } from "react";
import "./Cont.css";
import amazon from "../Gallery/amazon.svg";
import Boeing from "../Gallery/Boeing.svg";
import google from "../Gallery/google.svg";
import verizon from "../Gallery/verizon.svg";
import medtronic from "../Gallery/medtronic.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faUserCheck } from '@fortawesome/free-solid-svg-icons';

function Content() {
    const [resumeCount, setResumeCount] = useState(1450);

    // Simulate live counter increment
    useEffect(() => {
        const interval = setInterval(() => {
            setResumeCount(prev => prev + Math.floor(Math.random() * 3));
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const companies = [
        { name: "Amazon", logo: amazon },
        { name: "Google", logo: google },
        { name: "Boeing", logo: Boeing },
        { name: "Verizon", logo: verizon },
        { name: "Medtronic", logo: medtronic },
    ];

    return (
        <section className="social-proof-section">
            <div className="sp-container">
                
                {/* Section 1: Trusted Companies */}
                <div className="companies-wrapper">
                    <p className="sp-label">Our customers have been hired by top companies:</p>
                    <div className="logo-grid">
                        {companies.map((company, index) => (
                            <div key={index} className="logo-item">
                                <img src={company.logo} alt={`${company.name} logo`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="divider-line"></div>

                {/* Section 2: Live Activity */}
                <div className="live-stats-wrapper">
                    <div className="live-indicator">
                        <FontAwesomeIcon icon={faCircle} className="pulse-dot" />
                        <span>LIVE</span>
                    </div>
                    
                    <div className="stats-content">
                        <div className="stat-number">
                            <span className="count">{resumeCount.toLocaleString()}</span>
                            <span className="plus">+</span>
                        </div>
                        <p className="stat-desc">
                            Resumes built today by job seekers like you.
                        </p>
                    </div>

                    <div className="join-badge">
                        <FontAwesomeIcon icon={faUserCheck} /> Join the success
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Content;