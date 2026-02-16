import React, { useState, useEffect } from "react";
import { Form, Button, Alert, Card, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone, faLock, faEnvelope, faCheckCircle, faArrowLeft, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import api from "../../utils/api.config";
import { ENDPOINTS } from "../../utils/constant";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ full_name: "", email: "", phone: "" });
  const [phone, setPhone] = useState("");
  const [passwordForm, setPasswordForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get(ENDPOINTS.PROFILE);
        setUser(res.data);
        setPhone(res.data.phone || "");
      } catch (err) {
        console.error("Failed to fetch profile:", err);
        // If it's a 401/403, the global interceptor will handle it.
        // For other errors, we stay on the page but show a message if needed.
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleUpdatePhone = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post(ENDPOINTS.UPDATE_PHONE, { phone });
      setMessage("success: Contact number updated successfully.");
      setUser({ ...user, phone });
    } catch (err) {
      setMessage("error: Failed to update contact number.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setMessage("error: Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      await api.post(ENDPOINTS.CHANGE_PASSWORD, {
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      setMessage("success: Password changed successfully.");
      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setMessage(`error: ${err.response?.data?.message || "Failed to change password."}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="luminal-profile-container">
      <div className="aura-glow"></div>
      
      <Container className="profile-content">
        <motion.div 
          className="profile-header-actions"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button className="btn-back" onClick={() => navigate("/")}>
             <FontAwesomeIcon icon={faArrowLeft} /> Back
          </button>
        </motion.div>

        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <motion.div 
              className="profile-main-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header */}
              <div className="card-header-premium">
                <div className="user-avatar-wrap">
                  <div className="avatar-initials">{user.full_name?.charAt(0)}</div>
                  <div className="verified-badge">
                    <FontAwesomeIcon icon={faCheckCircle} />
                  </div>
                </div>
                <div className="user-meta">
                  <h2>{user.full_name}</h2>
                  <p><FontAwesomeIcon icon={faEnvelope} className="me-2" /> {user.email}</p>
                </div>
              </div>

              {message && (
                <Alert variant={message.startsWith("success") ? "success" : "danger"} className="lum-alert mx-4 mt-3">
                  {message.split(": ")[1]}
                </Alert>
              )}

              <div className="card-body-premium">
                <Row className="g-4">
                  {/* Contact Info */}
                  <Col md={6}>
                    <div className="management-sector">
                      <h3><FontAwesomeIcon icon={faUserEdit} className="sector-icon" /> Identity & Contact</h3>
                      <Form onSubmit={handleUpdatePhone} className="lum-form">
                        <Form.Group className="mb-3">
                          <Form.Label>Contact Number</Form.Label>
                          <div className="lum-input-wrapper">
                            <FontAwesomeIcon icon={faPhone} className="input-icon" />
                            <Form.Control 
                              type="text" 
                              value={phone} 
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="Update your phone"
                            />
                          </div>
                        </Form.Group>
                        <Button className="btn-lum-action" type="submit" disabled={loading}>
                          {loading ? "Updating..." : "Update Contact"}
                        </Button>
                      </Form>
                    </div>
                  </Col>

                  {/* Security */}
                  <Col md={6}>
                    <div className="management-sector">
                      <h3><FontAwesomeIcon icon={faLock} className="sector-icon" /> Security Sync</h3>
                      <Form onSubmit={handleChangePassword} className="lum-form">
                        <Form.Group className="mb-3">
                          <div className="lum-input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <Form.Control 
                              type="password" 
                              placeholder="Current Password"
                              value={passwordForm.oldPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                              required
                            />
                          </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <div className="lum-input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <Form.Control 
                              type="password" 
                              placeholder="New Password"
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                              required
                            />
                          </div>
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <div className="lum-input-wrapper">
                            <FontAwesomeIcon icon={faLock} className="input-icon" />
                            <Form.Control 
                              type="password" 
                              placeholder="Confirm New Password"
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                              required
                            />
                          </div>
                        </Form.Group>
                        <Button className="btn-lum-action secondary" type="submit" disabled={loading}>
                           {loading ? "Securing..." : "Change Password"}
                        </Button>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
