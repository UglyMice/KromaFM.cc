import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SidebarMenu.css";
import { useDarkMode } from "../context/DarkModeContext";


const categories = ["All", "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Black", "Neutral"];

const categoryColors = {
  Red: "#D9210D",
  Orange: "#F2620F",
  Yellow: "#EDFF00",
  Green: "#75F5A1",
  Blue: "#0A5BFF",
  Purple: "#8E44AD",
  Pink: "#E878AE",
  Brown: "#8e5c42",
  Black: "#2C2C2C",
  Neutral: "#7f8c8d",
  All: "#333",
};

function SidebarMenu({ selectedCategory, onSelectCategory }) {
  const { isDarkMode, setIsDarkMode } = useDarkMode();
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 900 : false
  );
  


  const toggleSidebar = () => setIsOpen(!isOpen);

  // Close sidebar on category click (only on mobile)
  const handleCategoryClick = (cat) => {
    onSelectCategory(cat);
    if (isMobile) setIsOpen(false);
  };

  // Detect window resize to check mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <button className="hamburger-btn" onClick={toggleSidebar} aria-label="Toggle menu">
        ☰
      </button>

      <nav className={`sidebar ${isMobile ? (isOpen ? "visible" : "hidden") : ""}`}>
        <h3 style={{ marginBottom: "1rem", display: isMobile ? "none" : "none" }}>Categories</h3>

        {categories.map((cat) => (
          <div
            key={cat}
            style={{
              padding: "0.5rem 0",
              cursor: "pointer",
              color: selectedCategory === cat ? categoryColors[cat] || "#333" : "#777",
              fontWeight: selectedCategory === cat ? "bold" : "normal",
            }}
            onClick={() => handleCategoryClick(cat)}
          >
            {cat}
          </div>
        ))}

        <hr style={{ margin: "1rem 0", borderColor: "#f9f9f9 ", borderWidth: "0.6px" }} />

        <div className="rec-theme">
          <Link
            to="/Recommendations"
            className="recommendations-link"
          >
            Recommendations
          </Link>

          <button onClick={toggleDarkMode} className="darkmode-toggle">
            {isDarkMode ? "Lights On" : "Lights Off"}
          </button>

        </div>

      </nav>
    </>
  );
}

export default SidebarMenu;
