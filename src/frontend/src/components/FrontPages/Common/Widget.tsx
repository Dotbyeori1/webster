"use client";

import { Container, Row, Col } from "react-bootstrap";

const Widget = () => {
  // Static data for the widget features
  const widgetFeatures = [
    {
      icon: "done_outline",
      title: "Tailored Display",
      description:
        "Easily arrange, resize, and configure widgets to showcase the data most relevant to your workflow.",
    },
    {
      icon: "done_outline",
      title: "Personalized Insights",
      description:
        "Customize widget content and visualization options to match your specific preferences and priorities.",
    },
    {
      icon: "done_outline",
      title: "Flexibility and Versatility",
      description:
        "Adapt widgets to evolving business needs by adjusting layouts, styles, and data sources with ease.",
    },
    {
      icon: "done_outline",
      title: "Seamless Integration",
      description:
        "Integrate widgets seamlessly with other dashboard components and external systems for a cohesive user experience.",
    },
  ];

  return (
    <div className="tailor-area position-relative z-1">
      <Container>
        <Row className="align-items-center">
          <Col lg={6}>
            <div className="tailor-img">
              <img
                src="/images/landing/tailor-img.png"
                alt="tailor"
                width={646}
                height={592}
              />
            </div>
          </Col>

          <Col lg={6}>
            <div className="tailor-content">
              <h2>
                Tailor Your Dashboard: Unleash the Power of Customizable Widgets
              </h2>

              <ul className="ps-0 mb-0 list-unstyled">
                {widgetFeatures.map((feature, index) => (
                  <li key={index}>
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i
                          className={`material-symbols-outlined text-primary fs-22`}
                        >
                          {feature.icon}
                        </i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Shape Images */}
      <img
        src="/images/landing/shape-1.png"
        className="shape shape-1"
        alt="shape"
        width={1130}
        height={1130}
      />
      <img
        src="/images/landing/shape-2.png"
        className="shape shape-2"
        alt="shape"
        width={947}
        height={953}
      />
    </div>
  );
};

export default Widget;
