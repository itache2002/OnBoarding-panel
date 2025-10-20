//   // // import { useEffect, useState } from "react";
//   // // import { useNavigate, useParams } from "react-router-dom";
//   // // import * as commApi from "../api/community";
//   // // import bgImg from "../assets/1.png";

//   // // export default function CommunityEdit() {
//   // //   const { id }     = useParams();
//   // //   const navigate   = useNavigate();
//   // //   const [form, setForm] = useState(null);    // null until record loads
//   // //   const [error, setError] = useState("");
//   // //   const [loading, setLoading] = useState(false);

//   // //   /* ── fetch existing community ── */
//   // //   useEffect(() => {
//   // //     (async () => {
//   // //       try {
//   // //         const data = await commApi.getCommunity(id);
//   // //         setForm({
//   // //           ...data,
//   // //           social_links: JSON.stringify(data.social_links ?? {}, null, 2)
//   // //         });
//   // //       } catch {
//   // //         setError("Unable to load community");
//   // //       }
//   // //     })();
//   // //   }, [id]);

//   // //   /* ── handlers ── */
//   // //   const handleChange = e => {
//   // //     const { name, value } = e.target;
//   // //     setForm(prev => ({ ...prev, [name]: value }));
//   // //   };

//   // //   const handleSubmit = async e => {
//   // //     e.preventDefault();
//   // //     setLoading(true);
//   // //     setError("");
//   // //     try {
//   // //       const payload = {
//   // //         ...form,
//   // //         social_links: JSON.parse(form.social_links || "{}")
//   // //       };
//   // //       await commApi.updateCommunity(id, payload);
//   // //       navigate("/communities");
//   // //     } catch (err) {
//   // //       setError(err?.response?.data?.error || "Update failed");
//   // //     } finally {
//   // //       setLoading(false);
//   // //     }
//   // //   };

//   // //   /* ── simple loading state ── */
//   // //   if (!form) {
//   // //     return (
//   // //       <div className="min-h-screen flex items-center justify-center">
//   // //         Loading…
//   // //       </div>
//   // //     );
//   // //   }

//   // //   /* ── UI ── */
//   // //   return (
//   // //     <section
//   // //       className="cf-section"
//   // //       style={{
//   // //         backgroundImage: `url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%)`,
//   // //         backgroundSize: "cover",
//   // //         backgroundPosition: "center",
//   // //         backgroundBlendMode: "overlay"
//   // //       }}
//   // //     >
//   // //       <style>{`
//   // //         :root {
//   // //           --royal-red: #7A133D;
//   // //           --heritage-red: #C62039;
//   // //           --royal-gold: #D2A857;
//   // //           --royal-cream: #FFF9F2;
//   // //         }
//   // //         .cf-card { width:100%; max-width:24rem; background:#94b7d261; border-radius:1.25rem; box-shadow:0 10px 25px rgba(0,0,0,0.1); padding:1.75rem 1.25rem; display:grid; gap:1rem; margin-left: 30%; }
//   // //         .cf-title { text-align:center; font-size:1.75rem; font-weight:900; color:var(--heritage-red); }
//   // //         .cf-field { display:flex; flex-direction:column; gap:0.25rem; font-size:0.875rem; font-weight:600; color:var(--royal-red); }
//   // //         .cf-field input, .cf-field textarea { border:2px solid transparent; border-radius:0.5rem; padding:0.5rem 0.75rem; font-size:0.9rem; transition:border-color .2s, box-shadow .2s; resize:none; }
//   // //         .cf-field input:focus, .cf-field textarea:focus { border-color:var(--royal-gold); outline:none; box-shadow:0 0 0 3px rgba(210,168,87,0.35); }
//   // //         .cf-error { color:#b91c1c; text-align:center; font-weight:600; font-size:0.875rem; }
//   // //         .cf-btn { background:var(--heritage-red); color:#fff; border:none; border-radius:0.5rem; padding:0.6rem; font-weight:700; cursor:pointer; transition:background .15s; }
//   // //         .cf-btn:hover { background:var(--royal-red); }
//   // //         .cf-btn:disabled { opacity:0.6; cursor:default; }

