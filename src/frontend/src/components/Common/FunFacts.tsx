import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const funFactsData = [
  {
    value: "75K",
    suffix: "+",
    suffixClass: "text-primary-100",
    description: "Shipments Delivered",
  },
  {
    value: "9K",
    suffix: "+",
    suffixClass: "text-primary-100",
    description: "Happy Clients",
  },
  {
    value: "99.9",
    suffix: "%",
    suffixClass: "text-primary-100",
    description: "On-Time Rate",
  },
  {
    value: "24/",
    suffix: "7",
    suffixClass: "text-primary-100",
    description: "Support Availability",
  },
];

const FunFacts = () => {
  return (
    <>
      <div className="funfacts-area pb-160">
        <Container className="cmw-1310">
          <Row className="justify-content-center g-4">
            {funFactsData.map((fact, index) => (
              <Col key={index} xs={6} sm={6} md={3}>
                <div className="funfacts-single-item position-relative z-1">
                  <h2>
                    {fact.value}
                    <span className={fact.suffixClass}>{fact.suffix}</span>
                  </h2>
                  <p>{fact.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FunFacts;
