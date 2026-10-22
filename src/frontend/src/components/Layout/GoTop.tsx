import { useEffect, useState } from "react";

const GoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Toggle visibility based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={scrollToTop}
        id="backtotop"
        className={`${isVisible ? "opacity-1" : "opacity-0"}`}
      >
        <i className="ri-arrow-up-line"></i>
      </button>
    </>
  );
};

export default GoTop;
