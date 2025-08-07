import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as eventApi from "../api/event";
import bgImg from "../assets/1.png";

export default function EventForm() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState("");
  const [form, setForm] = useState({
    event_name: "",
    event_date: "",
    event_time: "",
    cost: "",
    event_image: "",
    location: "",
    contact: "",
    category: "",
    sub_category: "",
    status: "",
    priority: "",
    create_at: new Date().toISOString(),
    social_links: {
      instagram: "",
      facebook: "",
      x: "",
      youtube: "",
      website: ""
    }
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    const file = files[0];
    setForm(prev => ({ ...prev, [name]: file }));
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleSocialChange = (platform, value) => {
    setForm(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [platform]: value }
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key === "social_links") {
          formData.append(key, JSON.stringify(value));
        } else if (value instanceof File) {
          formData.append(key, value, value.name);
        } else {
          formData.append(key, value);
        }
      });
      await eventApi.createEvent(formData);
      navigate("/events");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ef-section">
      <style>{`
        :root {
          --royal-red: #7A133D;
          --heritage-red: #C62039;
          --royal-gold: #D2A857;
          --royal-cream: #FFF9F2;
          --sage: #8BBAA1;
          --teal: #056675;
        }
        .ef-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7), rgba(139,186,161,0.7), rgba(5,102,117,0.7));
          background-size: cover;
          background-position: center;
          padding: 1rem;
          font-family: "Merriweather", "Georgia", serif;
        }
        .ef-card {
          width: 100%;
          max-width: 24rem;
          background: #abdfc461;
          border-radius: 1.25rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 1.75rem 1.25rem;
          display: grid;
          gap: 1rem;
        }
        .ef-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--heritage-red);
        }
        .ef-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--royal-red);
        }
        .ef-field input,
        .ef-field textarea {
          border: 2px solid transparent;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          resize: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ef-field input:focus,
        .ef-field textarea:focus {
          border-color: var(--royal-gold);
          outline: none;
          box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
        }
        .ef-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: 0.875rem; }
        .ef-btn {
          background: var(--heritage-red);
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.6rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
        }
        .ef-btn:hover { background: var(--royal-red); }
        .ef-btn:disabled { opacity: 0.6; cursor: default; }
        @media (min-width: 640px) {
          .ef-card { max-width: 40rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
          .ef-title { grid-column: span 2; font-size: 2.25rem; }
          .ef-full { grid-column: span 2; }
        }
      `}</style>

      <form className="ef-card" onSubmit={handleSubmit} encType="multipart/form-data">
        <h2 className="ef-title">Add Event</h2>

        {[
          ["event_name", "Event Name"],
          ["event_date", "Event Date"],
          ["event_time", "Event Time"],
          ["cost", "Cost"],
          ["location", "Location"],
          ["contact", "Contact"],
          ["category", "Category"],
          ["sub_category", "Sub-category"],
          ["status", "Status"],
          ["priority", "Priority"]
        ].map(([key, label]) => (
          <label key={key} className="ef-field">
            {label}
            <input name={key} value={form[key]} onChange={handleChange} required />
          </label>
        ))}

        {/* Social Links */}
        <div className="ef-field ef-full">
          <label>Social Links</label>
          {["instagram","website"].map((platform) => (
            <input
              key={platform}
              placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
              value={form.social_links[platform]}
              onChange={(e) => handleSocialChange(platform, e.target.value)}
            />
          ))}
        </div>

        {/* Event Image upload */}
        <label className="ef-field ef-full">
          Event Image Upload
          <input type="file" name="event_image" accept="image/*" onChange={handleFileChange} />
          {previewImage && <img src={previewImage} alt="Preview" style={{ maxWidth: "180px", marginTop: "0.5rem", objectFit: "cover" }} />}
        </label>

        {/* Created At */}
        <label className="ef-field ef-full">
          Created At
          <input name="create_at" value={form.create_at} readOnly />
        </label>

        {error && <p className="ef-error ef-full">{error}</p>}

        <button type="submit" disabled={loading} className="ef-btn ef-full">
          {loading ? "Saving…" : "Save"}
        </button>
      </form>
    </section>
  );
}