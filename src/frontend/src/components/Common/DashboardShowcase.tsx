import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Array of slide data
const slideData = [
  {
    id: 1,
    title: "Monitor Fleet Health and Deliveries",
    features: [
      {
        id: 1,
        title: "Live Vehicle Tracking",
        description:
          "View real-time GPS locations of every vehicle in your fleet.",
      },
      {
        id: 2,
        title: "Maintenance Alerts",
        description:
          "Get automated notifications for oil changes, tire rotations, and inspection schedules.",
      },
      {
        id: 3,
        title: "Engine Diagnostics",
        description:
          "Monitor engine health, fuel levels, and mileage remotely.",
      },
      {
        id: 4,
        title: "Shipment Status Updates",
        description:
          "Know when parcels are in transit, delayed, or successfully delivered.",
      },
      {
        id: 5,
        title: "Connectivity Monitoring",
        description: "Detect offline or unresponsive fleet units instantly.",
      },
      {
        id: 6,
        title: "Route History Logs",
        description:
          "Access historical trip data for audit and performance reviews.",
      },
    ],
    mainImage: {
      src: "/images/dashboard-showcase.jpg",
      alt: "dashboard-showcase",
    },
    secondaryImage: {
      src: "/images/live-shipment-status.jpg",
      alt: "dashboard-showcase",
    },
  },
  {
    id: 2,
    title: "Track Delays and Bottlenecks Live",
    features: [
      {
        id: 1,
        title: "Real-Time Delay Alerts",
        description:
          "View real-time GPS locations of every vehicle in your fleet.",
      },
      {
        id: 2,
        title: "Live Vehicle Tracking",
        description:
          "Get automated notifications for oil changes, tire rotations, and inspection schedules.",
      },
      {
        id: 3,
        title: "Dynamic Route Analysis",
        description:
          "Monitor engine health, fuel levels, and mileage remotely.",
      },
      {
        id: 4,
        title: "Bottleneck Heatmaps",
        description:
          "Know when parcels are in transit, delayed, or successfully delivered.",
      },
      {
        id: 5,
        title: "SLA Breach Notifications",
        description: "Detect offline or unresponsive fleet units instantly.",
      },
      {
        id: 6,
        title: "Delay Insights Dashboard",
        description:
          "Access historical trip data for audit and performance reviews.",
      },
    ],
    mainImage: {
      src: "/images/dashboard-showcase2.jpg",
      alt: "dashboard-showcase",
    },
    secondaryImage: {
      src: "/images/average-delivery-time.jpg",
      alt: "dashboard-showcase",
    },
  },
];

const DashboardShowcase = () => {
  return (
    <>
      <div className="dashboard-showcase-area ptb-160">
        <Container className="cmw-1308">
          <div className="d-flex justify-content-between align-items-center gap-3 mb-60">
            <div className="section-title mb-0" style={{ maxWidth: "630px" }}>
              <span className="top-title">Dashboard Showcase</span>
              <h2>Real-Time Shipment Intelligence</h2>
              <p>
                Stay updated with every move your fleet makes — all on a single,
                dynamic dashboard.
              </p>
            </div>
          </div>

          <Swiper
            navigation={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
            }}
            modules={[Autoplay, Navigation]}
            className="dashboard-showcase-slide"
          >
            {slideData.map((slide) => (
              <SwiperSlide key={slide.id}>
                <Row className="align-content-center g-4">
                  <Col lg={7}>
                    <div className="dashboard-showcase-img position-relative">
                      <img
                        src={slide.mainImage.src}
                        className="dashboard-showcase"
                        alt={slide.mainImage.alt}
                        width={900}
                        height={1220}
                      />
                      <img
                        src={slide.secondaryImage.src}
                        alt={slide.secondaryImage.alt}
                        width={714}
                        height={380}
                        className="live-shipment-status style-two"
                      />
                    </div>
                  </Col>

                  <Col lg={5}>
                    <div className="dashboard-showcase-content">
                      <h2>{slide.title}</h2>

                      <ul className="p-0 m-0 list-unstyled dashboard-showcase-list">
                        {slide.features.map((feature, index) => (
                          <li
                            key={index}
                            className="d-flex"
                            style={{ gap: "18px" }}
                          >
                            <div className="flex-shrink-0">
                              <i className="ri-check-double-line lh-1"></i>
                            </div>
                            <div className="flex-grow-1">
                              <h3>{feature.title}</h3>
                              <p>{feature.description}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Col>
                </Row>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </>
  );
};

export default DashboardShowcase;