//   // //         @media (min-width:640px){
//   // //           .cf-card { max-width:40rem; grid-template-columns:repeat(2,1fr); padding:2rem 1.75rem; }
//   // //           .cf-title { grid-column:span 2; font-size:2.25rem; }
//   // //           .cf-full  { grid-column:span 2; }
//   // //         }
//   // //       `}</style>

//   // //       <form className="cf-card" onSubmit={handleSubmit}>
//   // //         <h2 className="cf-title">Edit Community</h2>

//   // //         {[
//   // //           ["name", "Name", false],
//   // //           ["category", "Category", false],
//   // //           ["contact", "Contact", false],
//   // //           ["address", "Address", false],
//   // //           ["email", "Email", false],
//   // //           ["social_links", "Social Links (JSON)", true],
//   // //           ["logo", "Logo URL", false],
//   // //           ["description", "Description", true],
//   // //           ["sub_category", "Sub-category", false],
//   // //           ["image", "Image URL", false],
//   // //           ["in_charge", "In-charge", false]
//   // //         ].map(([key, label, isArea]) => (
//   // //           <label key={key} className={`cf-field ${isArea ? "cf-full" : ""}`}>
//   // //             {label}
//   // //             {isArea ? (
//   // //               <textarea
//   // //                 name={key}
//   // //                 value={form[key]}
//   // //                 onChange={handleChange}
//   // //                 rows={3}
//   // //                 required={key !== "social_links"}
//   // //               />
//   // //             ) : (
//   // //               <input
//   // //                 name={key}
//   // //                 value={form[key]}
//   // //                 onChange={handleChange}
//   // //                 required={
//   // //                   key !== "social_links" && key !== "logo" && key !== "image"
//   // //                 }
//   // //               />
//   // //             )}
//   // //           </label>
//   // //         ))}

//   // //         {error && <p className="cf-error cf-full">{error}</p>}

//   // //         <button className="cf-btn cf-full" disabled={loading}>
//   // //           {loading ? "Saving…" : "Update"}
//   // //         </button>
//   // //       </form>
//   // //     </section>
//   // //   );
//   // // }





//   // import { useEffect, useState } from "react";
//   // import { useNavigate, useParams } from "react-router-dom";
//   // import * as commApi from "../api/community";
//   // import bgImg from "../assets/1.png";

//   // export default function CommunityEdit() {
//   //   const { id } = useParams();
//   //   const navigate = useNavigate();
//   //   const [form, setForm] = useState(null);
//   //   const [error, setError] = useState("");
//   //   const [loading, setLoading] = useState(false);

//   //   useEffect(() => {
//   //     (async () => {
//   //       try {
//   //         const data = await commApi.getCommunity(id);
//   //         setForm({
//   //           ...data,
//   //           social_links: typeof data.social_links === "object" && data.social_links !== null
//   //             ? data.social_links
//   //             : {}
//   //         });
//   //       } catch {
//   //         setError("Unable to load community");
//   //       }
//   //     })();
//   //   }, [id]);

//   //   const handleChange = e => {
//   //     const { name, value } = e.target;
//   //     setForm(prev => ({ ...prev, [name]: value }));
//   //   };

//   //   const handleSubmit = async e => {
//   //     e.preventDefault();
//   //     setLoading(true);
//   //     setError("");
//   //     try {
//   //       const payload = {
//   //         ...form,
//   //         social_links: form.social_links || {}
//   //       };
//   //       await commApi.updateCommunity(id, payload);
//   //       navigate("/communities");
//   //     } catch (err) {
//   //       setError(err?.response?.data?.error || "Update failed");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   if (!form) {
//   //     return (
//   //       <div className="min-h-screen flex items-center justify-center">
//   //         Loading…
//   //       </div>
//   //     );
//   //   }

