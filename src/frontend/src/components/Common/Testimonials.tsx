import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

const Testimonials = () => {
  return (
    <>
      <div className="testimonials-area">
        <Container className="cmw-1705">
          <div className="bg-gray-100 ptb-160 position-relative z-1">
            <div
              className="section-title mx-auto text-center"
              style={{
                maxWidth: "455px",
              }}
            >
              <span className="top-title">Customer Testimonials</span>
              <h2>Trusted by Logistics Leaders</h2>
              <p>
                Hear from companies who streamlined their delivery operations
                with Trezo.
              </p>
            </div>

            <Container
              className="position-relative z-1"
              style={{
                maxWidth: "1090px",
              }}
            >
              <div className="testimonials-single-item">
                <Swiper
                  navigation={true}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                  }}
                  modules={[Autoplay, Navigation]}
                  className="testimonials-slide"
                >
                  <SwiperSlide>
                    <Row className="g-4">
                      <Col lg={5}>
                        <div className="testimonials-img text-center">
                          <img
                            src="/images/working-girl.jpg"
                            alt="working-girl"
                            width={455}
                            height={612}
                          />
                        </div>
                      </Col>
                      <Col lg={7}>
                        <div className="testimonials-content">
                          <img
                            src="/images/icons/quote.svg"
                            alt="quote"
                            width={45}
                            height={45}
                          />
                          <p>
                            {" "}
                            The live dashboard and route optimization features
                            have reduced our delivery delays by 40%. It&apos;s a
                            game-changer for our logistics team.
                          </p>

                          <div
                            className="d-flex align-items-center testimonials-info"
                            style={{
                              gap: "18px",
                            }}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src="/images/users/user1.jpg"
                                className="rounded-circle object-fit-cover mb-0"
                                alt="user1"
                                width={42}
                                height={42}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <h4>Olivia Chen</h4>
                              <span>
                                Logistics Manager, FastFleet Logistics
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </SwiperSlide>

                  <SwiperSlide>
                    <Row className="g-4">
                      <Col lg={5}>
                        <div className="testimonials-img text-center">
                          <img
                            src="/images/girl-with-wacky-tacky.jpg"
                            alt="girl-with-wacky-tacky"
                            width={455}
                            height={612}
                          />
                        </div>
                      </Col>
                      <Col lg={7}>
                        <div className="testimonials-content">
                          <img
                            src="/images/icons/quote.svg"
                            alt="quote"
                            width={45}
                            height={45}
                          />
                          <p>
                            {" "}
                            The live dashboard and route optimization features
                            have reduced our delivery delays by 40%. It&apos;s a
                            game-changer for our logistics team.
                          </p>

                          <div
                            className="d-flex align-items-center testimonials-info"
                            style={{
                              gap: "18px",
                            }}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src="/images/users/user2.jpg"
                                className="rounded-circle object-fit-cover mb-0"
                                alt="user2"
                                width={42}
                                height={42}
                              />
                            </div>
                            <div className="flex-grow-1">
                              <h4>Olivia Chen</h4>
                              <span>
                                Logistics Manager, FastFleet Logistics
                              </span>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </SwiperSlide>
                </Swiper>
              </div>

              <div className="working-man-slide-wrap">
                <img
                  src="/images/working-man.jpg"
                  className="working-man d-none d-xl-inline-block"
                  alt="working-man"
                  width={386}
                  height={520}
                />
              </div>
            </Container>

            <img
              src="/images/shapes/shape1.png"
              className="position-absolute top-0 end-0 shape1 z-n1 d-none d-lg-inline-block"
              alt="shape1"
              width={336}
              height={385}
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default Testimonials;
