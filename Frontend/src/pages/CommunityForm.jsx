// // // import { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import * as commApi from "../api/community";
// // // import bgImg from "../assets/1.png";

// // // export default function CommunityForm() {
// // //   const navigate = useNavigate();
// // //   const [form, setForm] = useState({
// // //     name: "",
// // //     category: "",
// // //     contact: "",
// // //     address: "",
// // //     email: "",
// // //     logo: null,
// // //     image: null,
// // //     description: "",
// // //     sub_category: "",
// // //     in_charge: "",
// // //     create_at: new Date().toISOString(),
// // //     social_links: {
// // //       instagram: "",
// // //       facebook: "",
// // //       x: "",
// // //       youtube: ""
// // //     }
// // //   });

// // //   const [error, setError] = useState("");
// // //   const [loading, setLoading] = useState(false);

// // //   const handleChange = e => {
// // //     const { name, value } = e.target;
// // //     setForm(prev => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleFileChange = e => {
// // //     const { name, files } = e.target;
// // //     setForm(prev => ({ ...prev, [name]: files[0] }));
// // //   };

// // //   const handleSocialChange = (platform, value) => {
// // //     setForm(prev => ({
// // //       ...prev,
// // //       social_links: {
// // //         ...prev.social_links,
// // //         [platform]: value
// // //       }
// // //     }));
// // //   };

// // //   const handleSubmit = async e => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError("");

// // //     try {
// // //       const formData = new FormData();
// // //       Object.entries(form).forEach(([key, value]) => {
// // //         if (key === "social_links") {
// // //           formData.append(key, JSON.stringify(value));
// // //         } else if (value instanceof File) {
// // //           formData.append(key, value, value.name);
// // //         } else {
// // //           formData.append(key, value);
// // //         }
// // //       });

// // //       await commApi.createCommunity(formData); // API should accept multipart/form-data
// // //       navigate("/communities");
// // //     } catch (err) {
// // //       setError(err?.response?.data?.error || "Failed to create community");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <section className="cf-section">
// // //       <style>{`
// // //         :root {
// // //           --royal-red: #7A133D;
// // //           --heritage-red: #C62039;
// // //           --royal-gold: #D2A857;
// // //           --royal-cream: #FFF9F2;
// // //           --sage: #8BBAA1;
// // //           --teal: #056675;
// // //         }
// // //         .cf-section {
// // //           min-height: 100vh;
// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;
// // //           background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7), rgba(139,186,161,0.7), rgba(5,102,117,0.7));
// // //           background-size: cover;
// // //           background-position: center;
          
// // //           padding: 1rem;
// // //           font-family: "Merriweather", "Georgia", serif;
// // //         }
// // //         .cf-card {
// // //           width: 100%;
// // //           max-width: 24rem;
// // //           background: #abdfc461;
// // //           border-radius: 1.25rem;
// // //           box-shadow: 0 10px 25px rgba(0,0,0,0.1);
// // //           padding: 1.75rem 1.25rem;
// // //           display: grid;
// // //           gap: 1rem;
// // //         }
// // //         .cf-title {
// // //           text-align: center;
// // //           font-size: 1.75rem;
// // //           font-weight: 900;
// // //           color: var(--heritage-red);
// // //         }
// // //         .cf-field {
// // //           display: flex;
// // //           flex-direction: column;
// // //           gap: 0.25rem;
// // //           font-size: 0.875rem;
// // //           font-weight: 600;
// // //           color: var(--royal-red);
// // //         }
// // //         .cf-field input,
// // //         .cf-field textarea {
// // //           border: 2px solid transparent;
// // //           border-radius: 0.5rem;
// // //           padding: 0.5rem 0.75rem;
// // //           font-size: 0.9rem;
// // //           resize: none;
// // //           transition: border-color 0.2s, box-shadow 0.2s;
// // //         }
// // //         .cf-field input:focus,
// // //         .cf-field textarea:focus {
// // //           border-color: var(--royal-gold);
// // //           outline: none;
// // //           box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
// // //         }
// // //         .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: 0.875rem; }
// // //         .cf-btn {
// // //           background: var(--heritage-red);
// // //           color: #fff;
// // //           border: none;
// // //           border-radius: 0.5rem;
// // //           padding: 0.6rem;
// // //           font-weight: 700;
// // //           cursor: pointer;
// // //           transition: background 0.15s;
// // //         }
// // //         .cf-btn:hover { background: var(--royal-red); }
// // //         .cf-btn:disabled { opacity: 0.6; cursor: default; }

