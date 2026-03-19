"use client";

import { Container } from "react-bootstrap";

const PageBanner = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <>
      <div className="page-banner-area">
        <Container className="position-relative z-1">
          <div className="banner-content text-center mb-0">
            <h1 className="fs-60 mb-0">{pageTitle}</h1>
          </div>

          <img
            src="/images/landing/shape-5.png"
            className="shape-5"
            alt="shape"
            width={658}
            height={656}
          />
          <img
            src="/images/landing/shape-6.png"
            className="shape-6"
            alt="shape"
            width={685}
            height={685}
          />
        </Container>
      </div>
    </>
  );
};

export default PageBanner;
