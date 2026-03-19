"use client";

import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Replace with your API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setResponseMessage("Your message has been sent successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        setResponseMessage("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-us-area pt-150 position-relative z-2">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="contact-us-img mb-4 mb-lg-0">
              <img
                src="/images/landing/contact-us.jpg"
                alt="contact-us"
                width={1084}
                height={1444}
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="contact-us-form ms-xl-4">
              <span className="top-title">
                <span>Contact Us</span>
              </span>

              <h2>
                Introducing Our Exceptional Team. Meet the Minds Driving Our
                Success
              </h2>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <label className="label text-secondary">Full Name</label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="bg-transparent h-55"
                    placeholder="Your full name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Email Address</label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent h-55"
                    placeholder="Your email address"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Phone Number</label>
                  <Form.Control
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-transparent h-55"
                    placeholder="Your phone number"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Subject</label>
                  <Form.Select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="form-control bg-transparent h-55"
                    required
                  >
                    <option value="">Select your subject</option>
                    <option value="Help Desk">Help Desk</option>
                    <option value="LMS">LMS</option>
                    <option value="CRM">CRM</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <label className="label text-secondary">Message</label>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="form-control bg-transparent"
                    placeholder="Write your message..."
                    required
                  ></textarea>
                </Form.Group>

                {responseMessage && (
                  <div className="mb-3 text-secondary">{responseMessage}</div>
                )}

                <Form.Group className="mb-0">
                  <button
                    type="submit"
                    className="btn btn-primary py-2 px-4 w-100 d-flex align-items-center justify-content-center gap-1"
                    disabled={loading}
                  >
                    <i
                      className={`ri-refresh-line fs-18 text-white ${
                        loading ? "spin-animation" : ""
                      }`}
                    ></i>
                    <span>{loading ? "Sending..." : "Send"}</span>
                  </button>
                </Form.Group>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactUs;
