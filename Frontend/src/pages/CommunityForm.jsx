// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as commApi from "../api/community";
// import bgImg from "../assets/1.png";

// export default function CommunityForm() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: "",
//     category: "",
//     contact: "",
//     address: "",
//     email: "",
//     logo: null,
//     image: null,
//     description: "",
//     sub_category: "",
//     in_charge: "",
//     create_at: new Date().toISOString(),
//     social_links: {
//       instagram: "",
//       facebook: "",
//       x: "",
//       youtube: ""
//     }
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = e => {
//     const { name, files } = e.target;
//     setForm(prev => ({ ...prev, [name]: files[0] }));
//   };

//   const handleSocialChange = (platform, value) => {
//     setForm(prev => ({
//       ...prev,
//       social_links: {
//         ...prev.social_links,
//         [platform]: value
//       }
//     }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const formData = new FormData();
//       Object.entries(form).forEach(([key, value]) => {
//         if (key === "social_links") {
//           formData.append(key, JSON.stringify(value));
//         } else if (value instanceof File) {
//           formData.append(key, value, value.name);
//         } else {
//           formData.append(key, value);
//         }
//       });

//       await commApi.createCommunity(formData); // API should accept multipart/form-data
//       navigate("/communities");
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to create community");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="cf-section">
//       <style>{`
//         :root {
//           --royal-red: #7A133D;
//           --heritage-red: #C62039;
//           --royal-gold: #D2A857;
//           --royal-cream: #FFF9F2;
//           --sage: #8BBAA1;
//           --teal: #056675;
//         }
//         .cf-section {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7), rgba(139,186,161,0.7), rgba(5,102,117,0.7));
//           background-size: cover;
//           background-position: center;
          
//           padding: 1rem;
//           font-family: "Merriweather", "Georgia", serif;
//         }
//         .cf-card {
//           width: 100%;
//           max-width: 24rem;
//           background: #abdfc461;
//           border-radius: 1.25rem;
//           box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//           padding: 1.75rem 1.25rem;
//           display: grid;
//           gap: 1rem;
//         }
//         .cf-title {
//           text-align: center;
//           font-size: 1.75rem;
//           font-weight: 900;
//           color: var(--heritage-red);
//         }
//         .cf-field {
//           display: flex;
//           flex-direction: column;
//           gap: 0.25rem;
//           font-size: 0.875rem;
//           font-weight: 600;
//           color: var(--royal-red);
//         }
//         .cf-field input,
//         .cf-field textarea {
//           border: 2px solid transparent;
//           border-radius: 0.5rem;
//           padding: 0.5rem 0.75rem;
//           font-size: 0.9rem;
//           resize: none;
//           transition: border-color 0.2s, box-shadow 0.2s;
//         }
//         .cf-field input:focus,
//         .cf-field textarea:focus {
//           border-color: var(--royal-gold);
//           outline: none;
//           box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
//         }
//         .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: 0.875rem; }
//         .cf-btn {
//           background: var(--heritage-red);
//           color: #fff;
//           border: none;
//           border-radius: 0.5rem;
//           padding: 0.6rem;
//           font-weight: 700;
//           cursor: pointer;
//           transition: background 0.15s;
//         }
//         .cf-btn:hover { background: var(--royal-red); }
//         .cf-btn:disabled { opacity: 0.6; cursor: default; }

//         @media (min-width: 640px) {
//           .cf-card { max-width: 40rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
//           .cf-title { grid-column: span 2; font-size: 2.25rem; }
//           .cf-full { grid-column: span 2; }
//         }
//       `}</style>

//       <form className="cf-card" onSubmit={handleSubmit} encType="multipart/form-data">
//         <h2 className="cf-title">Add Community</h2>

//         {[
//           ["name", "Name"],
//           ["category", "Category"],
//           ["contact", "Contact"],
//           ["address", "Address"],
//           ["email", "Email"],
//           ["description", "Description"],
//           ["sub_category", "Sub-category"],
//           ["in_charge", "In-charge"]
//         ].map(([key, label]) => (
//           <label key={key} className={`cf-field ${key === "description" ? "cf-full" : ""}`}>
//             {label}
//             {key === "description" ? (
//               <textarea name={key} value={form[key]} onChange={handleChange} rows={3} required />
//             ) : (
//               <input name={key} value={form[key]} onChange={handleChange} required />
//             )}
//           </label>
//         ))}

//         {/* Social Links */}
//         <div className="cf-field cf-full">
//           <label>Social Links</label>
//           {["instagram", "facebook", "x", "youtube","Website"].map((platform) => (
//             <input
//               key={platform}
//               placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
//               value={form.social_links[platform]}
//               onChange={(e) => handleSocialChange(platform, e.target.value)}
//             />
//           ))}
//         </div>

//         {/* Logo upload */}
//         <label className="cf-field cf-full">
//           Logo Upload
//           <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
//         </label>

//         {/* Image upload */}
//         <label className="cf-field cf-full">
//           Banner Image Upload
//           <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
//         </label>

//         {/* Created At */}
//         <label className="cf-field cf-full">
//           Created At
//           <input name="create_at" value={form.create_at} readOnly />
//         </label>

//         {error && <p className="cf-error cf-full">{error}</p>}

//         <button type="submit" disabled={loading} className="cf-btn cf-full">
//           {loading ? "Saving…" : "Save"}
//         </button>
//       </form>
//     </section>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as commApi from "../api/community";
import bgImg from "../assets/1.png";

export default function CommunityForm() {
  const navigate = useNavigate();

  // thumbnail previews
  const [previewLogo,  setPreviewLogo]  = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // main form data (logo / image hold either a URL string OR a File)
  const [form, setForm] = useState({
    name: "",
    category: "",
    contact: "",
    address: "",
    email: "",
    logo: "",              // string or File
    image: "",             // string or File
    description: "",
    sub_category: "",
    in_charge: "",
    create_at: new Date().toISOString(),
    social_links: {
      instagram: "",
      facebook: "",
      x: "",
      youtube: "",
      Website: ""
    }
  });

  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  /* ─────────────────── handlers ─────────────────── */
  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // update social_links
  const handleSocialChange = (platform, value) =>
    setForm(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [platform]: value }
    }));

  // file picker ⟶ preview + store File
  const handleFileChange = e => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (name === "logo")  setPreviewLogo(url);
    if (name === "image") setPreviewImage(url);

    setForm(prev => ({ ...prev, [name]: file }));
  };

  /* ───────────── submit (dual-mode) ─────────────── */
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // decide whether we need FormData (if files present)
    const needMultipart =
      form.logo instanceof File || form.image instanceof File;

    try {
      let payload;
      if (needMultipart) {
        payload = new FormData();
        Object.entries(form).forEach(([key, val]) => {
          if (key === "social_links") {
            payload.append(key, JSON.stringify(val));
          } else if (val instanceof File) {
            payload.append(key, val, val.name);
          } else {
            payload.append(key, val);
          }
        });
      } else {
        payload = {
          ...form,
          // stringify so backend still gets a string
          social_links: JSON.stringify(form.social_links)
        };
      }

      await commApi.createCommunity(payload);
      navigate("/communities");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  /* ─────────────────── UI ─────────────────── */
  return (
    <section className="cf-section">
         <style>{`
        :root {
          --royal-red: #7A133D;
          --heritage-red: #C62039;
          --royal-gold: #D2A857;
          --royal-cream: #FFF9F2;
          --sage: #8BBAA1;
          --teal: #056675;
        }
        .cf-section {
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
        .cf-card {
          width: 100%;
          max-width: 24rem;
          background: #abdfc461;
          border-radius: 1.25rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 1.75rem 1.25rem;
          display: grid;
          gap: 1rem;
        }
        .cf-title {
          text-align: center;
          font-size: 1.75rem;
          font-weight: 900;
          color: var(--heritage-red);
        }
        .cf-field {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--royal-red);
        }
        .cf-field input,
        .cf-field textarea {
          border: 2px solid transparent;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
          resize: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .cf-field input:focus,
        .cf-field textarea:focus {
          border-color: var(--royal-gold);
          outline: none;
          box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
        }
        .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: 0.875rem; }
        .cf-btn {
          background: var(--heritage-red);
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          padding: 0.6rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s;
        }
        .cf-btn:hover { background: var(--royal-red); }
        .cf-btn:disabled { opacity: 0.6; cursor: default; }

        @media (min-width: 640px) {
          .cf-card { max-width: 40rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
          .cf-title { grid-column: span 2; font-size: 2.25rem; }
          .cf-full { grid-column: span 2; }
        }
      `}</style>

      <form className="cf-card" onSubmit={handleSubmit}>
        <h2 className="cf-title">Add Community</h2>

        {/* Standard text / textarea fields */}
        {[
          ["name", "Name"],
          ["category", "Category"],
          ["contact", "Contact"],
          ["address", "Address"],
          ["email", "Email"],
          ["description", "Description"],
          ["sub_category", "Sub-category"],
          ["in_charge", "In-charge"]
        ].map(([key, label]) => (
          <label key={key} className={`cf-field ${key === "description" ? "cf-full" : ""}`}>
            {label}
            {key === "description" ? (
              <textarea name={key} rows={3} value={form[key]} onChange={handleChange} required />
            ) : (
              <input name={key} value={form[key]} onChange={handleChange} required />
            )}
          </label>
        ))}

        {/* Social links */}
        <div className="cf-field cf-full">
          <label>Social Links</label>
          {["instagram","facebook","x","youtube","Website"].map(p => (
            <input
              key={p}
              placeholder={`${p.charAt(0).toUpperCase() + p.slice(1)} URL`}
              value={form.social_links[p]}
              onChange={e => handleSocialChange(p, e.target.value)}
            />
          ))}
        </div>

        {/* ─── Logo (upload or URL) ─── */}
        <div className="cf-field cf-full">
          <label>Logo (upload or paste URL)</label>
          {/* URL text box (always keeps string) */}
          <input
            type="text"
            placeholder="https://…logo.png"
            value={typeof form.logo === "string" ? form.logo : ""}
            onChange={e => {
              setPreviewLogo(e.target.value);
              setForm(prev => ({ ...prev, logo: e.target.value }));
            }}
          />
          {/* File uploader */}
          <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
          {/* Preview */}
          {previewLogo && (
            <img src={previewLogo} alt="logo preview" style={{ maxWidth: 120, marginTop: 6 }} />
          )}
        </div>

        {/* ─── Banner Image (upload or URL) ─── */}
        <div className="cf-field cf-full">
          <label>Banner (upload or paste URL)</label>
          <input
            type="text"
            placeholder="https://…banner.jpg"
            value={typeof form.image === "string" ? form.image : ""}
            onChange={e => {
              setPreviewImage(e.target.value);
              setForm(prev => ({ ...prev, image: e.target.value }));
            }}
          />
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          {previewImage && (
            <img src={previewImage} alt="banner preview" style={{ maxWidth: 180, marginTop: 6 }} />
          )}
        </div>

        {/* Created-At (read-only) */}
        <label className="cf-field cf-full">
          Created At
          <input name="create_at" value={form.create_at} readOnly />
        </label>

        {error && <p className="cf-error cf-full">{error}</p>}

        <button type="submit" disabled={loading} className="cf-btn cf-full">
          {loading ? "Saving…" : "Save"}
        </button>
      </form>
    </section>
  );
}