//   //   return (
//   //     <section
//   //       className="cf-section"
//   //       style={{
//   //         backgroundImage: `url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%)`,
//   //         backgroundSize: "cover",
//   //         backgroundPosition: "center",
//   //       }}
//   //     >
//   //       <style>{`
//   //       :root {
//   //               --royal-red: #7A133D;
//   //               --heritage-red: #C62039;
//   //               --royal-gold: #D2A857;
//   //               --royal-cream: #FFF9F2;
//   //               --sage: #8BBAA1;
//   //               --teal: #056675;
//   //             }
//   //             .cf-section {
//   //               min-height: 100vh;
//   //               display: flex;
//   //               align-items: center;
//   //               justify-content: center;
//   //               background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7), rgba(139,186,161,0.7), rgba(5,102,117,0.7));
//   //               background-size: cover;
//   //               background-position: center;
                
//   //               padding: 1rem;
//   //               font-family: "Merriweather", "Georgia", serif;
//   //             }
//   //             .cf-card {
//   //               width: 100%;
//   //               max-width: 24rem;
//   //               background: #abdfc461;
//   //               border-radius: 1.25rem;
//   //               box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//   //               padding: 1.75rem 1.25rem;
//   //               display: grid;
//   //               gap: 1rem;
//   //             }
//   //             .cf-title {
//   //               text-align: center;
//   //               font-size: 1.75rem;
//   //               font-weight: 900;
//   //               color: var(--heritage-red);
//   //             }
//   //             .cf-field {
//   //               display: flex;
//   //               flex-direction: column;
//   //               gap: 0.25rem;
//   //               font-size: 0.875rem;
//   //               font-weight: 600;
//   //               color: var(--royal-red);
//   //             }
//   //             .cf-field input,
//   //             .cf-field textarea {
//   //               border: 2px solid transparent;
//   //               border-radius: 0.5rem;
//   //               padding: 0.5rem 0.75rem;
//   //               font-size: 0.9rem;
//   //               resize: none;
//   //               transition: border-color 0.2s, box-shadow 0.2s;
//   //             }
//   //             .cf-field input:focus,
//   //             .cf-field textarea:focus {
//   //               border-color: var(--royal-gold);
//   //               outline: none;
//   //               box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
//   //             }
//   //             .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: 0.875rem; }
//   //             .cf-btn {
//   //               background: var(--heritage-red);
//   //               color: #fff;
//   //               border: none;
//   //               border-radius: 0.5rem;
//   //               padding: 0.6rem;
//   //               font-weight: 700;
//   //               cursor: pointer;
//   //               transition: background 0.15s;
//   //             }
//   //             .cf-btn:hover { background: var(--royal-red); }
//   //             .cf-btn:disabled { opacity: 0.6; cursor: default; }
      
//   //             @media (min-width: 640px) {
//   //               .cf-card { max-width: 40rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
//   //               .cf-title { grid-column: span 2; font-size: 2.25rem; }
//   //               .cf-full { grid-column: span 2; }
//   //             }
//   //       `}</style>

//   //       <form className="cf-card" onSubmit={handleSubmit}>
//   //         <h2 className="cf-title">Edit Community</h2>

//   //         {/* Standard Fields */}
//   //         {[
//   //           ["name", "Name"],
//   //           ["category", "Category"],
//   //           ["contact", "Contact"],
//   //           ["address", "Address"],
//   //           ["email", "Email"],
//   //           ["logo", "Logo URL"],
//   //           ["description", "Description"],
//   //           ["sub_category", "Sub-category"],
//   //           ["image", "Image URL"],
//   //           ["in_charge", "In-charge"]
//   //         ].map(([key, label]) => (
//   //           <label key={key} className={`cf-field ${key === "description" ? "cf-full" : ""}`}>
//   //             {label}
//   //             {key === "description" ? (
//   //               <textarea
//   //                 name={key}
//   //                 value={form[key]}
//   //                 onChange={handleChange}
//   //                 rows={3}
//   //                 required
//   //               />
//   //             ) : (
//   //               <input
//   //                 name={key}
//   //                 value={form[key]}
//   //                 onChange={handleChange}
//   //                 required={key !== "logo" && key !== "image"}
//   //               />
//   //             )}
//   //           </label>
//   //         ))}

