import React from "react";
import "./Cont2.css";
import Rocket from "../Gallery/rocket.svg";
import Bulb from "../Gallery/bulb.svg";
import Checklist from "../Gallery/checklist.svg";
import Cloud from "../Gallery/cloud.svg";
import Smile from "../Gallery/smile.svg";
import Suitcase from "../Gallery/suitcase.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Content2() {
    const navigate = useNavigate();

    const OpenDesgin = () => {
        navigate('/DesginOne');
    }

    const features = [
        {
            id: 1,
            title: "Build in Minutes",
            description: "Effortlessly craft a compelling resume with our builder. Convert it to a Bold.pro profile to elevate your presence.",
            icon: Rocket,
            delay: "0"
        },
        {
            id: 2,
            title: "ATS-Friendly Templates",
            description: "Select from 40+ professionally designed templates built to pass Applicant Tracking Systems (ATS) and impress recruiters.",
            icon: Smile,
            delay: "100"
        },
        {
            id: 3,
            title: "Expert Content",
            description: "Overcome writer’s block with ready-made content suggestions. Click to add skills bullets tailored to your industry.",
            icon: Checklist,
            delay: "200"
        },
        {
            id: 4,
            title: "ATS Smart Scan",
            description: "Use our checker to scan for 30+ common errors. Get instant feedback and fixes to improve your resume score.",
            icon: Cloud,
            delay: "0"
        },
        {
            id: 5,
            title: "Professional Samples",
            description: "Get inspired by thousands of resume and cover letter examples for any job title, written by career experts.",
            icon: Bulb,
            delay: "100"
        },
        {
            id: 6,
            title: "Expert Support",
            description: "Get help from our career center or contact our dedicated customer support team for any account needs.",
            icon: Suitcase,
            delay: "200"
        }
    ];

    return (
        <section className="features-section">
            <div className="features-container">
                
                <div className="features-header">
                    <h2>Get Hired Fast With <span className="highlight-brand">MyPerfectResume</span></h2>
                    <p className="features-subtitle">
                        Powerful tools to help you build a professional resume that stands out.
                    </p>
                </div>

                <div className="features-grid">
                    {features.map((item) => (
                        <div key={item.id} className="feature-card">
                            <div className="icon-wrapper">
                                <img src={item.icon} alt={item.title} />
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>

                <div className="features-cta">
                    <button className="cta-button" onClick={OpenDesgin}>
                        Build My Resume <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    <p className="cta-note">Try it for free. No credit card required.</p>
                </div>

            </div>
        </section>
    );
}

export default Content2;
