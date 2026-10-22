import Container from "react-bootstrap/Container";

interface PageBannerProps {
  pageTitle: string;
}

const PageBanner = ({ pageTitle }: PageBannerProps) => {
  return (
    <>
      <div className="banner-area position-relative z-1">
        <Container className="container cmw-1705">
          <div
            className="bg-img"
            style={{
              backgroundImage: "url(/images/banner-bg.jpg)",
            }}
          >
            <div className="banner-content position-relative z-1 mw-100 text-center m-0">
              <h2 className="text-secondary fs-40 mb-0">{pageTitle}</h2>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default PageBanner;
