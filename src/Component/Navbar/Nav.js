import React, { useState, useEffect } from "react";
import "../Navbar/Nav.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "../Gallery/myperfectresume.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import LoginModal from "../Navbar/Login";
import RegisterModal from "../Navbar/Register";

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState({ full_name: "", email: "", phone: "" });

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
  }, []);

  // Fetch user details
  const fetchUserProfile = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(res.data);
    } catch (err) {
      console.log("Error fetching profile:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setShowDropdown(false);
    setShowProfileModal(false);
    setUserData({ full_name: "", email: "", phone: "" });
  };

  return (
    <>
      <Container fluid className="p-0">
        <Row className="navbar-row align-items-center">
          {/* Logo */}
          <Col xs={4} md={3} className="logo-col">
            <img src={Logo} alt="MyPerfectResume Logo" className="logo" />
          </Col>

          {/* Navigation Links */}
          <Col xs={4} md={6} className="nav-links-col d-none d-md-flex">
            <div className="nav-items">
              <a href="#builders" className="nav-item">BUILDERS</a>
              <a href="#resumes" className="nav-item">RESUMES</a>
              <a href="#cover-letters" className="nav-item">COVER LETTERS</a>
              <a href="#cvs" className="nav-item">CVs</a>
              <a href="#resources" className="nav-item">RESOURCES</a>
            </div>
          </Col>

          {/* Actions */}
          <Col xs={4} md={3} className="account-actions-col">
            <div className="account-actions">
              {!isLoggedIn ? (
                <>
                  <a
                    href="#"
                    className="nav-link login-link"
                    onClick={() => setShowLogin(true)}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>&nbsp;Login</span>
                  </a>
                  <button
                    className="free-account-btn"
                    onClick={() => setShowRegister(true)}
                  >
                    Free Account
                  </button>
                </>
              ) : (
                <div
                  className="user-dropdown"
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  <button className="user-btn">
                    <FontAwesomeIcon icon={faUser} /> <span>User</span>
                  </button>
                  {showDropdown && (
                    <div className="dropdown-menu">
                      <a
                        href="#"
                        onClick={() => setShowProfileModal(true)}
                      >
                        My Profile
                      </a>
                      <a
                        href="#"
                        onClick={handleLogout}
                      >
                        Logout
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>

      {/* Custom Profile Modal */}
      {showProfileModal && (
        <div className="custom-modal-overlay">
          <div className="custom-modal-content">
            <h2>User Profile</h2>
            <p><strong>Full Name:</strong> {userData.full_name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <button
              className="close-modal-btn"
              onClick={() => setShowProfileModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Login & Register Modals */}
      <LoginModal
        show={showLogin}
        handleClose={() => setShowLogin(false)}
        openRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
        onLogin={(user) => {
          setIsLoggedIn(true);
          setUserData(user); // Save logged-in user info
        }}
      />
      <RegisterModal
        show={showRegister}
        handleClose={() => setShowRegister(false)}
        openLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
    </>
  );
}

export default Navbar;
