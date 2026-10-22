import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const PricingPlans = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Starter Plan",
      isPopular: false,
      description: "For growing logistics teams just getting started.",
      price: "$10",
      pricePeriod: "/month",
      features: [
        "Basic tracking",
        "1 Fleet Integration",
        "SMS Alerts (limited)",
        "Email Support",
      ],
      ctaText: "Get Started Free",
      ctaLink: "#",
    },
    {
      id: 2,
      name: "Pro Plan",
      isPopular: true,
      description:
        "Ideal for scaling operations with advanced tracking and analytics.",
      price: "$39",
      pricePeriod: "/month",
      features: [
        "Unlimited orders",
        "Advanced fleet tracking",
        "Branded customer portals",
        "Priority Support",
      ],
      ctaText: "Get Started Free",
      ctaLink: "#",
    },
  ];

  return (
    <>
      <div className="pricing-plans-area pb-160">
        <Container className="cmw-1308">
          <Row className="align-items-center g-4">
            <Col md={12} xl={4}>
              <div className="pricing-plans-content">
                <span className="top-title">Pricing Plans</span>
                <h2>Flexible Pricing for Every Shipment Size</h2>
                <p className="dec">
                  From first mile to last, Trezo keeps your operations moving
                  smoothly.
                </p>
              </div>
            </Col>

            {pricingPlans.map((plan) => (
              <Col md={6} xl={4} key={plan.id}>
                <div className="pricing-single-item bg-gray-100">
                  <div className="position-relative z-1 title-wrap d-flex justify-content-between align-items-center">
                    <span className="fs-18 fw-semibold d-block title text-secondary">
                      {plan.name}
                    </span>
                    {plan.isPopular && (
                      <span className="popular">Most Popular</span>
                    )}
                  </div>

                  <div className="pricing-content">
                    <p>{plan.description}</p>
                    <h2 className="border-bottom boredr-border-color">
                      {plan.price}
                      <sub>{plan.pricePeriod}</sub>
                    </h2>

                    <ul className="p-0 list-unstyled">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="d-flex align-items-center"
                          style={{ gap: "15px" }}
                        >
                          <i
                            className="ri-checkbox-circle-fill text-primary-200 lh-1"
                            style={{
                              width: "20px",
                              height: "20px",
                              fontSize: "25px",
                            }}
                          ></i>
                          <span className="fs-16">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to={plan.ctaLink}
                      rel="noopener noreferrer"
                      className="btn fw-medium fs-14 rounded-2 bg-primary-50 text-white w-100"
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default PricingPlans;
