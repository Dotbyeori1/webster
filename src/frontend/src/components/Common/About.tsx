import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const About = () => {
  return (
    <>
      <div className="about-trezo-area ptb-160">
        <Container className="cmw-1308">
          <Row className="g-4 align-items-center align-items-xxl-start">
            <Col lg={6}>
              <div className="about-img">
                <img
                  src="/images/cargo-container.png"
                  alt="cargo-container"
                  width={928}
                  height={1044}
                />
              </div>
            </Col>

            <Col lg={6}>
              <div className="about-content">
                <span className="top-title">About Trezo</span>

                <h2>Shipping Management Made Simple</h2>

                <p className="dec">
                  From first mile to last, Trezo keeps your operations moving
                  smoothly.
                </p>

                <div
                  className="d-flex align-items-center about-info-single-item mt-40 ms-30"
                  style={{
                    gap: "18px",
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="icon d-flex align-items-center justify-content-center">
                      <img
                        src="/images/icons/real-time-tracking.svg"
                        alt="real-time-tracking"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h3>Live Tracking</h3>
                    <p>Always know where your shipments are.</p>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center about-info-single-item rotate2"
                  style={{
                    gap: "18px",
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="icon bg2 d-flex align-items-center justify-content-center">
                      <img
                        src="/images/icons/file-management.svg"
                        alt="file-management"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h3>Centralized Management</h3>
                    <p>Orders, drivers, customers — all in one place.</p>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center about-info-single-item ms-30 rotate5"
                  style={{
                    gap: "18px",
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="icon bg3 d-flex align-items-center justify-content-center">
                      <img
                        src="/images/icons/alarm-bell.svg"
                        alt="alarm-bell"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h3>Automated Alerts</h3>
                    <p>Real-time updates to reduce delays and confusion.</p>
                  </div>
                </div>

                <div
                  className="d-flex align-items-center about-info-single-item rotate2"
                  style={{
                    gap: "18px",
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="icon bg4 d-flex align-items-center justify-content-center">
                      <img
                        src="/images/icons/customer-satisfaction.svg"
                        alt="customer-satisfaction"
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h3>Customer Satisfaction</h3>
                    <p>Transparent delivery experience boosts brand loyalty.</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default About;