//   //         {/* Social Links Section */}
//   //         <div className="cf-field cf-full">
//   //           <label style={{ fontWeight: "600", color: "var(--royal-red)" }}>
//   //             Social Links
//   //           </label>
//   //           {["instagram", "facebook", "x", "youtube","Website"].map((platform) => (
//   //             <input
//   //               key={platform}
//   //               name={platform}
//   //               placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
//   //               value={form.social_links?.[platform] || ""}
//   //               onChange={(e) =>
//   //                 setForm((prev) => ({
//   //                   ...prev,
//   //                   social_links: {
//   //                     ...prev.social_links,
//   //                     [platform]: e.target.value
//   //                   }
//   //                 }))
//   //               }
//   //               className="cf-social-input"
//   //               style={{
//   //                 marginBottom: "0.5rem",
//   //                 padding: "0.5rem 0.75rem",
//   //                 borderRadius: "0.5rem",
//   //                 border: "2px solid transparent",
//   //                 fontSize: "0.9rem"
//   //               }}
//   //             />
//   //           ))}
//   //         </div>

//   //         {error && <p className="cf-error cf-full">{error}</p>}

//   //         <button className="cf-btn cf-full" disabled={loading}>
//   //           {loading ? "Saving…" : "Update"}
//   //         </button>
//   //       </form>
//   //     </section>
//   //   );
//   // }



//   // src/pages/CommunityEdit.jsx
// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import * as commApi from "../api/community";
// import bgImg from "../assets/1.png";

// export default function CommunityEdit() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   // previews
//   const [previewLogo, setPreviewLogo] = useState("");
//   const [previewImage, setPreviewImage] = useState("");

//   // taxonomy
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   // form
//   const [form, setForm] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   /* ───────── load categories on mount ───────── */
//   useEffect(() => {
//     (async () => {
//       try {
//         const cats = await commApi.listCategories();
//         setCategories(cats || []);
//       } catch {}
//     })();
//   }, []);

//   /* ───────── fetch record ───────── */
//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await commApi.getCommunity(id);
//         // normalize social_links keys (lowercase) & previews
//         const sl = data?.social_links || {};
//         const social_links = {
//           instagram: sl.instagram || "",
//           facebook: sl.facebook || "",
//           x: sl.x || sl.twitter || "",
//           youtube: sl.youtube || "",
//           website: sl.website || sl.Website || "",
//         };
//         setForm({
//           id: data.id,
//           name: data.name || "",
//           category: data.category || "",
//           sub_category: data.sub_category || "",
//           contact: data.contact || "",
//           address: data.address || "",
//           email: data.email || "",
//           description: data.description || "",
//           in_charge: data.in_charge || "",
//           logo: data.logo || "",   // may be URL string
//           image: data.image || "", // may be URL string
//           reached_out: !!data.reached_out,
//           social_links,
//         });
//         if (typeof data.logo === "string") setPreviewLogo(data.logo);
//         if (typeof data.image === "string") setPreviewImage(data.image);
//       } catch {
//         setError("Unable to load community");
//       }
//     })();
//   }, [id]);

//   /* ───────── load sub-categories when category changes ───────── */
//   useEffect(() => {
//     if (!form?.category) return setSubCategories([]);
//     (async () => {
//       try {
//         const subs = await commApi.listSubCategories({ categoryName: form.category });
//         setSubCategories(subs || []);
//       } catch {
//         setSubCategories([]);
//       }
//     })();
//   }, [form?.category]);

//   /* ───────── handlers ───────── */
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: type === "checkbox" ? !!checked : value,
//       // clear sub-category when category changes
//       ...(name === "category" ? { sub_category: "" } : null),
//     }));
//   };

//   const handleSocialChange = (platform, value) =>
//     setForm(prev => ({
//       ...prev,
//       social_links: { ...prev.social_links, [platform]: value },
//     }));

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     const file = files?.[0];
//     if (!file) return;
//     const url = URL.createObjectURL(file);
//     if (name === "logo") setPreviewLogo(url);
//     if (name === "image") setPreviewImage(url);
//     setForm(prev => ({ ...prev, [name]: file }));
//   };

//   const handleUrlChange = (name, value) => {
//     if (name === "logo") setPreviewLogo(value || "");
//     if (name === "image") setPreviewImage(value || "");
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form) return;
//     setLoading(true);
//     setError("");
//     try {
//       // pass plain object; api will switch to multipart if it sees File
//       const payload = { ...form };
//       await commApi.updateCommunity(id, payload);
//       navigate("/communities");
//     } catch (err) {
//       setError(err?.response?.data?.error || "Update failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!form) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">Loading…</div>
//     );
//   }

