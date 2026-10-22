import { useState, useEffect } from "react";
import RtlMode from "./RtlMode";

const SidebarSettings = () => {
  // Light/Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Retrieve the user's preference from local storage
    const storedPreference = localStorage.getItem("theme");
    if (storedPreference === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    // Update the user's preference in local storage
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");

    // Update the class on the <html> element to apply the selected mode
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      if (isDarkMode) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    }
  }, [isDarkMode]);

  return (
    <>
      <div className="theme-switch">
        <button
          className="switch-toggle d-flex align-items-center bg-transparent border-0 p-0 cursor"
          style={{ gap: "10px" }}
          onClick={handleToggle}
        >
          <span className="fs-14 text-secondary fw-medium">Light/Dark:</span>
          <div className="position-relative" style={{ top: "3px" }}>
            <span className="dark lh-1">
              <i className="ri-sun-line fs-20 text-rating-color"></i>
            </span>
            <span className="light lh-1">
              <i className="ri-moon-line fs-20 text-rating-color"></i>
            </span>
          </div>
        </button>

        {/* RtlMode */}
        <RtlMode />
      </div>
    </>
  );
};

export default SidebarSettings;
