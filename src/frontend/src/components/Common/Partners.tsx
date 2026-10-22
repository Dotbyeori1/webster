import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Container from "react-bootstrap/Container";

const Partners = () => {
  // Dynamic data for partners logos
  const partners = [
    { id: 1, logo: "/images/partners/partner1.svg", alt: "Partner 1" },
    { id: 2, logo: "/images/partners/partner2.svg", alt: "Partner 2" },
    { id: 3, logo: "/images/partners/partner3.svg", alt: "Partner 3" },
    { id: 4, logo: "/images/partners/partner4.svg", alt: "Partner 4" },
    { id: 5, logo: "/images/partners/partner5.svg", alt: "Partner 5" },
    { id: 6, logo: "/images/partners/partner6.svg", alt: "Partner 6" },
  ];

  // Swiper configuration
  const swiperConfig = {
    spaceBetween: 30,
    autoplay: {
      delay: 5000,
      disableOnHover: true,
    },
    breakpoints: {
      0: { slidesPerView: 2 },
      400: { slidesPerView: 2 },
      576: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      992: { slidesPerView: 4 },
      1200: { slidesPerView: 6 },
    },
  };

  return (
    <>
      <div className="partners-area pb-160">
        <Container className="cmw-1308">
          <span className="partners-title fs-16 fw-medium d-block text-center">
            <span>Backed by Teams Across Industries</span>
          </span>

          <Swiper
            {...swiperConfig}
            modules={[Autoplay]}
            className="partners-slide"
          >
            {[...partners, ...partners].map((partner, index) => (
              <SwiperSlide
                key={`${partner.id}-${index}`}
                style={{ textAlign: "center" }}
              >
                <img
                  src={partner.logo}
                  alt={partner.alt}
                  width={120}
                  height={50}
                  style={{
                    width: "auto",
                    height: "auto",
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </div>
    </>
  );
};

export default Partners;
