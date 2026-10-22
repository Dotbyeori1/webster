import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const FeaturesContent = () => {
  const features = [
    {
      id: 1,
      title: "Route Optimization",
      description:
        "Plan faster and cheaper delivery routes with AI-based tools.",
      icon: "/images/icons/optimization.svg",
      iconAlt: "optimization",
      alignment: "left",
    },
    {
      id: 2,
      title: "Order Management",
      description:
        "Organize bulk orders, special requests, and returns effortlessly.",
      icon: "/images/icons/delivery-management.svg",
      iconAlt: "delivery-management",
      alignment: "left",
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description: "Visualize delivery performance and KPIs instantly.",
      icon: "/images/icons/analytics.svg",
      iconAlt: "analytics",
      alignment: "left",
    },
    {
      id: 4,
      title: "Fleet Management",
      description: "Monitor vehicle health and driver performance easily.",
      icon: "/images/icons/product-management.svg",
      iconAlt: "product-management",
      alignment: "right",
    },
    {
      id: 5,
      title: "Delivery Tracking",
      description: "Provide real-time tracking links to customers.",
      icon: "/images/icons/location.svg",
      iconAlt: "location",
      alignment: "right",
    },
    {
      id: 6,
      title: "Automated Notifications",
      description: "Send real-time updates via SMS and email.",
      icon: "/images/icons/notification.svg",
      iconAlt: "notification",
      alignment: "right",
    },
  ];

  const leftFeatures = features.filter(
    (feature) => feature.alignment === "left"
  );
  const rightFeatures = features.filter(
    (feature) => feature.alignment === "right"
  );

  return (
    <>
      <div className="features-area">
        <Container className="cmw-1705">
          <div className="bg-gray-100 ptb-160 position-relative z-1">
            <div
              className="section-title mx-auto text-center"
              style={{
                maxWidth: "455px",
              }}
            >
              <span className="top-title">Trezo Features</span>
              <h2>Tools Designed for Smarter Shipping</h2>
              <p>
                Efficiency, transparency, and control — everything your
                logistics team needs.
              </p>
            </div>

            <div className="position-relative z-1 container cmw-1308">
              <Row>
                <Col lg={6}>
                  <div className="features-left-item">
                    {leftFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="features-single-item d-flex flex-wrap flex-sm-nowrap align-items-center"
                      >
                        <div className="flex-shrink-0">
                          <div className="icon d-flex align-items-center justify-content-center bg-gray-100">
                            <img
                              src={feature.icon}
                              alt={feature.iconAlt}
                              width={50}
                              height={50}
                            />
                          </div>
                        </div>
                        <div className="flex-grow-1">
                          <h3 className="fw-semibold text-secondary">
                            {feature.title}
                          </h3>
                          <p>{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>

                <Col lg={6}>
                  <div className="features-right-item">
                    {rightFeatures.map((feature) => (
                      <div
                        key={feature.id}
                        className="features-single-item d-flex flex-wrap flex-sm-nowrap align-items-center"
                      >
                        <div className="flex-grow-1">
                          <h3 className="fw-semibold text-secondary">
                            {feature.title}
                          </h3>
                          <p>{feature.description}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="icon d-flex align-items-center justify-content-center bg-gray-100">
                            <img
                              src={feature.icon}
                              alt={feature.iconAlt}
                              width={50}
                              height={50}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>

              <img
                src="/images/air-cargo.png"
                className="position-absolute top-50 start-50 translate-middle z-n1 air-cargo"
                alt="air-cargo"
                width={1148}
                height={360}
              />
            </div>

            <img
              src="/images/shapes/shape2.png"
              className="position-absolute top-0 start-0 shape2"
              alt="shape2"
              width={333}
              height={280}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default FeaturesContent;
