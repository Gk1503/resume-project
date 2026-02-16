import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faLinkedin, 
  faTwitter, 
  faGithub, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';
import { 
  faEnvelope, 
  faPhone, 
  faLocationDot 
} from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-premium">
      <Container>
        <Row className="footer-top">
          <Col lg={4} md={6} className="footer-brand-section">
            <h2 className="footer-logo">my<span>perfect</span>resume</h2>
            <p className="footer-tagline">
              Empowering professionals to build their dream careers with AI-driven tools and expert guidance.
            </p>
            <div className="social-links">
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faGithub} /></a>
              <a href="#" className="social-icon"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </Col>

          <Col lg={2} md={6} className="footer-links-section">
            <h5 className="footer-heading">Services</h5>
            <ul className="footer-list">
              <li><a href="#">Resume Builder</a></li>
              <li><a href="#">CV Builder</a></li>
              <li><a href="#">Cover Letter Builder</a></li>
              <li><a href="#">Resume Templates</a></li>
              <li><a href="#">Check Score</a></li>
            </ul>
          </Col>

          <Col lg={2} md={6} className="footer-links-section">
            <h5 className="footer-heading">Resources</h5>
            <ul className="footer-list">
              <li><a href="#">Career Blog</a></li>
              <li><a href="#">Resume Guide</a></li>
              <li><a href="#">Job Search Tips</a></li>
              <li><a href="#">Interview Prep</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </Col>

          <Col lg={4} md={6} className="footer-contact-section">
            <h5 className="footer-heading">Get in Touch</h5>
            <ul className="footer-contact-list">
              <li>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>support@resumeai.com</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faPhone} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li>
                <FontAwesomeIcon icon={faLocationDot} />
                <span>123 AI Street, Tech Valley, CA</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr className="footer-divider" />

        <Row className="footer-bottom">
          <Col md={6} className="footer-copyright">
            <p>© 2026 Resume AI Builder. All rights reserved.</p>
          </Col>
          <Col md={6} className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
