import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as eventApi from "../api/event";
import bgImg from "../assets/1.png";

export default function EventEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await eventApi.getEvent(id);
        setForm({
          ...data,
          social_links: typeof data.social_links === "object" && data.social_links !== null
            ? data.social_links
            : {}
        });
      } catch {
        setError("Unable to load event");
      }
    })();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        ...form,
        social_links: form.social_links || {}
      };
      await eventApi.updateEvent(id, payload);
      navigate("/events");
    } catch (err) {
      setError(err?.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );
  }

  return (
    <section
      className="ef-section"
      style={{
        backgroundImage: `url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
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
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: none;
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

      <form className="ef-card" onSubmit={handleSubmit}>
        <h2 className="ef-title">Edit Event</h2>

        {/* Standard Fields */}
        {[
          ["event_name", "Event Name"],
          ["event_date", "Event Date"],
          ["event_time", "Event Time"],
          ["cost", "Cost"],
          ["event_image", "Event Image URL"],
          ["location", "Location"],
          ["contact", "Contact"],
          ["category", "Category"],
          ["sub_category", "Sub-category"],
          ["status", "Status"],
          ["priority", "Priority"]
        ].map(([key, label]) => (
          <label key={key} className="ef-field">
            {label}
            <input
              name={key}
              value={form[key] || ""}
              onChange={handleChange}
              required={key !== "event_image"}
            />
          </label>
        ))}

        {/* Social Links Section */}
        <div className="ef-field ef-full">
          <label style={{ fontWeight: "600", color: "var(--royal-red)" }}>
            Social Links
          </label>
          {["instagram", "website"].map((platform) => (
            <input
              key={platform}
              name={platform}
              placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
              value={form.social_links?.[platform] || ""}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  social_links: {
                    ...prev.social_links,
                    [platform]: e.target.value
                  }
                }))
              }
              style={{
                marginBottom: "0.5rem",
                padding: "0.5rem 0.75rem",
                borderRadius: "0.5rem",
                border: "2px solid transparent",
                fontSize: "0.9rem"
              }}
            />
          ))}
        </div>

        {error && <p className="ef-error ef-full">{error}</p>}

        <button className="ef-btn ef-full" disabled={loading}>
          {loading ? "Saving…" : "Update"}
        </button>
      </form>
    </section>
  );
}