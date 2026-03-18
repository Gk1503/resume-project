import React, { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faLock, 
  faArrowRight, 
  faCheckCircle, 
  faKey,
  faEye,
  faEyeSlash
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import api from "../../utils/api.config";
import { ENDPOINTS } from "../../utils/constant";
import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // handleSendOTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(ENDPOINTS.FORGOT_PASSWORD, { email });
      setMessage("success: " + res.data.message);
      setStep(2);
    } catch (err) {
      setMessage("error: " + (err.response?.data?.message || "Failed to send OTP"));
    } finally {
      setLoading(false);
    }
  };

  // handleVerifyOTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(ENDPOINTS.VERIFY_OTP, { email, otp });
      setMessage("success: " + res.data.message);
      setStep(3);
    } catch (err) {
      setMessage("error: " + (err.response?.data?.message || "Invalid OTP"));
    } finally {
      setLoading(false);
    }
  };

  // handleResetPassword
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("error: Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post(ENDPOINTS.RESET_PASSWORD, { email, password });
      setMessage("success: " + res.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage("error: " + (err.response?.data?.message || "Failed to reset password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="forgot-password-container">
      <div className="aura-glow"></div>
      
      <motion.div 
        id="forgot-password-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="aura-header">
           <div className="aura-icon-wrap">
              <FontAwesomeIcon icon={faKey} />
           </div>
           <h3>Reset Password</h3>
           <p>
             {step === 1 && "Enter your email to receive a verification code."}
             {step === 2 && "Enter the 6-digit OTP sent to your email."}
             {step === 3 && "Create a secure new password for your account."}
           </p>
        </div>

        {message && (
          <Alert variant={message.startsWith("success") ? "success" : "danger"} className="aura-alert">
            {message.split(": ")[1]}
          </Alert>
        )}

        {step === 1 && (
          <Form onSubmit={handleSendOTP} className="aura-form">
            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
                <Form.Control 
                  type="email" 
                  placeholder="Registered Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
                <div className="underglow"></div>
              </div>
            </Form.Group>
            <Button id="btn-forgot-submit" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Send OTP"}
              {!loading && <FontAwesomeIcon icon={faArrowRight} className="ms-2" />}
            </Button>
          </Form>
        )}

        {step === 2 && (
          <Form onSubmit={handleVerifyOTP} className="aura-form">
            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faCheckCircle} className="input-icon" />
                <Form.Control 
                  type="text" 
                  placeholder="Enter OTP" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  required 
                />
                <div className="underglow"></div>
              </div>
            </Form.Group>
            <Button id="btn-forgot-submit" type="submit" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Verify OTP"}
              {!loading && <FontAwesomeIcon icon={faArrowRight} className="ms-2" />}
            </Button>
          </Form>
        )}

        {step === 3 && (
          <Form onSubmit={handleResetPassword} className="aura-form">
            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  placeholder="New Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
                <button 
                  type="button" 
                  className="password-toggle-btn" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </button>
                <div className="underglow"></div>
              </div>
            </Form.Group>

            <Form.Group className="aura-field">
              <div className="aura-input-wrapper">
                <FontAwesomeIcon icon={faLock} className="input-icon" />
                <Form.Control 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Confirm Password" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
                <div className="underglow"></div>
              </div>
            </Form.Group>

            <Button id="btn-forgot-submit" type="submit" disabled={loading}>
              {loading ? "Resetting..." : "Update Password"}
              {!loading && <FontAwesomeIcon icon={faCheckCircle} className="ms-2" />}
            </Button>
          </Form>
        )}

        <div className="aura-footer">
           <span className="back-link" onClick={() => navigate("/login")}>Back to Login</span>
        </div>
      </motion.div>
    </div>
  );
}

export default ForgotPassword;
