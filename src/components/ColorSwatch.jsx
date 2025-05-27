import React from "react";
import { useState } from "react";
import "./ColorSwatch.css";

function ColorSwatch({ name, hex, artist, year, onClick }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Reset "Copied!" after 1s
    };

    return (
      <div className="swatch-conatiner">
        <div
        className="swatch-block"
        style={{ backgroundColor: hex }}
        onClick={handleCopy}>
          <div className="hover-overlay">{copied ? "Copied!" : hex}</div>
        </div>
        <div
        className="swatch-details">
            <p id="swatch-name">{name}</p>
            <p>{hex}</p>
            <p>{artist}, {year}</p>
        </div>
      </div>
    );
  }  

export default ColorSwatch;