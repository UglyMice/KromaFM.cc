import { useState } from "react";
import { Link } from "react-router-dom";
import emailjs from '@emailjs/browser';
import './recommendations.css';


function Recommendations() {
  const [formData, setFormData] = useState({
    hexCode: "",
    song: "",
    reason: "",
  });

  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // NEW: handle form submit with validation and email send
  function handleSubmit(e) {
    e.preventDefault();

    // Basic validation
    if (!formData.hexCode || !formData.song || !formData.reason) {
      alert("Please fill in all fields.");
      return;
    }

    // Hex code validation (6-digit hex with optional #)
    const hexValid = /^#?[0-9A-F]{6}$/i.test(formData.hexCode);
    if (!hexValid) {
      alert("Please enter a valid 6-digit hex color code.");
      return;
    }

    setSending(true);

    emailjs.send(
      "service_5nbl3ny",
      "template_k6xvuwl",
      {
        hexCode: formData.hexCode,
        song: formData.song,
        reason: formData.reason,
      },
      "wi2bhxAx5MxkNIQF7"
    )
    .then(() => {
      setSending(false);
      setSuccess(true);
      setFormData({ hexCode: "", song: "", reason: "" }); // reset form
    })
    .catch(() => {
      setSending(false);
      setSuccess(false);
      alert("Failed to send recommendation. Please try again later.");
    });
  }

  return (
    <div className="recommend-container">

        <Link to="/" className="back">
        ← Back to Swatches
        </Link>

      <h1 className="recommend-heading">Recommend a Color</h1>

      <form className="recommend-form" onSubmit={handleSubmit}>
        <div>
          <label className="block font-semibold">Hex Code</label>
          <input
            type="text"
            name="hexCode"
            value={`${formData.hexCode}`}
            onChange={(e) => {
                let val = e.target.value.toUpperCase();
                
                val = val.replace(/[^#0-9A-F]/g, "");

                const hasHash = val.startsWith("#");
                    val = hasHash
                    ? "#" + val.slice(1).replace(/#/g, "")
                    : val.replace(/#/g, "");

                val = hasHash ? val.slice(0, 7) : val.slice(0, 6);

                const isValidHex = /^#?[0-9A-F]{6}$/i.test(formData.hexCode);

                setFormData({ ...formData, hexCode: val });
            }}
            className="hex-input"
            required
            />
        </div>

        <div>
          <label className="block font-semibold">Song/Album and Artist</label>
          <input
            type="text"
            name="song"
            value={formData.song}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Why this color?</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="recommend-submit" disabled={sending}>
        {sending ? "Sending..." : "Submit"}
        </button>
      </form>

      {success === true && <p className="success-message">Thanks for your recommendation!</p>}
      {success === false && <p className="error-message">Oops! Something went wrong.</p>}

    </div>
  );
}

export default Recommendations;

  