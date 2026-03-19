"use client";

import { Container } from "react-bootstrap";

const Testimonials = () => {
  // Static testimonials data
  const testimonialsData = [
    {
      name: "Sarah Thompson",
      title: "Data Analyst",
      rating: 5,
      feedback:
        "Trezo Dashboard Template has transformed how we manage our data. Its intuitive design and customizable features have streamlined our analytics process, enabling us to make informed decisions faster than ever before.",
      image: "/images/landing/testimonial-1.jpg",
    },
    {
      name: "John Smith",
      title: "Software Engineer",
      rating: 4.5,
      feedback:
        "As a developer, I appreciate the flexibility and robustness of Trezo Dashboard Template. It offers a wide range of features that cater to our diverse needs, and its clean codebase has made customization a breeze. Highly recommended!",
      image: "/images/landing/testimonial-2.jpg",
    },
    {
      name: "Alex Rodriguez",
      title: "Marketing Director",
      rating: 4,
      feedback:
        "Trezo Dashboard Template has been a lifesaver for our organization. It helped us streamline our reporting processes and communicate insights effectively across departments. The time saved has allowed us to focus more on strategic initiatives.",
      image: "/images/landing/testimonial-3.jpg",
    },
    {
      name: "Kevin Brown",
      title: "Jessica Martinez",
      rating: 3.5,
      feedback:
        "I cannot recommend Trezo Dashboard Template enough. It helped us gain a deeper understanding of our business metrics and identify areas for improvement. The responsive support team is an added bonus, always ready to assist whenever we need it.",
      image: "/images/landing/testimonial-4.jpg",
    },
    {
      name: "Olivia Adams",
      title: "Marketing Coordinator",
      rating: 5,
      feedback:
        "Using Trezo Dashboard Template has been a game-changer for our team. The ability to customize widgets to suit our specific needs has allowed us to gain deeper insights into our performance metrics and drive business growth.",
      image: "/images/landing/testimonial-5.jpg",
    },
    {
      name: "Daniel Lee",
      title: "Co-founder, StartupX",
      rating: 3,
      feedback:
        "As a startup, we needed a dashboard solution that was both powerful and cost-effective. Trezo Dashboard Template checked all the boxes for us. It helped us stay agile and competitive in a fast-paced market.",
      image: "/images/landing/testimonial-6.jpg",
    },
  ];

  return (
    <div className="testimonials-area ptb-150" id="testimonials">
      <Container>
        <div className="section-title mw-630">
          <span className="top-title">
            <span>Testimonials</span>
          </span>
          <h2>Inspiring Feedback: What Users Love About Trezo Dashboard</h2>
        </div>

        <div className="masonrow">
          {testimonialsData.map((testimonial, index) => (
            <div className="item" key={index}>
              <div className="single-testimonials">
                <ul className="reating ps-0 list-unstyled">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                      <i
                        className={
                          i < testimonial.rating
                            ? "ri-star-fill"
                            : i < testimonial.rating + 0.5
                            ? "ri-star-half-fill"
                            : "ri-star-line"
                        }
                      ></i>
                    </li>
                  ))}
                </ul>

                <p>{testimonial.feedback}</p>

                <div className="d-flex align-items-center review-info">
                  <div className="review">
                    <img
                      src={testimonial.image}
                      className="rounded-circle wh-50"
                      alt={testimonial.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="ms-3">
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Testimonials;
