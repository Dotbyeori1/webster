import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Cta = () => {
  return (
    <>
      <div className="cta-area">
        <Container className="cmw-1705">
          <div
            className="cta-wrap position-relative z-1 overflow-hidden bg-img"
            style={{
              backgroundImage: "url(/images/cargo-package-bg.jpg)",
            }}
          >
            <Container className="cmw-1310">
              <Row className="align-items-center g-4">
                <Col lg={6}>
                  <div className="cta-content">
                    <h2 className="text-secondary">
                      Ready to Upgrade Your Delivery Operations?
                    </h2>
                    <p>
                      Start managing shipments smarter with Trezo’s powerful
                      logistics platform.
                    </p>
                    <Link
                      to="#"
                      className="btn border-primary-50 bg-primary-50 border-1 fw-medium fs-14 rounded-2 hover-bg  py-lg-3"
                    >
                      Get Started Free
                    </Link>
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="cta-imgs">
                    <img
                      src="/images/cargo-package.png"
                      alt="cta"
                      width={630}
                      height={425}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Cta;
