  import React, { useState } from "react";
  import { Modal, Button, Form, Alert } from "react-bootstrap";
  import axios from "axios";
  import "./Register.css";

  function Register({ show, handleClose, openLogin }) {
    const [formData, setFormData] = useState({ full_name: "", email: "", phone: "", password: "", confirmPassword: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (formData.password !== formData.confirmPassword) {
        setMessage("Passwords do not match");
        return;
      }

      try {
        const res = await axios.post("http://localhost:5000/register", formData);
        setMessage(res.data.message);
        setTimeout(() => {
          handleClose();
          openLogin();
        }, 1500);
      } catch (err) {
        setMessage(err.response?.data?.message || "Something went wrong");
      }
    };

    return (
      <Modal show={show} onHide={handleClose} centered dialogClassName="register-modal-dialog" contentClassName="register-modal-content">
        <div className="register-modal-wrapper">
          <div className="register-modal-left">
            <h2>Welcome!</h2>
            <p>Create your free account and start building your professional resume today.</p>
          </div>
          <div className="register-modal-right">
            <Modal.Header closeButton className="register-modal-header">
              <div className="register-header-wrapper">
                <Modal.Title>Create Your Account</Modal.Title>
                <Button variant="link" className="back-to-login-btn" onClick={() => { handleClose(); openLogin(); }}>Back to Login</Button>
              </div>
            </Modal.Header>
            <Modal.Body className="register-modal-body">
              {message && <Alert variant="info">{message}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="tel" name="phone" value={formData.phone} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
                </Form.Group>
                <Button type="submit" className="register-submit-btn">Create Account</Button>
              </Form>
            </Modal.Body>
          </div>
        </div>
      </Modal>
    );
  }

  export default Register;
