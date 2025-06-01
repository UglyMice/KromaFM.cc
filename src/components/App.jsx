import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout";
import Recommendations from "./Recommendations";
import ColorSwatch from "./ColorSwatch";
import colorData from "../data/colorData";
import "./App.css";
import ShuffleIcon from "../assets/icons/shuffle.svg";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [shuffledColors, setShuffledColors] = useState([]);
  const location = useLocation();


  useEffect(() => {
    const filtered =
      selectedCategory === "All"
        ? [...colorData]
        : colorData.filter((color) =>
            color.category.includes(selectedCategory)
          );
    setShuffledColors(filtered);
  }, [selectedCategory]);

  useEffect(() => {
    if (location.pathname === "/") {
      setSelectedCategory("All");
    }
  }, [location.pathname]);

  const shuffleColors = () => {
    const shuffled = [...shuffledColors].sort(() => Math.random() - 0.5);
    setShuffledColors(shuffled);
  };

  if (location.pathname === "/Recommendations") {
    return <Recommendations />;
  }

  return (
    <Layout selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory}>

        <h1 className="title">KromaFM.cc</h1>
        <p className="sub-title">Explore a collection of over 120 colors inspired by music.</p>

        <div className="button-wrapper">
            <button className="shuffle-button" onClick={shuffleColors}>
              <img src={ShuffleIcon} alt="Shuffle" className="shuffle-icon" />
              Shuffle
            </button>
        </div>

        <div className="swatch-stack">
          {shuffledColors.map((swatch, index) => (
            <div className="swatch" key={index}>
                <ColorSwatch
                  key={index}
                  hex={swatch.hex}
                  name={swatch.name}
                  artist={swatch.artist}
                  year={swatch.year}
                />
            </div>
          ))}
        </div>

            <footer>© 2025 KromaFM.cc™ · v1.0.0</footer>

    </Layout>
            );
}

export default App;
