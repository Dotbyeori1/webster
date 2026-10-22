import { useState, useEffect } from "react";

const RtlMode = () => {
  // RTL/LTR
  const [dirAttribute, setDirAttribute] = useState("ltr");

  useEffect(() => {
    // Check localStorage for saved direction
    const storedDirAttribute = localStorage.getItem("dirAttribute");
    if (storedDirAttribute) {
      setDirAttribute(storedDirAttribute);
      document.documentElement.setAttribute("dir", storedDirAttribute);
    }
  }, []);

  const handleButtonClick = () => {
    const newDirAttribute = dirAttribute === "ltr" ? "rtl" : "ltr";
    setDirAttribute(newDirAttribute);
    localStorage.setItem("dirAttribute", newDirAttribute);
    document.documentElement.setAttribute("dir", newDirAttribute);
  };

  return (
    <>
      <button
        id="switch"
        className="d-flex align-items-center cursor border-0 bg-transparent"
        style={{
          gap: "5px",
          marginTop: "10px",
        }}
        onClick={handleButtonClick}
      >
        <span className="fs-14 text-secondary fw-medium">LTR/RTL:</span>
        <div>
          <input
            type="checkbox"
            id="slider"
            className="position-absolute opacity-0"
          />
          <span className="sliders round"></span>
        </div>
        <span className="switch-slide"></span>
      </button>
    </>
  );
};

export default RtlMode;