// // //         @media (min-width: 640px) {
// // //           .cf-card { max-width: 40rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
// // //           .cf-title { grid-column: span 2; font-size: 2.25rem; }
// // //           .cf-full { grid-column: span 2; }
// // //         }
// // //       `}</style>

// // //       <form className="cf-card" onSubmit={handleSubmit} encType="multipart/form-data">
// // //         <h2 className="cf-title">Add Community</h2>

// // //         {[
// // //           ["name", "Name"],
// // //           ["category", "Category"],
// // //           ["contact", "Contact"],
// // //           ["address", "Address"],
// // //           ["email", "Email"],
// // //           ["description", "Description"],
// // //           ["sub_category", "Sub-category"],
// // //           ["in_charge", "In-charge"]
// // //         ].map(([key, label]) => (
// // //           <label key={key} className={`cf-field ${key === "description" ? "cf-full" : ""}`}>
// // //             {label}
// // //             {key === "description" ? (
// // //               <textarea name={key} value={form[key]} onChange={handleChange} rows={3} required />
// // //             ) : (
// // //               <input name={key} value={form[key]} onChange={handleChange} required />
// // //             )}
// // //           </label>
// // //         ))}

// // //         {/* Social Links */}
// // //         <div className="cf-field cf-full">
// // //           <label>Social Links</label>
// // //           {["instagram", "facebook", "x", "youtube","Website"].map((platform) => (
// // //             <input
// // //               key={platform}
// // //               placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
// // //               value={form.social_links[platform]}
// // //               onChange={(e) => handleSocialChange(platform, e.target.value)}
// // //             />
// // //           ))}
// // //         </div>

// // //         {/* Logo upload */}
// // //         <label className="cf-field cf-full">
// // //           Logo Upload
// // //           <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
// // //         </label>

// // //         {/* Image upload */}
// // //         <label className="cf-field cf-full">
// // //           Banner Image Upload
// // //           <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
// // //         </label>

// // //         {/* Created At */}
// // //         <label className="cf-field cf-full">
// // //           Created At
// // //           <input name="create_at" value={form.create_at} readOnly />
// // //         </label>

// // //         {error && <p className="cf-error cf-full">{error}</p>}

// // //         <button type="submit" disabled={loading} className="cf-btn cf-full">
// // //           {loading ? "Saving…" : "Save"}
// // //         </button>
// // //       </form>
// // //     </section>
// // //   );
// // // }



// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import * as commApi from "../api/community";
// // import bgImg from "../assets/1.png";

// // export default function CommunityForm() {
// //   const navigate = useNavigate();

// //   // thumbnail previews
// //   const [previewLogo,  setPreviewLogo]  = useState("");
// //   const [previewImage, setPreviewImage] = useState("");

// //   // main form data (logo / image hold either a URL string OR a File)
// //   const [form, setForm] = useState({
// //     name: "",
// //     category: "",
// //     contact: "",
// //     address: "",
// //     email: "",
// //     logo: "",              // string or File
// //     image: "",             // string or File
// //     description: "",
// //     sub_category: "",
// //     in_charge: "",
// //     create_at: new Date().toISOString(),
// //     social_links: {
// //       instagram: "",
// //       facebook: "",
// //       x: "",
// //       youtube: "",
// //       Website: ""
// //     }
// //   });

// //   const [error,   setError]   = useState("");
// //   const [loading, setLoading] = useState(false);

// //   /* ─────────────────── handlers ─────────────────── */
// //   const handleChange = e => {
// //     const { name, value } = e.target;
// //     setForm(prev => ({ ...prev, [name]: value }));
// //   };

