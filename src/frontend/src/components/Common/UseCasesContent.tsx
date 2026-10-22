import Container from "react-bootstrap/Container";

const UseCasesContent = () => {
  const useCases = [
    {
      id: 1,
      title: "Courier Services",
      icon: "/images/icons/truck.svg",
      iconAlt: "truck",
    },
    {
      id: 2,
      title: "E-commerce Businesses",
      icon: "/images/icons/cart.svg",
      iconAlt: "cart",
    },
    {
      id: 3,
      title: "Warehousing Companies",
      icon: "/images/icons/building.svg",
      iconAlt: "building",
    },
    {
      id: 4,
      title: "Retailers with Delivery",
      icon: "/images/icons/store.svg",
      iconAlt: "store",
    },
    {
      id: 5,
      title: "Food & Beverage Logistics",
      icon: "/images/icons/food.svg",
      iconAlt: "food",
    },
    {
      id: 6,
      title: "Healthcare Delivery Services",
      icon: "/images/icons/ambulance.svg",
      iconAlt: "ambulance",
    },
  ];

  return (
    <>
      <div className="trezo-users-area ptb-160 position-relative">
        <Container className="cmw-1308">
          <div
            className="section-title mx-auto text-center"
            style={{
              maxWidth: "455px",
            }}
          >
            <span className="top-title">Use Cases</span>
            <h2>Who Trezo Shipment Helps</h2>
            <p>
              From small courier teams to enterprise freight networks — discover
              how Trezo adapts to your shipping workflow.
            </p>
          </div>

          <div
            className="d-flex justify-content-center flex-wrap align-items-center mx-auto trezo-users-wrap"
            style={{
              gap: "17px",
              maxWidth: "1120px",
            }}
          >
            {useCases.map((useCase) => (
              <div
                key={useCase.id}
                className="d-flex align-items-center bg-gray-100 rounded-pill border border-gray-100 trezo-users-single-item"
              >
                <div className="icon bg-white rounded-circle d-flex justify-content-center align-items-center">
                  <img
                    src={useCase.icon}
                    alt={useCase.iconAlt}
                    width={34}
                    height={34}
                  />
                </div>
                <span className="fs-18 text-secondary fw-semibold">
                  {useCase.title}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <img
          src="/images/map.png"
          className="position-absolute top-50 start-50 translate-middle z-n1 map"
          alt="map"
          width={1125}
          height={780}
        />
      </div>
    </>
  );
};

export default UseCasesContent;
