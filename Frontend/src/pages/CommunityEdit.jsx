// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import * as commApi from "../api/community";
// import bgImg from "../assets/1.png";

// export default function CommunityEdit() {
//   const { id }     = useParams();
//   const navigate   = useNavigate();
//   const [form, setForm] = useState(null);    // null until record loads
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ── fetch existing community ── */
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await commApi.getCommunity(id);
//         setForm({
//           ...data,
//           social_links: JSON.stringify(data.social_links ?? {}, null, 2)
//         });
//       } catch {
//         setError("Unable to load community");
//       }
//     })();
//   }, [id]);

//   /* ── handlers ── */
//   const handleChange = e => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async e => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const payload = {
//         ...form,
//         social_links: JSON.parse(form.social_links || "{}")
//       };
//       await commApi.updateCommunity(id, payload);
//       navigate("/communities");
//     } catch (err) {
//       setError(err?.response?.data?.error || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ── simple loading state ── */
//   if (!form) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading…
//       </div>
//     );
//   }

//   /* ── UI ── */
//   return (
//     <section
//       className="cf-section"
//       style={{
//         backgroundImage: `url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//         backgroundBlendMode: "overlay"
//       }}
//     >
//       <style>{`
//         :root {
//           --royal-red: #7A133D;
//           --heritage-red: #C62039;
//           --royal-gold: #D2A857;
//           --royal-cream: #FFF9F2;
//         }
//         .cf-card { width:100%; max-width:24rem; background:#94b7d261; border-radius:1.25rem; box-shadow:0 10px 25px rgba(0,0,0,0.1); padding:1.75rem 1.25rem; display:grid; gap:1rem; margin-left: 30%; }
//         .cf-title { text-align:center; font-size:1.75rem; font-weight:900; color:var(--heritage-red); }
//         .cf-field { display:flex; flex-direction:column; gap:0.25rem; font-size:0.875rem; font-weight:600; color:var(--royal-red); }
//         .cf-field input, .cf-field textarea { border:2px solid transparent; border-radius:0.5rem; padding:0.5rem 0.75rem; font-size:0.9rem; transition:border-color .2s, box-shadow .2s; resize:none; }
//         .cf-field input:focus, .cf-field textarea:focus { border-color:var(--royal-gold); outline:none; box-shadow:0 0 0 3px rgba(210,168,87,0.35); }
//         .cf-error { color:#b91c1c; text-align:center; font-weight:600; font-size:0.875rem; }
//         .cf-btn { background:var(--heritage-red); color:#fff; border:none; border-radius:0.5rem; padding:0.6rem; font-weight:700; cursor:pointer; transition:background .15s; }
//         .cf-btn:hover { background:var(--royal-red); }
//         .cf-btn:disabled { opacity:0.6; cursor:default; }

//         @media (min-width:640px){
//           .cf-card { max-width:40rem; grid-template-columns:repeat(2,1fr); padding:2rem 1.75rem; }
//           .cf-title { grid-column:span 2; font-size:2.25rem; }
//           .cf-full  { grid-column:span 2; }
//         }
//       `}</style>

//       <form className="cf-card" onSubmit={handleSubmit}>
//         <h2 className="cf-title">Edit Community</h2>

//         {[
//           ["name", "Name", false],
//           ["category", "Category", false],
//           ["contact", "Contact", false],
//           ["address", "Address", false],
//           ["email", "Email", false],
//           ["social_links", "Social Links (JSON)", true],
//           ["logo", "Logo URL", false],
//           ["description", "Description", true],
//           ["sub_category", "Sub-category", false],
//           ["image", "Image URL", false],
//           ["in_charge", "In-charge", false]
//         ].map(([key, label, isArea]) => (
//           <label key={key} className={`cf-field ${isArea ? "cf-full" : ""}`}>
//             {label}
//             {isArea ? (
//               <textarea
//                 name={key}
//                 value={form[key]}
//                 onChange={handleChange}
//                 rows={3}
//                 required={key !== "social_links"}
//               />
//             ) : (
//               <input
//                 name={key}
//                 value={form[key]}
//                 onChange={handleChange}
//                 required={
//                   key !== "social_links" && key !== "logo" && key !== "image"
//                 }
//               />
//             )}
//           </label>
//         ))}

//         {error && <p className="cf-error cf-full">{error}</p>}

//         <button className="cf-btn cf-full" disabled={loading}>
//           {loading ? "Saving…" : "Update"}
//         </button>
//       </form>
//     </section>
//   );
// }





import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as commApi from "../api/community";
import bgImg from "../assets/1.png";

export default function CommunityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await commApi.getCommunity(id);
        setForm({
          ...data,
          social_links: typeof data.social_links === "object" && data.social_links !== null
            ? data.social_links
            : {}
        });
      } catch {
        setError("Unable to load community");
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
      await commApi.updateCommunity(id, payload);
      navigate("/communities");
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
      className="cf-section"
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
        <h2 className="cf-title">Edit Community</h2>

        {/* Standard Fields */}
        {[
          ["name", "Name"],
          ["category", "Category"],
          ["contact", "Contact"],
          ["address", "Address"],
          ["email", "Email"],
          ["logo", "Logo URL"],
          ["description", "Description"],
          ["sub_category", "Sub-category"],
          ["image", "Image URL"],
          ["in_charge", "In-charge"]
        ].map(([key, label]) => (
          <label key={key} className={`cf-field ${key === "description" ? "cf-full" : ""}`}>
            {label}
            {key === "description" ? (
              <textarea
                name={key}
                value={form[key]}
                onChange={handleChange}
                rows={3}
                required
              />
            ) : (
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                required={key !== "logo" && key !== "image"}
              />
            )}
          </label>
        ))}

        {/* Social Links Section */}
        <div className="cf-field cf-full">
          <label style={{ fontWeight: "600", color: "var(--royal-red)" }}>
            Social Links
          </label>
          {["instagram", "facebook", "x", "youtube","Website"].map((platform) => (
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
              className="cf-social-input"
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

        {error && <p className="cf-error cf-full">{error}</p>}

        <button className="cf-btn cf-full" disabled={loading}>
          {loading ? "Saving…" : "Update"}
        </button>
      </form>
    </section>
  );
}