// //   // update social_links
// //   const handleSocialChange = (platform, value) =>
// //     setForm(prev => ({
// //       ...prev,
// //       social_links: { ...prev.social_links, [platform]: value }
// //     }));

// //   // file picker ⟶ preview + store File
// //   const handleFileChange = e => {
// //     const { name, files } = e.target;
// //     const file = files[0];
// //     if (!file) return;

// //     const url = URL.createObjectURL(file);
// //     if (name === "logo")  setPreviewLogo(url);
// //     if (name === "image") setPreviewImage(url);

// //     setForm(prev => ({ ...prev, [name]: file }));
// //   };

// //   /* ───────────── submit (dual-mode) ─────────────── */
// //   const handleSubmit = async e => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError("");

// //     // decide whether we need FormData (if files present)
// //     const needMultipart =
// //       form.logo instanceof File || form.image instanceof File;

// //     try {
// //       let payload;
// //       if (needMultipart) {
// //         payload = new FormData();
// //         Object.entries(form).forEach(([key, val]) => {
// //           if (key === "social_links") {
// //             payload.append(key, JSON.stringify(val));
// //           } else if (val instanceof File) {
// //             payload.append(key, val, val.name);
// //           } else {
// //             payload.append(key, val);
// //           }
// //         });
// //       } else {
// //         payload = {
// //           ...form,
// //           // stringify so backend still gets a string
// //           social_links: JSON.stringify(form.social_links)
// //         };
// //       }

// //       await commApi.createCommunity(payload);
// //       navigate("/communities");
// //     } catch (err) {
// //       setError(err?.response?.data?.error || "Failed to create community");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* ─────────────────── UI ─────────────────── */
// //   return (
// //     <section className="cf-section">
// //          <style>{`
// //         :root {
// //           --royal-red: #7A133D;
// //           --heritage-red: #C62039;
// //           --royal-gold: #D2A857;
// //           --royal-cream: #FFF9F2;
// //           --sage: #8BBAA1;
// //           --teal: #056675;
// //         }
// //         .cf-section {
// //           min-height: 100vh;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7), rgba(139,186,161,0.7), rgba(5,102,117,0.7));
// //           background-size: cover;
// //           background-position: center;
          
// //           padding: 1rem;
// //           font-family: "Merriweather", "Georgia", serif;
// //         }
// //         .cf-card {
// //           width: 100%;
// //           max-width: 24rem;
// //           background: #abdfc461;
// //           border-radius: 1.25rem;
// //           box-shadow: 0 10px 25px rgba(0,0,0,0.1);
// //           padding: 1.75rem 1.25rem;
// //           display: grid;
// //           gap: 1rem;
// //         }
// //         .cf-title {
// //           text-align: center;
// //           font-size: 1.75rem;
// //           font-weight: 900;
// //           color: var(--heritage-red);
// //         }
// //         .cf-field {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 0.25rem;
// //           font-size: 0.875rem;
// //           font-weight: 600;
// //           color: var(--royal-red);
// //         }
// //         .cf-field input,
// //         .cf-field textarea {
// //           border: 2px solid transparent;
// //           border-radius: 0.5rem;
// //           padding: 0.5rem 0.75rem;
// //           font-size: 0.9rem;
// //           resize: none;
// //           transition: border-color 0.2s, box-shadow 0.2s;
// //         }
// //         .cf-field input:focus,
// //         .cf-field textarea:focus {
// //           border-color: var(--royal-gold);
// //           outline: none;
// //           box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
// //         }
// //         .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: 0.875rem; }
// //         .cf-btn {
// //           background: var(--heritage-red);
// //           color: #fff;
// //           border: none;
// //           border-radius: 0.5rem;
// //           padding: 0.6rem;
// //           font-weight: 700;
// //           cursor: pointer;
// //           transition: background 0.15s;
// //         }
// //         .cf-btn:hover { background: var(--royal-red); }
// //         .cf-btn:disabled { opacity: 0.6; cursor: default; }

// //         @media (min-width: 640px) {
// //           .cf-card { max-width: 40rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
// //           .cf-title { grid-column: span 2; font-size: 2.25rem; }
// //           .cf-full { grid-column: span 2; }
// //         }
// //       `}</style>