//   /* ───────── UI ───────── */
//   return (
//     <section
//       className="cf-section"
//       style={{
//         backgroundImage: `url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
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
//           padding: 1rem;
//           font-family: "Merriweather", "Georgia", serif;
//         }
//         .cf-card {
//           width: 100%;
//           max-width: 24rem;
//           background: #94b7d261;
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
//         .cf-field { display: flex; flex-direction: column; gap: .25rem; font-size: .875rem; font-weight: 600; color: var(--royal-red); }
//         .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
//         .cf-field input, .cf-field textarea, .cf-field select {
//           background: #fff;
//           border: 2px solid transparent;
//           border-radius: .5rem;
//           padding: .5rem .75rem;
//           font-size: .9rem;
//           transition: border-color .2s, box-shadow .2s;
//         }
//         .cf-field input:focus, .cf-field textarea:focus, .cf-field select:focus {
//           border-color: var(--royal-gold);
//           outline: none;
//           box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
//         }
//         .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: .875rem; }
//         .cf-btn {
//           background: var(--heritage-red);
//           color: #fff;
//           border: none;
//           border-radius: .5rem;
//           padding: .6rem;
//           font-weight: 700;
//           cursor: pointer;
//           transition: background .15s;
//         }
//         .cf-btn:hover { background: var(--royal-red); }
//         .cf-btn:disabled { opacity: .6; cursor: default; }
//         .cf-actions { display:flex; gap:.5rem; }
//         .cf-btn.secondary { background: #fff; color: var(--heritage-red); border: 1px solid var(--heritage-red); }
//         .cf-btn.secondary:hover { background: #ffe6ea; }

//         @media (min-width: 640px) {
//           .cf-card { max-width: 44rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
//           .cf-title { grid-column: span 2; font-size: 2.25rem; }
//           .cf-full { grid-column: span 2; }
//         }
//       `}</style>

//       <form className="cf-card" onSubmit={handleSubmit}>
//         <h2 className="cf-title">Edit Community</h2>

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
//               <option value="">
//                 {form.category ? "Select sub-category…" : "Choose category first"}
//               </option>
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
//             <input type="email" name="email" value={form.email} onChange={handleChange} required />
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
//               value={form.social_links?.[p] || ""}
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
//           {previewLogo && <img src={previewLogo} alt="logo preview" style={{ maxWidth: 120, marginTop: 6 }} />}
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
//           {previewImage && <img src={previewImage} alt="banner preview" style={{ maxWidth: 180, marginTop: 6 }} />}
//         </div>

//         {/* Reached Out */}
//         <label className="cf-field cf-full" style={{ flexDirection: "row", alignItems: "center", gap: ".6rem" }}>
//           <input
//             type="checkbox"
//             name="reached_out"
//             checked={!!form.reached_out}
//             onChange={handleChange}
//           />
//           Mark as reached
//         </label>

//         {error && <p className="cf-error cf-full">{error}</p>}

//         <div className="cf-actions cf-full">
//           <button type="button" className="cf-btn secondary" onClick={() => navigate(-1)}>
//             Cancel
//           </button>
//           <button className="cf-btn" disabled={loading}>
//             {loading ? "Saving…" : "Update"}
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }



// src/pages/CommunityEdit.jsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as commApi from "../api/community";
import bgImg from "../assets/1.png";

const ADD_NEW_SUB = "__other_sub__"; // sentinel for “Other (add new)…”

