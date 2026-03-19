"use client";

import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const OurTeamSlider = () => {
  const teamMembers = [
    {
      name: "Michael Johnson",
      position: "CEO",
      image: "/images/landing/team-1.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        twitter: "https://www.twitter.com/",
        linkedin: "https://www.linkedin.com/",
      },
    },
    {
      name: "Emily Davis",
      position: "Project Manager",
      image: "/images/landing/team-2.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        twitter: "https://www.twitter.com/",
        linkedin: "https://www.linkedin.com/",
      },
    },
    {
      name: "Daniel Lee",
      position: "Sales Team Lead",
      image: "/images/landing/team-3.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        twitter: "https://www.twitter.com/",
        linkedin: "https://www.linkedin.com/",
      },
    },
    {
      name: "Emily Davis",
      position: "Project Manager",
      image: "/images/landing/team-2.jpg",
      socialLinks: {
        facebook: "https://www.facebook.com/",
        twitter: "https://www.twitter.com/",
        linkedin: "https://www.linkedin.com/",
      },
    },
  ];

  return (
    <div className="our-team-area position-relative z-2">
      <Container>
        <div className="mb-4 mb-lg-5">
          <div className="section-title ms-0 text-start mw-630 mb-0">
            <span className="top-title">
              <span>Our Team</span>
            </span>
            <h2>
              Introducing Our Exceptional Team. Meet the Minds Driving Our
              Success
            </h2>
          </div>
        </div>

        <Swiper
          spaceBetween={25}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            922: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="team-slide"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index}>
              <div className="our-team-single-item">
                <div className="team-img">
                  <img
                    src={member.image}
                    alt={member.name}
                    width={600}
                    height={600}
                  />
                </div>
                <div className="team-content d-flex justify-content-between align-items-center">
                  <div>
                    <h3>{member.name}</h3>
                    <span>{member.position}</span>
                  </div>

                  <ul className="ps-0 mb-0 list-unstyled d-flex flex-wrap gap-3">
                    <li>
                      <a
                        href={member.socialLinks.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none fs-20 text-primary"
                      >
                        <i className="ri-facebook-fill"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.socialLinks.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none fs-20 text-primary"
                      >
                        <i className="ri-twitter-x-line"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href={member.socialLinks.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="text-decoration-none fs-20 text-primary"
                      >
                        <i className="ri-linkedin-fill"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>

      {/* Shape Images */}
      <img
        src="/images/landing/shape-1.png"
        className="shape shape-3"
        alt="shape"
        width={1130}
        height={1130}
      />
      <img
        src="/images/landing/shape-2.png"
        className="shape shape-4"
        alt="shape"
        width={947}
        height={953}
      />
    </div>
  );
};

export default OurTeamSlider;