// //       <form className="cf-card" onSubmit={handleSubmit}>
// //         <h2 className="cf-title">Add Community</h2>

// //         {/* Standard text / textarea fields */}
// //         {[
// //           ["name", "Name"],
// //           ["category", "Category"],
// //           ["contact", "Contact"],
// //           ["address", "Address"],
// //           ["email", "Email"],
// //           ["description", "Description"],
// //           ["sub_category", "Sub-category"],
// //           ["in_charge", "In-charge"]
// //         ].map(([key, label]) => (
// //           <label key={key} className={`cf-field ${key === "description" ? "cf-full" : ""}`}>
// //             {label}
// //             {key === "description" ? (
// //               <textarea name={key} rows={3} value={form[key]} onChange={handleChange} required />
// //             ) : (
// //               <input name={key} value={form[key]} onChange={handleChange} required />
// //             )}
// //           </label>
// //         ))}

// //         {/* Social links */}
// //         <div className="cf-field cf-full">
// //           <label>Social Links</label>
// //           {["instagram","facebook","x","youtube","Website"].map(p => (
// //             <input
// //               key={p}
// //               placeholder={`${p.charAt(0).toUpperCase() + p.slice(1)} URL`}
// //               value={form.social_links[p]}
// //               onChange={e => handleSocialChange(p, e.target.value)}
// //             />
// //           ))}
// //         </div>

// //         {/* ─── Logo (upload or URL) ─── */}
// //         <div className="cf-field cf-full">
// //           <label>Logo (upload or paste URL)</label>
// //           {/* URL text box (always keeps string) */}
// //           <input
// //             type="text"
// //             placeholder="https://…logo.png"
// //             value={typeof form.logo === "string" ? form.logo : ""}
// //             onChange={e => {
// //               setPreviewLogo(e.target.value);
// //               setForm(prev => ({ ...prev, logo: e.target.value }));
// //             }}
// //           />
// //           {/* File uploader */}
// //           <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
// //           {/* Preview */}
// //           {previewLogo && (
// //             <img src={previewLogo} alt="logo preview" style={{ maxWidth: 120, marginTop: 6 }} />
// //           )}
// //         </div>

// //         {/* ─── Banner Image (upload or URL) ─── */}
// //         <div className="cf-field cf-full">
// //           <label>Banner (upload or paste URL)</label>
// //           <input
// //             type="text"
// //             placeholder="https://…banner.jpg"
// //             value={typeof form.image === "string" ? form.image : ""}
// //             onChange={e => {
// //               setPreviewImage(e.target.value);
// //               setForm(prev => ({ ...prev, image: e.target.value }));
// //             }}
// //           />
// //           <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
// //           {previewImage && (
// //             <img src={previewImage} alt="banner preview" style={{ maxWidth: 180, marginTop: 6 }} />
// //           )}
// //         </div>

// //         {/* Created-At (read-only) */}
// //         <label className="cf-field cf-full">
// //           Created At
// //           <input name="create_at" value={form.create_at} readOnly />
// //         </label>

// //         {error && <p className="cf-error cf-full">{error}</p>}

// //         <button type="submit" disabled={loading} className="cf-btn cf-full">
// //           {loading ? "Saving…" : "Save"}
// //         </button>
// //       </form>
// //     </section>
// //   );
// // }



// // src/pages/CommunityForm.jsx
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as commApi from "../api/community";
// import bgImg from "../assets/1.png";

// export default function CommunityForm() {
//   const navigate = useNavigate();

//   // previews
//   const [previewLogo, setPreviewLogo] = useState("");
//   const [previewImage, setPreviewImage] = useState("");

//   // taxonomy
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   // form data
//   const [form, setForm] = useState({
//     name: "",
//     // these are names; backend will map/create & link:
//     category: "",
//     sub_category: "",

//     contact: "",
//     address: "",
//     email: "",
//     description: "",
//     in_charge: "",

//     // can be URL string OR File
//     logo: "",
//     image: "",

//     reached_out: false,

