import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";

// Navigation data defined outside the component
const navigationItems = [
  { name: "Home", path: "/" },
  { name: "Features", path: "/features/" },
  {
    name: "Dashboard",
    path: "https://trezo-twcss.envytheme.com/",
    external: true,
  },
  { name: "Use Cases", path: "/use-cases/" },
  { name: "Pricing", path: "/pricing/" },
];

const Navbar = () => {
  const location = useLocation(); // Use `useLocation` to get the current path
  const pathname = location.pathname;

  const [isToggleNavbar, setToggleNavbar] = useState(true);
  const handleToggleNavbar = () => {
    setToggleNavbar(!isToggleNavbar);
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // Trigger when pathname changes

  // Sticky navbar
  useEffect(() => {
    const elementId = document.getElementById("navbar");
    const handleScroll = () => {
      if (window.scrollY > 100) {
        elementId?.classList.add("sticky");
      } else {
        elementId?.classList.remove("sticky");
      }
    };

    document.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []); // Added empty dependency array to avoid repeated effect calls

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-white fixed-top mx-auto"
        id="navbar"
      >
        <Container className="cmw-1644">
          <Link className="navbar-brand" to="/">
            <img
              src="/images/logo.svg"
              className="black-logo"
              alt="logo"
              width={109}
              height={29}
            />
            <img
              src="/images/white-logo.svg"
              className="white-logo d-none"
              alt="logo"
              width={109}
              height={29}
            />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggleNavbar}
          >
            <span className="border-bottom border-3 border-secondary top"></span>
            <span className="border-bottom border-3 border-secondary middle my-5px"></span>
            <span className="border-bottom border-3 border-secondary bottom"></span>
          </button>

          <div
            id="navbarSupportedContent"
            className={`collapse navbar-collapse ${
              isToggleNavbar ? "" : "show"
            }`}
          >
            <ul className="navbar-nav m-auto">
              {navigationItems.map((item) => (
                <li className="nav-item" key={item.path}>
                  {item.external ? (
                    <a
                      className={`nav-link fs-14 fw-medium hover p-0 ${
                        pathname === item.path ? "active" : ""
                      }`}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      className={`nav-link fs-14 fw-medium hover p-0 ${
                        pathname === item.path ? "active" : ""
                      }`}
                      to={item.path}
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>

            <div
              className="others-option d-flex align-items-center"
              style={{
                gap: "30px",
              }}
            >
              <Link
                to="#"
                className="fw-medium fs-14 text-primary text-decoration-none text-btn"
              >
                Login
              </Link>
              <Link
                to="#"
                className="btn fw-medium fs-14 border-primary bg-primary rounded-2"
              >
                Register
              </Link>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
