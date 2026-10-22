"use client";

import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Footer = () => {
  return (
    <>
      <div className="footer-area ptb-160 position-relative z-1">
        <Container className="cmw-1308">
          <Row className="g-4">
            <Col lg={4}>
              <div className="footer-single-item">
                <Link to="/" className="logo">
                  <img
                    src="/images/logo.svg"
                    className="black-logo"
                    alt="black-logo"
                    width={109}
                    height={29}
                  />
                  <img
                    src="/images/white-logo.svg"
                    className="d-none white-logo"
                    alt="white-logo"
                    width={109}
                    height={29}
                  />
                </Link>
                <p className="dec">
                  A modern sales enablement platform that helps teams track
                  leads, manage pipelines, and close deals faster — all from one
                  clean dashboard.
                </p>
              </div>
            </Col>

            <Col lg={8}>
              <Row className="g-4">
                <Col sm={4}>
                  <div className="footer-single-item pl-90">
                    <h3>Quick Links</h3>

                    <ul className="p-0 m-0 list-unstyled import-link">
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li>
                        <Link to="/features">Features</Link>
                      </li>
                      <li>
                        <Link to="/pricing">Pricing</Link>
                      </li>
                      <li>
                        <Link to="/Link">Use Cases</Link>
                      </li>
                      <li>
                        <Link to="#">Documentation</Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col sm={4}>
                  <div className="footer-single-item pl-62">
                    <h3>Resources</h3>
                    <ul className="p-0 m-0 list-unstyled import-link">
                      <li>
                        <Link to="#">Help Center</Link>
                      </li>
                      <li>
                        <Link to="#">Getting Started</Link>
                      </li>
                      <li>
                        <Link to="#">Integration Docs</Link>
                      </li>
                      <li>
                        <Link to="#">API Reference</Link>
                      </li>
                      <li>
                        <Link to="#">Community Forum</Link>
                      </li>
                    </ul>
                  </div>
                </Col>

                <Col sm={4}>
                  <div className="footer-single-item pl-45">
                    <h3>Social Media</h3>
                    <ul
                      className="p-0 mb-0 list-unstyled social-link"
                      style={{
                        gap: "10px",
                      }}
                    >
                      <li>
                        <a
                          href="https://www.facebook.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="/images/icons/facebook.svg"
                            alt="facebook"
                            width={24}
                            height={24}
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                          />
                          <span>Facebook</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.twitter.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="/images/icons/x.svg"
                            alt="x"
                            width={24}
                            height={24}
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                          />
                          <span>Twitter/X</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.linkedin.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="/images/icons/linkedin.svg"
                            alt="linkedin"
                            width={24}
                            height={24}
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                          />
                          <span>Linkedin</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="https://www.instagram.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="/images/icons/instagram.svg"
                            alt="instagram"
                            width={24}
                            height={24}
                            style={{
                              width: "auto",
                              height: "auto",
                            }}
                          />
                          <span>Instagram</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="copyright-area">
        <Container className="cmw-1308">
          <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-between align-items-center border-top border-gray-light copyright-content">
            <p className="fs-14 mb-0">
              © <span className="text-primary">Trezo</span> is Proudly Owned by{" "}
              <a
                href="https://envytheme.com/"
                target="_blank"
                className="text-decoration-none text-primary-50"
                rel="noreferrer"
              >
                EnvyTheme
              </a>
            </p>

            <ul className="p-0 m-0 list-unstyled d-flex flex-wrap justify-content-center justify-content-md-end terms-info">
              <li>
                <Link to="#">Terms of Service</Link>
              </li>
              <li>
                <Link to="#">Privacy Policy</Link>
              </li>
              <li>
                <Link to="#">Cookie Policy</Link>
              </li>
            </ul>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