//     // use lowercase keys for consistency
//     social_links: {
//       instagram: "",
//       facebook: "",
//       x: "",
//       youtube: "",
//       website: "",
//     },
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ─────────────────── taxonomy ─────────────────── */
//   useEffect(() => {
//     (async () => {
//       try {
//         const cats = await commApi.listCategories();
//         setCategories(cats || []);
//       } catch {
//         // non-fatal
//       }
//     })();
//   }, []);

//   useEffect(() => {
//     setForm(prev => ({ ...prev, sub_category: "" })); // reset subcat when category changes
//     if (!form.category) return setSubCategories([]);

//     (async () => {
//       try {
//         const subs = await commApi.listSubCategories({ categoryName: form.category });
//         setSubCategories(subs || []);
//       } catch {
//         setSubCategories([]);
//       }
//     })();
//   }, [form.category]);

//   /* ─────────────────── handlers ─────────────────── */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name === "reached_out") {
//       setForm(prev => ({ ...prev, reached_out: !!checked }));
//     } else {
//       setForm(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // update social_links
//   const handleSocialChange = (platform, value) =>
//     setForm(prev => ({
//       ...prev,
//       social_links: { ...prev.social_links, [platform]: value },
//     }));

//   // file picker → preview + store File
//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files?.[0];
//     if (!file) return;

//     const url = URL.createObjectURL(file);
//     if (name === "logo") setPreviewLogo(url);
//     if (name === "image") setPreviewImage(url);

//     setForm(prev => ({ ...prev, [name]: file }));
//   };

//   // if user types URL into logo/image, keep preview synced
//   const handleUrlChange = (name, value) => {
//     if (name === "logo") setPreviewLogo(value || "");
//     if (name === "image") setPreviewImage(value || "");
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   /* ───────────── submit ───────────── */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       // Pass plain object; api helper will switch to multipart if it sees File
//       const payload = { ...form };
//       await commApi.createCommunity(payload);
//       navigate("/communities");
//     } catch (err) {
//       setError(err?.response?.data?.error || "Failed to create community");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ─────────────────── UI ─────────────────── */
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
//         .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
//         .cf-field input, .cf-field textarea, .cf-field select {
//           border: 2px solid transparent;
//           border-radius: 0.5rem;
//           padding: 0.5rem 0.75rem;
//           font-size: 0.9rem;
//           resize: none;
//           transition: border-color 0.2s, box-shadow 0.2s;
//           background: #fff;
//         }
//         .cf-field input:focus, .cf-field textarea:focus, .cf-field select:focus {
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
//         .cf-check {
//           display: inline-flex; align-items: center; gap: .5rem; user-select: none;
//         }

//         @media (min-width: 640px) {
//           .cf-card { max-width: 44rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
//           .cf-title { grid-column: span 2; font-size: 2.25rem; }
//           .cf-full { grid-column: span 2; }
//         }
//       `}</style>

//       <form className="cf-card" onSubmit={handleSubmit}>
//         <h2 className="cf-title">Add Community</h2>

//         {/* Name */}
//         <label className="cf-field cf-full">
//           Name
//           <input name="name" value={form.name} onChange={handleChange} required />
//         </label>

//         {/* Category / Sub-category */}
//         <div className="cf-row cf-full">
//           <label className="cf-field">
//             Category
//             <select
//               name="category"
//               value={form.category}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select category…</option>
//               {categories.map(c => (
//                 <option key={c.id} value={c.name}>{c.name}</option>
//               ))}
//             </select>
//           </label>

//           <label className="cf-field">
//             Sub-category
//             <select
//               name="sub_category"
//               value={form.sub_category}
//               onChange={handleChange}
//               disabled={!form.category}
//               required
//             >
//               <option value="">{form.category ? "Select sub-category…" : "Choose category first"}</option>
//               {subCategories.map(sc => (
//                 <option key={sc.id} value={sc.name}>{sc.name}</option>
//               ))}
//             </select>
//           </label>
//         </div>

//         {/* Contact / Email */}
//         <div className="cf-row cf-full">
//           <label className="cf-field">
//             Contact
//             <input name="contact" value={form.contact} onChange={handleChange} required />
//           </label>
//           <label className="cf-field">
//             Email
//             <input name="email" type="email" value={form.email} onChange={handleChange} required />
//           </label>
//         </div>

