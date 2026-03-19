"use client";

import { Container, Row, Col } from "react-bootstrap";

const features = [
  {
    icon: "stacks",
    bgClass: "bg-primary bg-opacity-25",
    textClass: "text-primary",
    title: "Real-Time Updates",
    description:
      "Provide real-time updates and notifications to keep users informed about important events, changes, or updates within the system.",
  },
  {
    icon: "source",
    bgClass: "bg-primary-div bg-opacity-25",
    textClass: "text-primary-div",
    title: "Quality Code",
    description:
      "These features include adherence to coding standards, robust error handling mechanisms, efficient algorithms, scalability, maintainability, and readability.",
  },
  {
    icon: "support_agent",
    bgClass: "bg-danger bg-opacity-25",
    textClass: "text-danger",
    title: "24/7 Customer Support",
    description:
      "Our 24/7 customer support is dedicated to providing round-the-clock assistance, ensuring that help is always available whenever our customers need it.",
  },
];

const KeyFeatures = () => {
  return (
    <>
      <div className="key-features-area pt-150 pb-125 position-relative z-2">
        <Container>
          <div className="section-title">
            <span className="top-title">
              <span>Key Features</span>
            </span>
            <h2>
              Discover What Sets Us Apart: Highlighted Dashboard Functions
            </h2>
          </div>

          <Row className="justify-content-center">
            {features.map((feature, index) => (
              <Col md={6} lg={4} key={index}>
                <div className="key-features-single-item">
                  <i
                    className={`material-symbols-outlined wh-87 ${feature.bgClass} d-inline-block ${feature.textClass}`}
                  >
                    {feature.icon}
                  </i>

                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default KeyFeatures;
