import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Logo from "../Gallery/myperfectresume.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import api from "../../utils/api.config";
import { ENDPOINTS } from "../../utils/constant";
import { useNavigate } from "react-router-dom";
import "./Nav.css";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userData, setUserData] = useState({ full_name: "", email: "", phone: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // New state for mobile menu

  // Check login status on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token);
    }
  }, []);

  // Reactive sync for authentication state
  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      if (token) fetchUserProfile(token);
      else setUserData({ full_name: "", email: "", phone: "" });
    };

    window.addEventListener("authChange", syncAuth);
    window.addEventListener("storage", syncAuth); // Sync across tabs

    return () => {
      window.removeEventListener("authChange", syncAuth);
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  // Fetch user details
  const fetchUserProfile = async (token) => {
    try {
      const res = await api.get(ENDPOINTS.PROFILE);
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
    setMobileMenuOpen(false);
    window.dispatchEvent(new Event("authChange"));
    navigate("/");
  };

  const toggleMobileMenu = () => {
      setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
      setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar-custom">
        <Container className="navbar-container">
            {/* Logo Section */}
            <div className="navbar-logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
                <img src={Logo} alt="MyPerfectResume Logo" className="logo-img" />
            </div>

            {/* Desktop Navigation */}
            <div className="navbar-links desktop-only">
                <a href="#builders" className="nav-link-item">Builders</a>
                <a href="#resumes" className="nav-link-item">Resumes</a>
                <a href="#cover-letters" className="nav-link-item">Cover Letters</a>
                <a href="#cvs" className="nav-link-item">CVs</a>
                <a href="#resources" className="nav-link-item">Resources</a>
            </div>

            {/* Actions Section (Login/Register) */}
            <div className="navbar-actions desktop-only">
                {!isLoggedIn ? (
                        <>
                        <button
                            className="btn-login"
                            onClick={() => navigate("/login")}
                        >
                            <FontAwesomeIcon icon={faUser} /> Log In
                        </button>
                        <button
                            className="btn-register"
                            id="signup-nav-btn"
                            onClick={() => navigate("/signup")}
                        >
                            Sign Up
                        </button>
                        </>
                ) : (
                    <div className="navbar-actions desktop-only">
                        <button className="btn-user" onClick={() => navigate("/profile")}>
                            <FontAwesomeIcon icon={faUser} /> My Profile
                        </button>
                        <button className="btn-logout-minimal" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Hamburger */}
            <div className="mobile-toggle" onClick={toggleMobileMenu}>
                <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} />
            </div>
        </Container>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <div className="mobile-nav-links">
                <a href="#builders" onClick={closeMobileMenu}>Builders</a>
                <a href="#resumes" onClick={closeMobileMenu}>Resumes</a>
                <a href="#cover-letters" onClick={closeMobileMenu}>Cover Letters</a>
                <a href="#cvs" onClick={closeMobileMenu}>CVs</a>
                <a href="#resources" onClick={closeMobileMenu}>Resources</a>
                <hr />
                 {!isLoggedIn ? (
                    <div className="mobile-auth-buttons">
                        <button onClick={() => { navigate("/login"); closeMobileMenu(); }}>Log In</button>
                        {/* The original instruction's "Forgot Password?" link with setStage is not applicable here as setStage is not defined in Navbar.js.
                            Keeping the original "Sign Up" button as it's a valid action for the Navbar. */}
                        <button onClick={() => { navigate("/signup"); closeMobileMenu(); }} className="highlight">Sign Up</button>
                    </div>
                ) : (
                    <div className="mobile-auth-buttons">
                        <button onClick={() => { navigate("/profile"); closeMobileMenu(); }}>My Profile</button>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
      </nav>

    </>
  );
}

export default Navbar;
