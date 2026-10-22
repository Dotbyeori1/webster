import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HeroBanner = () => {
  const [showVideo, setShowVideo] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowVideo(false);
      }
    };

    if (showVideo) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVideo]);

  return (
    <>
      <div className="banner-area position-relative z-1">
        <Container className="cmw-1705">
          <div
            className="bg-img"
            style={{
              backgroundImage: "url(/images/banner-bg.jpg)",
            }}
          >
            <Row className="align-items-center g-4">
              <Col lg={5}>
                <div className="banner-content position-relative z-1">
                  <div className="d-inline-block">
                    <span
                      className="d-flex align-items-center top-title justify-content-center border border-primary"
                      style={{
                        padding: "3px 15px",
                        gap: "10px",
                      }}
                    >
                      <img
                        src="/images/icons/fast-truck.svg"
                        alt="fast-truck"
                        width={28}
                        height={20}
                      />
                      <span className="fw-normal text-primary">
                        Deliver smarter, faster, and easier.
                      </span>
                    </span>
                  </div>

                  <h2 className="text-secondary">
                    Power Your Logistics with Trezo Shipment
                  </h2>

                  <p>
                    Real-time tracking, seamless coordination, and smarter
                    deliveries — all managed from one easy platform.
                  </p>

                  <div
                    className="d-flex flex-wrap align-items-center banner-btn"
                    style={{
                      gap: "14px",
                    }}
                  >
                    <Link
                      to="/pricing"
                      className="btn border-primary-50 bg-primary-50 border-1 fw-medium fs-14 rounded-2 hover-bg"
                    >
                      Get Started Free
                    </Link>

                    <button
                      type="button"
                      onClick={toggleVideo}
                      className="btn border-primary-50 text-primary-50 fw-medium fs-14 rounded-2 hover-bg"
                    >
                      <span>Request a Demo</span>
                    </button>
                  </div>

                  <div className="border border-light d-inline-block reviews-wrap">
                    <div
                      className="d-flex flex-wrap align-items-center gap"
                      style={{
                        gap: "20px",
                      }}
                    >
                      <div className="flex-shrink-0">
                        <div
                          className="d-flex align-items-center"
                          style={{
                            gap: "5px",
                          }}
                        >
                          <i className="ri-star-fill leading-none fs-32 text-warning lh-1"></i>
                          <span
                            className="fs-32 text-secondary-50 fw-medium lh-1 position-relative"
                            style={{
                              top: "3px",
                              letterSpacing: "-0.5px",
                            }}
                          >
                            4.9
                          </span>
                        </div>
                        <span className="fs-16 d-block mt-2 text-body">
                          15k+ reviews
                        </span>
                      </div>

                      <div className="flex-grow-1">
                        <ul className="p-0 m-0 d-flex align-items-center list-unstyled reviews-user">
                          <li>
                            <img
                              src="/images/users/user3.jpg"
                              className="rounded-circle border border-2 border-white"
                              alt="user"
                              width={56}
                              height={56}
                            />
                          </li>
                          <li>
                            <img
                              src="/images/users/user4.jpg"
                              className="rounded-circle border border-2 border-white"
                              alt="user"
                              width={56}
                              height={56}
                            />
                          </li>
                          <li>
                            <img
                              src="/images/users/user5.jpg"
                              className="rounded-circle border border-2 border-white"
                              alt="user"
                              width={56}
                              height={56}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <img
                    src="/images/plane.png"
                    className="plane position-absolute z-n1 d-none d-lg-inline-block"
                    alt="plane"
                    width={588}
                    height={257}
                  />
                </div>
              </Col>

              <Col lg={7}>
                <div className="banner-img">
                  <img
                    src="/images/banner.png"
                    alt="banner"
                    width={865}
                    height={744}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {/* Video Popup Modal */}
      {showVideo && (
        <div
          className="position-fixed top-0 bg-black bg-opacity-75 d-flex align-items-center justify-content-center p-4 w-100 h-100"
          style={{ zIndex: "9999" }}
        >
          <div
            ref={modalRef}
            className="relative mx-auto"
            style={{ maxWidth: "800px", width: "100%" }}
          >
            <div className="text-end">
              <button
                onClick={toggleVideo}
                className="border-0 bg-transparent text-white fs-17"
                aria-label="Close video modal"
              >
                <i className="ri-close-large-line"></i>
              </button>
            </div>

            <div className="ratio ratio-16x9">
              <iframe
                src="https://www.youtube.com/embed/_ZppXdKk4c8?si=9IpWzVHI_uDyzL4n"
                title="Trezo - Intro"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroBanner;