export default function CommunityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  // previews
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // taxonomy
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  // inline new sub-category UI
  const [showAddSub, setShowAddSub] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [creatingSub, setCreatingSub] = useState(false);

  // form
  const [form, setForm] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const selectedCategory = useMemo(
    () => (form && categories.length ? categories.find(c => c.name === form.category) || null : null),
    [categories, form]
  );

  /* ───────── load categories on mount ───────── */
  useEffect(() => {
    (async () => {
      try {
        const cats = await commApi.listCategories();
        setCategories(cats || []);
      } catch {
        setCategories([]);
      }
    })();
  }, []);

  /* ───────── fetch record ───────── */
  useEffect(() => {
    (async () => {
      try {
        const data = await commApi.getCommunity(id);
        const sl = data?.social_links || {};
        const social_links = {
          instagram: sl.instagram || "",
          facebook: sl.facebook || "",
          x: sl.x || sl.twitter || "",
          youtube: sl.youtube || "",
          website: sl.website || sl.Website || "",
        };
        setForm({
          id: data.id,
          name: data.name || "",
          category: data.category || "",
          sub_category: data.sub_category || "",
          contact: data.contact || "",
          address: data.address || "",
          email: data.email || "",
          description: data.description || "",
          in_charge: data.in_charge || "",
          logo: data.logo || "",
          image: data.image || "",
          reached_out: !!(data.reached_out ?? data.reachedOut),
          social_links,
        });
        if (typeof data.logo === "string") setPreviewLogo(data.logo);
        if (typeof data.image === "string") setPreviewImage(data.image);
      } catch {
        setError("Unable to load community");
      }
    })();
  }, [id]);

  /* ───────── load sub-categories when category changes ───────── */
  useEffect(() => {
    if (!form?.category) {
      setSubCategories([]);
      setShowAddSub(false);
      setNewSubName("");
      return;
    }
    (async () => {
      try {
        const subs = await commApi.listSubCategories({
          categoryName: form.category,
          parentId: selectedCategory?.id, // use id if API supports
        });
        const arr = Array.isArray(subs) ? subs : [];
        // If existing value isn't in the returned list, keep it visible
        if (form.sub_category && !arr.some(s => s.name === form.sub_category)) {
          setSubCategories([{ id: "__existing__", name: form.sub_category }, ...arr]);
        } else {
          setSubCategories(arr);
        }
      } catch {
        setSubCategories([]);
      }
    })();
  }, [form?.category, form?.sub_category, selectedCategory?.id]);

  /* ───────── handlers ───────── */
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "reached_out") {
      setForm(prev => ({ ...prev, reached_out: !!checked }));
      return;
    }

    if (name === "category") {
      // clear sub-category & inline UI when category changes
      setForm(prev => ({ ...prev, category: value, sub_category: "" }));
      setShowAddSub(false);
      setNewSubName("");
      return;
    }

    if (name === "sub_category") {
      if (value === ADD_NEW_SUB) {
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    if (name === "logo") setPreviewLogo(url);
    if (name === "image") setPreviewImage(url);
    setForm(prev => ({ ...prev, [name]: file }));
  };

  const handleUrlChange = (name, value) => {
    if (name === "logo") setPreviewLogo(value || "");
    if (name === "image") setPreviewImage(value || "");
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // inline create sub-category under selected category
  const addNewSubCategory = async (e) => {
    e.preventDefault();
    if (!selectedCategory?.id) {
      alert("Select a category first.");
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
      const arr = Array.isArray(subs) ? subs : [];
      setSubCategories(arr);

      // select the new one by NAME (your form stores names)
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError("");
    try {
      await commApi.updateCommunity(id, form);
      navigate("/communities");
    } catch (err) {
      setError(err?.response?.data?.error || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (!form) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading…</div>
    );
  }

  /* ───────── UI ───────── */
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
          padding: 1rem;
          font-family: "Merriweather", "Georgia", serif;
        }
        .cf-card {
          width: 100%;
          max-width: 24rem;
          background: #94b7d261;
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
        .cf-field { display: flex; flex-direction: column; gap: .25rem; font-size: .875rem; font-weight: 600; color: var(--royal-red); }
        .cf-row { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; }
        .cf-field input, .cf-field textarea, .cf-field select {
          background: #fff;
          border: 2px solid transparent;
          border-radius: .5rem;
          padding: .5rem .75rem;
          font-size: .9rem;
          transition: border-color .2s, box-shadow .2s;
        }
        .cf-field input:focus, .cf-field textarea:focus, .cf-field select:focus {
          border-color: var(--royal-gold);
          outline: none;
          box-shadow: 0 0 0 3px rgba(210,168,87,0.35);
        }
        .cf-error { color: #b91c1c; text-align: center; font-weight: 600; font-size: .875rem; }
        .cf-btn {
          background: var(--heritage-red);
          color: #fff;
          border: none;
          border-radius: .5rem;
          padding: .6rem;
          font-weight: 700;
          cursor: pointer;
          transition: background .15s;
        }
        .cf-btn:hover { background: var(--royal-red); }
        .cf-btn:disabled { opacity: .6; cursor: default; }
        .cf-actions { display:flex; gap:.5rem; }
        .cf-btn.secondary { background: #fff; color: var(--heritage-red); border: 1px solid var(--heritage-red); }
        .cf-btn.secondary:hover { background: #ffe6ea; }

        @media (min-width: 640px) {
          .cf-card { max-width: 44rem; padding: 2rem 1.75rem; grid-template-columns: repeat(2, 1fr); }
          .cf-title { grid-column: span 2; font-size: 2.25rem; }
          .cf-full { grid-column: span 2; }
        }

        .cf-inline-row { display: flex; gap: .5rem; align-items: center; margin-top: .5rem; }
        .cf-btn-ghost { padding: .6rem; border-radius: .5rem; border: 1px solid #ddd; background: #f7f7f7; cursor: pointer; }
      `}</style>

      <form className="cf-card" onSubmit={handleSubmit}>
        <h2 className="cf-title">Edit Community</h2>

        {/* Name */}
        <label className="cf-field cf-full">
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>

        {/* Category / Sub-category */}
        <div className="cf-row cf-full">
          <label className="cf-field">
            Category
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
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
              <option value="">
                {form.category ? "Select sub-category…" : "Choose category first"}
              </option>
              {subCategories.map(sc => (
                <option key={sc.id} value={sc.name}>{sc.name}</option>
              ))}
              {form.category && <option value={ADD_NEW_SUB}>Other (add new)…</option>}
            </select>

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
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
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
          <textarea
            name="description"
            rows={3}
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>

        {/* Social links */}
        <div className="cf-field cf-full">
          <label>Social Links</label>
          {["instagram","facebook","x","youtube","website"].map(p => (
            <input
              key={p}
              placeholder={`${p.charAt(0).toUpperCase() + p.slice(1)} URL`}
              value={form.social_links?.[p] || ""}
              onChange={e => handleSocialChange(p, e.target.value)}
            />
          ))}
        </div>

        {/* Logo: URL or File */}
        <div className="cf-field cf-full">
          <label>Logo (upload or paste URL)</label>
          <input
            type="text"
            placeholder="https://…logo.png"
            value={typeof form.logo === "string" ? form.logo : ""}
            onChange={e => handleUrlChange("logo", e.target.value)}
          />
          <input type="file" name="logo" accept="image/*" onChange={handleFileChange} />
          {previewLogo && <img src={previewLogo} alt="logo preview" style={{ maxWidth: 120, marginTop: 6 }} />}
        </div>

        {/* Banner: URL or File */}
        <div className="cf-field cf-full">
          <label>Banner (upload or paste URL)</label>
          <input
            type="text"
            placeholder="https://…banner.jpg"
            value={typeof form.image === "string" ? form.image : ""}
            onChange={e => handleUrlChange("image", e.target.value)}
          />
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          {previewImage && <img src={previewImage} alt="banner preview" style={{ maxWidth: 180, marginTop: 6 }} />}
        </div>

        {/* Reached Out */}
        <label className="cf-field cf-full" style={{ flexDirection: "row", alignItems: "center", gap: ".6rem" }}>
          <input
            type="checkbox"
            name="reached_out"
            checked={!!form.reached_out}
            onChange={handleChange}
          />
          Mark as reached
        </label>

        {error && <p className="cf-error cf-full">{error}</p>}

        <div className="cf-actions cf-full">
          <button type="button" className="cf-btn secondary" onClick={() => navigate(-1)}>
            Cancel
          </button>
          <button className="cf-btn" disabled={saving}>
            {saving ? "Saving…" : "Update"}
          </button>
        </div>
      </form>
    </section>
  );
}