//         {/* Address / In-charge */}
//         <div className="cf-row cf-full">
//           <label className="cf-field">
//             Address
//             <input name="address" value={form.address} onChange={handleChange} required />
//           </label>
//           <label className="cf-field">
//             In-charge
//             <input name="in_charge" value={form.in_charge} onChange={handleChange} required />
//           </label>
//         </div>

//         {/* Description */}
//         <label className="cf-field cf-full">
//           Description
//           <textarea
//             name="description"
//             rows={3}
//             value={form.description}
//             onChange={handleChange}
//             required
//           />
//         </label>

//         {/* Social links */}
//         <div className="cf-field cf-full">
//           <label>Social Links</label>
//           {["instagram","facebook","x","youtube","website"].map(p => (
//             <input
//               key={p}
//               placeholder={`${p.charAt(0).toUpperCase() + p.slice(1)} URL`}
//               value={form.social_links[p]}
//               onChange={e => handleSocialChange(p, e.target.value)}
//             />
//           ))}
//         </div>

//         {/* Logo: URL or File */}
//         <div className="cf-field cf-full">
//           <label>Logo (upload or paste URL)</label>
//           <input
//             type="text"
//             placeholder="https://…logo.png"
//             value={typeof form.logo === "string" ? form.logo : ""}
//             onChange={e => handleUrlChange("logo", e.target.value)}
//           />
//           <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
//           {previewLogo && (
//             <img src={previewLogo} alt="logo preview" style={{ maxWidth: 120, marginTop: 6 }} />
//           )}
//         </div>

//         {/* Banner: URL or File */}
//         <div className="cf-field cf-full">
//           <label>Banner (upload or paste URL)</label>
//           <input
//             type="text"
//             placeholder="https://…banner.jpg"
//             value={typeof form.image === "string" ? form.image : ""}
//             onChange={e => handleUrlChange("image", e.target.value)}
//           />
//           <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
//           {previewImage && (
//             <img src={previewImage} alt="banner preview" style={{ maxWidth: 180, marginTop: 6 }} />
//           )}
//         </div>

//         {/* Reached Out */}
//         <label className="cf-field cf-full">
//           <span className="cf-check">
//             <input
//               type="checkbox"
//               name="reached_out"
//               checked={form.reached_out}
//               onChange={handleChange}
//             />
//             Mark as reached
//           </span>
//         </label>

//         {error && <p className="cf-error cf-full">{error}</p>}

//         <button type="submit" disabled={loading} className="cf-btn cf-full">
//           {loading ? "Saving…" : "Save"}
//         </button>
//       </form>
//     </section>
//   );
// }


// src/pages/CommunityForm.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as commApi from "../api/community";
import bgImg from "../assets/1.png";

const ADD_NEW_SUB = "__other_sub__"; // sentinel for the “Other” option

