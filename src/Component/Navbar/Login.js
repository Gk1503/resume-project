import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import "./Login.css";

function Login({ show, handleClose, openRegister, onLogin }) {
  const [formData, setFormData] = useState({ email: "", password: "", otp: "", newPassword: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState("login"); // login, forgot, verifyOtp, reset

  useEffect(() => {
    if (show) {
      setMessage("");
      setStage("login");
      setFormData({ email: "", password: "", otp: "", newPassword: "", confirmPassword: "" });
    }
  }, [show]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // ---------------- Login ----------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("email", formData.email);
      if (onLogin) onLogin({ email: formData.email });
      setMessage(res.data.message);
      setTimeout(() => handleClose(), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  // ---------------- Forgot Password ----------------
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/forgot-password", { email: formData.email });
      setMessage(res.data.message);
      setStage("verifyOtp");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send OTP");
    }
  };

  // ---------------- Verify OTP ----------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/verify-otp", {
        email: formData.email,
        otp: formData.otp,
      });
      setMessage(res.data.message);
      setStage("reset");
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP");
    }
  };

  // ---------------- Reset Password ----------------
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/reset-password", {
        email: formData.email,
        password: formData.newPassword,
      });
      setMessage(res.data.message);
      setStage("login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered dialogClassName="login-modal-dialog" contentClassName="login-modal-content">
      <Modal.Header closeButton className="login-modal-header">
        <Modal.Title className="login-modal-title">
          {stage === "login" && "Welcome Back 👋"}
          {stage === "forgot" && "Forgot Password 🔒"}
          {stage === "verifyOtp" && "Verify OTP 🔑"}
          {stage === "reset" && "Reset Password 🔑"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="login-modal-body">
        {message && <Alert variant="info">{message}</Alert>}

        {stage === "login" && (
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit">Sign In</Button>
            <div className="login-extra-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setStage("forgot"); }}>Forgot Password?</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleClose(); openRegister(); }}>Create Account</a>
            </div>
          </Form>
        )}

        {stage === "forgot" && (
          <Form onSubmit={handleForgotSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit">Send OTP</Button>
            <div className="login-extra-links">
              <a href="#" onClick={(e) => { e.preventDefault(); setStage("login"); }}>Back to Login</a>
            </div>
          </Form>
        )}

        {stage === "verifyOtp" && (
          <Form onSubmit={handleVerifyOtp}>
            <Form.Group className="mb-3">
              <Form.Label>Enter OTP</Form.Label>
              <Form.Control type="text" name="otp" value={formData.otp} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit">Verify OTP</Button>
          </Form>
        )}

        {stage === "reset" && (
          <Form onSubmit={handleResetPassword}>
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit">Reset Password</Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default Login;