export default function CommunityForm() {
  const navigate = useNavigate();

  // previews
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // taxonomy
  const [categories, setCategories] = useState([]);       // [{id,name,...}]
  const [subCategories, setSubCategories] = useState([]); // [{id,name,...}]

  // inline new sub-category UI
  const [showAddSub, setShowAddSub] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [creatingSub, setCreatingSub] = useState(false);

  // form data (you store NAMES; backend maps/creates accordingly)
  const [form, setForm] = useState({
    name: "",
    category: "",
    sub_category: "",
    contact: "",
    address: "",
    email: "",
    description: "",
    in_charge: "",
    logo: "",   // can be URL or File
    image: "",  // can be URL or File
    reached_out: false,
    social_links: {
      instagram: "",
      facebook: "",
      x: "",
      youtube: "",
      website: "",
    },
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const selectedCategory = useMemo(
    () => categories.find(c => c.name === form.category) || null,
    [categories, form.category]
  );

  /* ───────── load categories ───────── */
  useEffect(() => {
    (async () => {
      try {
        const cats = await commApi.listCategories();
        setCategories(Array.isArray(cats) ? cats : []);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  /* ───────── load sub-categories when category changes ───────── */
  useEffect(() => {
    setForm(prev => ({ ...prev, sub_category: "" })); // reset subcat when category changes
    setShowAddSub(false);
    setNewSubName("");

    if (!form.category) return setSubCategories([]);

    (async () => {
      try {
        const subs = await commApi.listSubCategories({
          categoryName: form.category,
          parentId: selectedCategory?.id, // pass id if API supports
        });
        setSubCategories(Array.isArray(subs) ? subs : []);
      } catch {
        setSubCategories([]);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.category, selectedCategory?.id]);

  /* ───────── handlers ───────── */
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "reached_out") {
      setForm(prev => ({ ...prev, reached_out: !!checked }));
      return;
    }

    if (name === "sub_category") {
      if (value === ADD_NEW_SUB) { // “Other” → show inline input
        setShowAddSub(true);
        setNewSubName("");
        return; // don't set sub_category yet
      } else {
        setShowAddSub(false);
        setNewSubName("");
      }
    }

    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (platform, value) =>
    setForm(prev => ({
      ...prev,
      social_links: { ...prev.social_links, [platform]: value },
    }));

  // file picker → preview + store File
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    if (name === "logo") setPreviewLogo(url);
    if (name === "image") setPreviewImage(url);

    setForm(prev => ({ ...prev, [name]: file }));
  };

  // if user types URL into logo/image, keep preview synced
  const handleUrlChange = (name, value) => {
    if (name === "logo") setPreviewLogo(value || "");
    if (name === "image") setPreviewImage(value || "");
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // inline create sub-category under selected category
  const addNewSubCategory = async (e) => {
    e.preventDefault();
    if (!selectedCategory?.id) {
      alert("Please select a category first.");
      return;
    }
    const name = (newSubName || "").trim();
    if (!name) {
      alert("Enter a sub-category name.");
      return;
    }

    try {
      setCreatingSub(true);
      const created = await commApi.createSubcategory(selectedCategory.id, name);

      // refresh subs for this category
      const subs = await commApi.listSubCategories({
        categoryName: form.category,
        parentId: selectedCategory.id,
      });
      setSubCategories(Array.isArray(subs) ? subs : []);

      // select the new one by NAME (you store names in form)
      const createdName = created?.name || name;
      setForm(prev => ({ ...prev, sub_category: createdName }));

      setShowAddSub(false);
      setNewSubName("");
    } catch (err) {
      alert(err?.response?.data?.error || err?.message || "Failed to add sub-category");
    } finally {
      setCreatingSub(false);
    }
  };

  /* ───────── submit ───────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = { ...form }; // API helper auto-switches to multipart if it sees File
      await commApi.createCommunity(payload);
      navigate("/communities");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to create community");
    } finally {
      setLoading(false);
    }
  };

  /* ───────── UI ───────── */
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
        .cf-field { display: flex; flex-direction: column; gap: 0.25rem; font-size: 0.875rem; font-weight: 600; color: var(--royal-red); }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
        .cf-field input, .cf-field textarea, .cf-field select {
          border: 2px solid transparent; border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.9rem; resize: none; transition: border-color 0.2s, box-shadow 0.2s; background: #fff;
        }
        .cf-field input:focus, .cf-field textarea:focus, .cf-field select:focus {
          border-color: var(--royal-gold); outline: none; box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
        }
        .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: 0.875rem; }
        .cf-btn { background: var(--heritage-red); color: #fff; border: none; border-radius: 0.5rem; padding: 0.6rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .cf-btn:hover { background: var(--royal-red); }
        .cf-btn:disabled { opacity: 0.6; cursor: default; }
        .cf-check { display: inline-flex; align-items: center; gap: .5rem; user-select: none; }
        @media (min-width: 640px) { .cf-card { max-width: 44rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); } .cf-title { grid-column: span 2; font-size: 2.25rem; } .cf-full { grid-column: span 2; } }
        .cf-inline-row { display: flex; gap: .5rem; align-items: center; }
        .cf-btn-ghost { padding: .6rem; border-radius: .5rem; border: 1px solid #ddd; background: #f7f7f7; cursor: pointer; }
      `}</style>

      <form className="cf-card" onSubmit={handleSubmit}>
        <h2 className="cf-title">Add Community</h2>

        {/* Name */}
        <label className="cf-field cf-full">
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        {/* Category / Sub-category */}
        <div className="cf-row cf-full">
          <label className="cf-field">
            Category
            <select name="category" value={form.category} onChange={handleChange} required>
              <option value="">Select category…</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </label>

          <label className="cf-field">
            Sub-category
            <select
              name="sub_category"
              value={showAddSub ? ADD_NEW_SUB : form.sub_category}
              onChange={handleChange}
              disabled={!form.category}
              required
            >
              <option value="">{form.category ? "Select sub-category…" : "Choose category first"}</option>
              {subCategories.map(sc => (
                <option key={sc.id} value={sc.name}>{sc.name}</option>
              ))}
              {form.category && <option value={ADD_NEW_SUB}>Other (add new)…</option>}
            </select>

            {/* Inline add new sub-category */}
            {showAddSub && (
              <div className="cf-inline-row">
                <input
                  type="text"
                  placeholder="New sub-category name"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                />
                <button
                  type="button"
                  className="cf-btn"
                  disabled={creatingSub || !newSubName.trim() || !selectedCategory}
                  onClick={addNewSubCategory}
                >
                  {creatingSub ? "Adding…" : "Add"}
                </button>
                <button
                  type="button"
                  className="cf-btn-ghost"
                  onClick={() => { setShowAddSub(false); setNewSubName(""); }}
                >
                  Cancel
                </button>
              </div>
            )}
          </label>
        </div>

        {/* Contact / Email */}
        <div className="cf-row cf-full">
          <label className="cf-field">
            Contact
            <input name="contact" value={form.contact} onChange={handleChange} required />
          </label>
          <label className="cf-field">
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>
        </div>

        {/* Address / In-charge */}
        <div className="cf-row cf-full">
          <label className="cf-field">
            Address
            <input name="address" value={form.address} onChange={handleChange} required />
          </label>
          <label className="cf-field">
            In-charge
            <input name="in_charge" value={form.in_charge} onChange={handleChange} required />
          </label>
        </div>

        {/* Description */}
        <label className="cf-field cf-full">
          Description
          <textarea name="description" rows={3} value={form.description} onChange={handleChange} required />
        </label>

        {/* Social links */}
        <div className="cf-field cf-full">
          <label>Social Links</label>
          {["instagram","facebook","x","youtube","website"].map(p => (
            <input
              key={p}
              placeholder={`${p.charAt(0).toUpperCase() + p.slice(1)} URL`}
              value={form.social_links[p]}
              onChange={e => handleSocialChange(p, e.target.value)}
            />
          ))}
        </div>

        {/* Logo: URL or File */}
        <div className="cf-field cf-full">
          <label>Logo (upload or paste URL)</label>
          <input type="text" placeholder="https://…logo.png" value={typeof form.logo === "string" ? form.logo : ""} onChange={e => handleUrlChange("logo", e.target.value)} />
          <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
          {previewLogo && (<img src={previewLogo} alt="logo preview" style={{ maxWidth: 120, marginTop: 6 }} />)}
        </div>

        {/* Banner: URL or File */}
        <div className="cf-field cf-full">
          <label>Banner (upload or paste URL)</label>
          <input type="text" placeholder="https://…banner.jpg" value={typeof form.image === "string" ? form.image : ""} onChange={e => handleUrlChange("image", e.target.value)} />
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          {previewImage && (<img src={previewImage} alt="banner preview" style={{ maxWidth: 180, marginTop: 6 }} />)}
        </div>

        {/* Reached Out */}
        <label className="cf-field cf-full">
          <span className="cf-check">
            <input type="checkbox" name="reached_out" checked={form.reached_out} onChange={handleChange} />
            Mark as reached
          </span>
        </label>

        {error && <p className="cf-error cf-full">{error}</p>}

        <button type="submit" disabled={loading} className="cf-btn cf-full">
          {loading ? "Saving…" : "Save"}
        </button>
      </form>
    </section>
  );
}



