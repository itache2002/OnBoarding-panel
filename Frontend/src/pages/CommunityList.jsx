


// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import * as commApi from "../api/community";
// // import bgImg from "../assets/1.png";

// // export default function CommunityList() {
// //   const [rows, setRows] = useState([]);
// //   const navigate = useNavigate();

// //   /* ─── fetch once ─── */
// //   useEffect(() => {
// //     commApi.listCommunities().then(setRows);
// //   }, []);

// //   /* ─── helpers ─── */
// //   const handleEdit = id => navigate(`/community/${id}/edit`);

// //   const handleDelete = async id => {
// //     if (!window.confirm("Delete this community?")) return;
// //     try {
// //       await commApi.deleteCommunity(id);
// //       setRows(prev => prev.filter(r => r.id !== id));
// //     } catch (err) {
// //       alert(err?.response?.data?.error || "Delete failed");
// //     }
// //   };

// //   const handleAdd = () => navigate("/community/new");

// //   /* ─── render ─── */
// //   return (
// //     <section className="cl-section">
// //       <style>{`
// //         :root {
// //           --royal-red: #7A133D;
// //           --heritage-red: #C62039;
// //           --royal-gold: #D2A857;
// //           --royal-cream: #FFF9F2;
// //           --sage: #8BBAA1;
// //           --teal: #056675;
// //         }
// //         .cl-section {
// //           min-height: 100vh;
// //           display: flex;
// //           flex-direction: column;
// //           align-items: center;
// //           background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%);
// //           background-size: cover;
// //           background-position: center;
// //           font-family: "Merriweather", "Georgia", serif;
// //           padding: 1rem;
// //         }
// //         .cl-card { width: 100%; max-width: 36rem; background: #8da4cc7a; border-radius: 1.25rem; box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 1.5rem 1rem; }
// //         .cl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
// //         .cl-title { color: var(--heritage-red); font-size: 1.75rem; font-weight: 900; }
// //         .add-btn { background: var(--royal-gold); color: #fff; border: none; border-radius: 0.5rem; padding: 0.4rem 0.9rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
// //         .add-btn:hover { background: #b99143; }
// //         .cl-table-wrapper { overflow-x: auto; }
// //         table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
// //         thead th { background: var(--royal-gold); color: #fff; padding: 0.55rem; text-align: left; }
// //         tbody td { padding: 0.55rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
// //         tbody tr:nth-child(even) { background: #fafafa; }
// //         .cl-actions { display: flex; gap: 0.5rem; }
// //         .cl-btn { border: none; border-radius: 0.35rem; padding: 0.25rem 0.5rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
// //         .cl-btn.edit { background: var(--royal-gold); color: #fff; }
// //         .cl-btn.edit:hover { background: #b99143; }
// //         .cl-btn.delete { background: var(--heritage-red); color: #fff; }
// //         .cl-btn.delete:hover { background: var(--royal-red); }
// //         @media (min-width: 640px) { .cl-card { max-width: 48rem; padding: 2rem 1.5rem; } .cl-title { font-size: 2.25rem; } }
// //       `}</style>

// //       <div className="cl-card">
// //         <div className="cl-header">
// //           <h2 className="cl-title">Communities</h2>
// //           <button className="add-btn" onClick={handleAdd}>+ Add New</button>
// //         </div>

// //         <div className="cl-table-wrapper">
// //           <table>
// //             <thead>
// //               <tr>
// //                 <th>Name</th>
// //                 <th>Category</th>
// //                 <th style={{ width: "110px" }}>Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {rows.map(r => (
// //                 <tr key={r.id}>
// //                   <td>{r.name}</td>
// //                   <td>{r.category}</td>
// //                   <td>
// //                     <div className="cl-actions">
// //                       <button className="cl-btn edit"   onClick={() => handleEdit(r.id)}>Edit</button>
// //                       <button className="cl-btn delete" onClick={() => handleDelete(r.id)}>Del</button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //               {rows.length === 0 && (
// //                 <tr>
// //                   <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
// //                     No communities found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }



// // src/pages/CommunityList.jsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as commApi from "../api/community"; // ensure this exports the helpers from earlier
// import bgImg from "../assets/1.png";

// /* simple debounce hook */
// function useDebouncedValue(value, delay = 300) {
//   const [v, setV] = useState(value);
//   useEffect(() => {
//     const t = setTimeout(() => setV(value), delay);
//     return () => clearTimeout(t);
//   }, [value, delay]);
//   return v;
// }

// export default function CommunityList() {
//   const [rows, setRows] = useState([]);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [errMsg, setErrMsg] = useState("");

//   // taxonomy for filters
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   // filters, sort, pagination
//   const [q, setQ] = useState("");
//   const qDebounced = useDebouncedValue(q, 350);

//   const [category, setCategory] = useState("");
//   const [subCategory, setSubCategory] = useState("");
//   const [reachedOut, setReachedOut] = useState(""); // '', 'true', 'false'
//   const [createdFrom, setCreatedFrom] = useState("");
//   const [createdTo, setCreatedTo] = useState("");

//   const [sortBy, setSortBy] = useState("created_at");
//   const [order, setOrder] = useState("desc");

//   const [limit, setLimit] = useState(10);
//   const [page, setPage] = useState(1); // 1-indexed

//   const navigate = useNavigate();
//   const mounted = useRef(false);

//   /* ─── fetch categories on mount ─── */
//   useEffect(() => {
//     mounted.current = true;
//     (async () => {
//       try {
//         const cats = await commApi.listCategories();
//         setCategories(cats);
//       } catch (e) {
//         // non-fatal
//       }
//     })();
//     return () => { mounted.current = false; };
//   }, []);

//   /* ─── fetch sub-categories when category changes ─── */
//   useEffect(() => {
//     setSubCategory(""); // reset chosen sub-cat when category changes
//     if (!category) { setSubCategories([]); return; }

//     (async () => {
//       try {
//         const subs = await commApi.listSubCategories({ categoryName: category });
//         setSubCategories(subs);
//       } catch (e) {
//         setSubCategories([]);
//       }
//     })();
//   }, [category]);

//   /* ─── build query object for API ─── */
//   const query = useMemo(() => {
//     const obj = {
//       q: qDebounced || undefined,
//       category: category || undefined,
//       subCategory: subCategory || undefined,
//       createdFrom: createdFrom || undefined,
//       createdTo: createdTo || undefined,
//       sortBy,
//       order,
//       limit,
//       offset: (page - 1) * limit,
//       paged: true
//     };
//     if (reachedOut === "true") obj.reachedOut = true;
//     if (reachedOut === "false") obj.reachedOut = false;
//     return obj;
//   }, [qDebounced, category, subCategory, reachedOut, createdFrom, createdTo, sortBy, order, limit, page]);

//   /* ─── fetch list whenever query changes ─── */
//   useEffect(() => {
//     (async () => {
//       setLoading(true); setErrMsg("");
//       try {
//         const { rows, total, limit: lim, offset } = await commApi.listCommunitiesPaged(query);
//         if (!mounted.current) return;
//         setRows(rows);
//         setTotal(total ?? rows.length);
//         // adjust page if offset comes weird
//         if (lim !== limit) setLimit(lim);
//       } catch (e) {
//         if (!mounted.current) return;
//         setErrMsg(e?.response?.data?.error || "Failed to load communities");
//       } finally {
//         if (mounted.current) setLoading(false);
//       }
//     })();
//   }, [query]); // eslint-disable-line

//   /* ─── helpers ─── */
//   const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

//   const handleEdit = id => navigate(`/community/${id}/edit`);

//   const handleDelete = async id => {
//     if (!window.confirm("Delete this community?")) return;
//     try {
//       await commApi.deleteCommunity(id);
//       setRows(prev => prev.filter(r => r.id !== id));
//       setTotal(t => Math.max(0, t - 1));
//     } catch (err) {
//       alert(err?.response?.data?.error || "Delete failed");
//     }
//   };

//   const handleAdd = () => navigate("/community/new");

//   const toggleReached = async (id, current) => {
//     // optimistic UI
//     setRows(prev => prev.map(r => (r.id === id ? { ...r, reached_out: !current } : r)));
//     try {
//       await commApi.setReachedOut(id, !current);
//     } catch (e) {
//       // revert if failed
//       setRows(prev => prev.map(r => (r.id === id ? { ...r, reached_out: current } : r)));
//       alert(e?.response?.data?.error || "Failed to update");
//     }
//   };

//   const setSort = (col) => {
//     if (sortBy === col) {
//       setOrder(o => (o === "asc" ? "desc" : "asc"));
//     } else {
//       setSortBy(col);
//       setOrder("asc");
//     }
//   };

//   const resetFilters = () => {
//     setQ("");
//     setCategory("");
//     setSubCategory("");
//     setReachedOut("");
//     setCreatedFrom("");
//     setCreatedTo("");
//     setSortBy("created_at");
//     setOrder("desc");
//     setLimit(10);
//     setPage(1);
//   };

//   /* ─── render ─── */
//   return (
//     <section className="cl-section">
//       <style>{`
//         :root {
//           --royal-red: #7A133D;
//           --heritage-red: #C62039;
//           --royal-gold: #D2A857;
//           --royal-cream: #FFF9F2;
//           --sage: #8BBAA1;
//           --teal: #056675;
//         }
//         .cl-section {
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%);
//           background-size: cover;
//           background-position: center;
//           font-family: "Merriweather", "Georgia", serif;
//           padding: 1rem;
//         }
//         .cl-card { width: 100%; max-width: 72rem; background: #8da4cc7a; border-radius: 1.25rem; box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 1.5rem 1rem; }
//         .cl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap; }
//         .cl-title { color: var(--heritage-red); font-size: 1.75rem; font-weight: 900; }
//         .add-btn { background: var(--royal-gold); color: #fff; border: none; border-radius: 0.5rem; padding: 0.45rem 0.9rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
//         .add-btn:hover { background: #b99143; }

//         .filters { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: .5rem; margin-bottom: 1rem; }
//         .filters .full { grid-column: 1 / -1; }
//         .filters input, .filters select { width: 100%; padding: .45rem .55rem; border: 1px solid rgba(0,0,0,0.15); border-radius: .5rem; font-size: .9rem; }
//         .filters .reset { background: #fff; border: 1px solid var(--heritage-red); color: var(--heritage-red); border-radius: .5rem; padding: .45rem .6rem; font-weight: 700; cursor: pointer; }
//         .filters .reset:hover { background: #ffe6ea; }

//         .cl-table-wrapper { overflow-x: auto; }
//         table { width: 100%; border-collapse: collapse; font-size: 0.9rem; background: #fff; border-radius: .75rem; overflow: hidden; }
//         thead th { background: var(--royal-gold); color: #fff; padding: 0.55rem; text-align: left; user-select: none; white-space: nowrap; }
//         thead th.sortable { cursor: pointer; }
//         tbody td { padding: 0.55rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
//         tbody tr:nth-child(even) { background: #fafafa; }

//         .cl-actions { display: flex; gap: 0.5rem; }
//         .cl-btn { border: none; border-radius: 0.35rem; padding: 0.25rem 0.5rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
//         .cl-btn.edit { background: var(--royal-gold); color: #fff; }
//         .cl-btn.edit:hover { background: #b99143; }
//         .cl-btn.delete { background: var(--heritage-red); color: #fff; }
//         .cl-btn.delete:hover { background: var(--royal-red); }

//         .pill { display: inline-flex; align-items: center; gap: .35rem; border-radius: 999px; padding: .2rem .6rem; font-size: .78rem; font-weight: 700; }
//         .pill.ok { background: #e6f7ec; color: #1e8e3e; border: 1px solid #b7e2c2; }
//         .pill.no { background: #fff2f2; color: #c62828; border: 1px solid #ffcccc; }

//         .pager { display: flex; align-items: center; justify-content: space-between; margin-top: .75rem; gap: .75rem; flex-wrap: wrap; }
//         .pager .info { font-size: .9rem; }
//         .pager .controls { display: flex; gap: .4rem; }
//         .pager button { border: 1px solid rgba(0,0,0,0.2); background: #fff; padding: .35rem .6rem; border-radius: .4rem; cursor: pointer; }
//         .pager button:disabled { opacity: .5; cursor: not-allowed; }
//         .pager select { padding: .3rem .5rem; border-radius: .4rem; }

//         .err { color: #b3261e; background: #fdecea; border: 1px solid #f5c2c0; padding: .5rem .75rem; border-radius: .5rem; margin-bottom: .75rem; }
//         .loading { font-size: .95rem; opacity: .8; padding: .25rem 0; }
//         @media (max-width: 920px) {
//           .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); }
//         }
//         @media (min-width: 640px) {
//           .cl-card { padding: 2rem 1.5rem; }
//           .cl-title { font-size: 2.25rem; }
//         }
//       `}</style>

//       <div className="cl-card">
//         <div className="cl-header">
//           <h2 className="cl-title">Communities</h2>
//           <button className="add-btn" onClick={handleAdd}>+ Add New</button>
//         </div>

//         {/* Filters */}
//         <div className="filters">
//           <input
//             className="full"
//             type="search"
//             placeholder="Search name, description, address, email, in-charge…"
//             value={q}
//             onChange={e => { setQ(e.target.value); setPage(1); }}
//             aria-label="Search"
//           />

//           <select
//             value={category}
//             onChange={e => { setCategory(e.target.value); setPage(1); }}
//             aria-label="Category"
//           >
//             <option value="">All Categories</option>
//             {categories.map(c => (
//               <option key={c.id} value={c.name}>{c.name}</option>
//             ))}
//           </select>

//           <select
//             value={subCategory}
//             onChange={e => { setSubCategory(e.target.value); setPage(1); }}
//             aria-label="Sub Category"
//             disabled={!category}
//           >
//             <option value="">{category ? "All Sub-categories" : "Choose category first"}</option>
//             {subCategories.map(sc => (
//               <option key={sc.id} value={sc.name}>{sc.name}</option>
//             ))}
//           </select>

//           <select
//             value={reachedOut}
//             onChange={e => { setReachedOut(e.target.value); setPage(1); }}
//             aria-label="Reached Out"
//           >
//             <option value="">All</option>
//             <option value="true">Reached</option>
//             <option value="false">Not reached</option>
//           </select>

//           <input
//             type="date"
//             value={createdFrom}
//             onChange={e => { setCreatedFrom(e.target.value); setPage(1); }}
//             aria-label="Created From"
//           />
//           <input
//             type="date"
//             value={createdTo}
//             onChange={e => { setCreatedTo(e.target.value); setPage(1); }}
//             aria-label="Created To"
//           />

//           <button className="reset" onClick={resetFilters}>Reset</button>
//         </div>

//         {errMsg && <div className="err">{errMsg}</div>}
//         {loading && <div className="loading">Loading…</div>}

//         <div className="cl-table-wrapper">
//           <table>
//             <thead>
//               <tr>
//                 <th className="sortable" onClick={() => setSort("name")}>
//                   Name {sortBy === "name" ? (order === "asc" ? "▲" : "▼") : ""}
//                 </th>
//                 <th className="sortable" onClick={() => setSort("category")}>
//                   Category {sortBy === "category" ? (order === "asc" ? "▲" : "▼") : ""}
//                 </th>
//                 <th>Sub-category</th>
//                 <th className="sortable" onClick={() => setSort("reached_out")}>
//                   Reached {sortBy === "reached_out" ? (order === "asc" ? "▲" : "▼") : ""}
//                 </th>
//                 <th className="sortable" onClick={() => setSort("created_at")}>
//                   Created {sortBy === "created_at" ? (order === "asc" ? "▲" : "▼") : ""}
//                 </th>
//                 <th style={{ width: "140px" }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {rows.map(r => (
//                 <tr key={r.id}>
//                   <td>{r.name}</td>
//                   <td>{r.category}</td>
//                   <td>{r.sub_category}</td>
//                   <td>
//                     <button
//                       className={`pill ${r.reached_out ? "ok" : "no"}`}
//                       onClick={() => toggleReached(r.id, r.reached_out)}
//                       title="Toggle reached-out"
//                     >
//                       {r.reached_out ? "Reached" : "Not reached"}
//                     </button>
//                   </td>
//                   <td>{new Date(r.created_at).toLocaleString()}</td>
//                   <td>
//                     <div className="cl-actions">
//                       <button className="cl-btn edit"   onClick={() => handleEdit(r.id)}>Edit</button>
//                       <button className="cl-btn delete" onClick={() => handleDelete(r.id)}>Del</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//               {rows.length === 0 && !loading && (
//                 <tr>
//                   <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
//                     No communities found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="pager">
//           <div className="info">
//             {total > 0
//               ? <>Showing <b>{(page - 1) * limit + 1}</b>–<b>{Math.min(page * limit, total)}</b> of <b>{total}</b></>
//               : "No results"}
//           </div>
//           <div className="controls">
//             <button onClick={() => setPage(1)} disabled={page <= 1}>⏮ First</button>
//             <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>◀ Prev</button>
//             <span style={{ padding: ".35rem .6rem" }}>Page {page} / {totalPages}</span>
//             <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>Next ▶</button>
//             <button onClick={() => setPage(totalPages)} disabled={page >= totalPages}>Last ⏭</button>
//             <select
//               value={limit}
//               onChange={e => { setLimit(parseInt(e.target.value, 10) || 10); setPage(1); }}
//               title="Rows per page"
//             >
//               {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}/page</option>)}
//             </select>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }



// src/pages/CommunityList.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as commApi from "../api/community";
import bgImg from "../assets/1.png";

function useDebouncedValue(value, delay = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

export default function CommunityList() {
  const [rows, setRows] = useState([]);            // always an array
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const [categories, setCategories] = useState([]);     // arrays
  const [subCategories, setSubCategories] = useState([]);

  const [q, setQ] = useState("");
  const qDebounced = useDebouncedValue(q, 350);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [reachedOut, setReachedOut] = useState(""); // '', 'true', 'false'
  const [createdFrom, setCreatedFrom] = useState("");
  const [createdTo, setCreatedTo] = useState("");

  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
    (async () => {
      try {
        const cats = await commApi.listCategories();
        setCategories(Array.isArray(cats) ? cats : []);
      } catch {
        setCategories([]);
      }
    })();
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    setSubCategory("");
    if (!category) { setSubCategories([]); return; }
    (async () => {
      try {
        const subs = await commApi.listSubCategories({ categoryName: category });
        setSubCategories(Array.isArray(subs) ? subs : []);
      } catch {
        setSubCategories([]);
      }
    })();
  }, [category]);

  const query = useMemo(() => {
    const obj = {
      q: qDebounced || undefined,
      category: category || undefined,
      subCategory: subCategory || undefined,
      createdFrom: createdFrom || undefined,
      createdTo: createdTo || undefined,
      sortBy,
      order,
      limit,
      offset: (page - 1) * limit,
      paged: true
    };
    if (reachedOut === "true") obj.reachedOut = true;
    if (reachedOut === "false") obj.reachedOut = false;
    return obj;
  }, [qDebounced, category, subCategory, reachedOut, createdFrom, createdTo, sortBy, order, limit, page]);

  useEffect(() => {
    (async () => {
      setLoading(true); setErrMsg("");
      try {
        const resp = await commApi.listCommunitiesPaged(query);
        if (!mounted.current) return;
        const arr = Array.isArray(resp) ? resp : (resp?.rows ?? []);
        setRows(Array.isArray(arr) ? arr : []);
        setTotal(Number(resp?.total ?? arr.length) || 0);
        const lim = Number(resp?.limit) || limit;
        if (lim !== limit) setLimit(lim);
      } catch (e) {
        if (!mounted.current) return;
        setErrMsg(e?.response?.data?.error || "Failed to load communities");
        setRows([]);
        setTotal(0);
      } finally {
        if (mounted.current) setLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(total / Math.max(1, limit)));

  const handleEdit = id => navigate(`/community/${id}/edit`);

  const handleDelete = async id => {
    if (!window.confirm("Delete this community?")) return;
    try {
      await commApi.deleteCommunity(id);
      setRows(prev => prev.filter(r => r.id !== id));
      setTotal(t => Math.max(0, t - 1));
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  const handleAdd = () => navigate("/community/new");

  const toggleReached = async (id, current) => {
    setRows(prev => prev.map(r => (r.id === id ? { ...r, reached_out: !current } : r)));
    try {
      await commApi.setReachedOut(id, !current);
    } catch (e) {
      setRows(prev => prev.map(r => (r.id === id ? { ...r, reached_out: current } : r)));
      alert(e?.response?.data?.error || "Failed to update");
    }
  };

  const setSort = (col) => {
    if (sortBy === col) setOrder(o => (o === "asc" ? "desc" : "asc"));
    else { setSortBy(col); setOrder("asc"); }
  };

  const resetFilters = () => {
    setQ(""); setCategory(""); setSubCategory(""); setReachedOut("");
    setCreatedFrom(""); setCreatedTo("");
    setSortBy("created_at"); setOrder("desc");
    setLimit(10); setPage(1);
  };

  return (
    <section className="cl-section">
      <style>{`
        :root {
          --royal-red: #7A133D;
          --heritage-red: #C62039;
          --royal-gold: #D2A857;
          --royal-cream: #FFF9F2;
          --sage: #8BBAA1;
          --teal: #056675;
        }
        .cl-section {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: url(${bgImg}), linear-gradient(135deg, rgba(210,168,87,0.7) 0%, rgba(139,186,161,0.7) 35%, rgba(5,102,117,0.7) 100%);
          background-size: cover;
          background-position: center;
          font-family: "Merriweather", "Georgia", serif;
          padding: 1rem;
        }
        .cl-card { width: 100%; max-width: 72rem; background: #8da4cc7a; border-radius: 1.25rem; box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 1.5rem 1rem; }
        .cl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; gap: 1rem; flex-wrap: wrap; }
        .cl-title { color: var(--heritage-red); font-size: 1.75rem; font-weight: 900; }
        .add-btn { background: var(--royal-gold); color: #fff; border: none; border-radius: 0.5rem; padding: 0.45rem 0.9rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .add-btn:hover { background: #b99143; }

        .filters { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: .5rem; margin-bottom: 1rem; }
        .filters .full { grid-column: 1 / -1; }
        .filters input, .filters select { width: 100%; padding: .45rem .55rem; border: 1px solid rgba(0,0,0,0.15); border-radius: .5rem; font-size: .9rem; }
        .filters .reset { background: #fff; border: 1px solid var(--heritage-red); color: var(--heritage-red); border-radius: .5rem; padding: .45rem .6rem; font-weight: 700; cursor: pointer; }
        .filters .reset:hover { background: #ffe6ea; }

        .cl-table-wrapper { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 0.9rem; background: #fff; border-radius: .75rem; overflow: hidden; }
        thead th { background: var(--royal-gold); color: #fff; padding: 0.55rem; text-align: left; user-select: none; white-space: nowrap; }
        thead th.sortable { cursor: pointer; }
        tbody td { padding: 0.55rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        tbody tr:nth-child(even) { background: #fafafa; }

        .cl-actions { display: flex; gap: 0.5rem; }
        .cl-btn { border: none; border-radius: 0.35rem; padding: 0.25rem 0.5rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .cl-btn.edit { background: var(--royal-gold); color: #fff; }
        .cl-btn.edit:hover { background: #b99143; }
        .cl-btn.delete { background: var(--heritage-red); color: #fff; }
        .cl-btn.delete:hover { background: var(--royal-red); }

        .pill { display: inline-flex; align-items: center; gap: .35rem; border-radius: 999px; padding: .2rem .6rem; font-size: .78rem; font-weight: 700; }
        .pill.ok { background: #e6f7ec; color: #1e8e3e; border: 1px solid #b7e2c2; }
        .pill.no { background: #fff2f2; color: #c62828; border: 1px solid #ffcccc; }

        .pager { display: flex; align-items: center; justify-content: space-between; margin-top: .75rem; gap: .75rem; flex-wrap: wrap; }
        .pager .info { font-size: .9rem; }
        .pager .controls { display: flex; gap: .4rem; }
        .pager button { border: 1px solid rgba(0,0,0,0.2); background: #fff; padding: .35rem .6rem; border-radius: .4rem; cursor: pointer; }
        .pager button:disabled { opacity: .5; cursor: not-allowed; }
        .pager select { padding: .3rem .5rem; border-radius: .4rem; }

        .err { color: #b3261e; background: #fdecea; border: 1px solid #f5c2c0; padding: .5rem .75rem; border-radius: .5rem; margin-bottom: .75rem; }
        .loading { font-size: .95rem; opacity: .8; padding: .25rem 0; }
        @media (max-width: 920px) { .filters { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (min-width: 640px) { .cl-card { padding: 2rem 1.5rem; } .cl-title { font-size: 2.25rem; } }
      `}</style>

      <div className="cl-card">
        <div className="cl-header">
          <h2 className="cl-title">Communities</h2>
          <button className="add-btn" onClick={handleAdd}>+ Add New</button>
        </div>

        {/* Filters */}
        <div className="filters">
          <input
            className="full"
            type="search"
            placeholder="Search name, description, address, email, in-charge…"
            value={q}
            onChange={e => { setQ(e.target.value); setPage(1); }}
            aria-label="Search"
          />

          <select
            value={category}
            onChange={e => { setCategory(e.target.value); setPage(1); }}
            aria-label="Category"
          >
            <option value="">All Categories</option>
            {(categories ?? []).map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>

          <select
            value={subCategory}
            onChange={e => { setSubCategory(e.target.value); setPage(1); }}
            aria-label="Sub Category"
            disabled={!category}
          >
            <option value="">{category ? "All Sub-categories" : "Choose category first"}</option>
            {(subCategories ?? []).map(sc => (
              <option key={sc.id} value={sc.name}>{sc.name}</option>
            ))}
          </select>

          <select
            value={reachedOut}
            onChange={e => { setReachedOut(e.target.value); setPage(1); }}
            aria-label="Reached Out"
          >
            <option value="">All</option>
            <option value="true">Reached</option>
            <option value="false">Not reached</option>
          </select>

          <input type="date" value={createdFrom} onChange={e => { setCreatedFrom(e.target.value); setPage(1); }} aria-label="Created From" />
          <input type="date" value={createdTo}   onChange={e => { setCreatedTo(e.target.value);   setPage(1); }} aria-label="Created To" />

          <button className="reset" onClick={resetFilters}>Reset</button>
        </div>

        {errMsg && <div className="err">{errMsg}</div>}
        {loading && <div className="loading">Loading…</div>}

        <div className="cl-table-wrapper">
          <table>
            <thead>
              <tr>
                <th className="sortable" onClick={() => setSort("name")}>
                  Name {sortBy === "name" ? (order === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="sortable" onClick={() => setSort("category")}>
                  Category {sortBy === "category" ? (order === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Sub-category</th>
                <th className="sortable" onClick={() => setSort("reached_out")}>
                  Reached {sortBy === "reached_out" ? (order === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="sortable" onClick={() => setSort("created_at")}>
                  Created {sortBy === "created_at" ? (order === "asc" ? "▲" : "▼") : ""}
                </th>
                <th style={{ width: "140px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).map(r => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.category}</td>
                  <td>{r.sub_category}</td>
                  <td>
                    <button
                      className={`pill ${r.reached_out ? "ok" : "no"}`}
                      onClick={() => toggleReached(r.id, r.reached_out)}
                      title="Toggle reached-out"
                    >
                      {r.reached_out ? "Reached" : "Not reached"}
                    </button>
                  </td>
                  <td>{r.created_at ? new Date(r.created_at).toLocaleString() : "-"}</td>
                  <td>
                    <div className="cl-actions">
                      <button className="cl-btn edit"   onClick={() => handleEdit(r.id)}>Edit</button>
                      <button className="cl-btn delete" onClick={() => handleDelete(r.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
              {(rows ?? []).length === 0 && !loading && (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center", padding: "1rem" }}>
                    No communities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="pager">
          <div className="info">
            {total > 0
              ? <>Showing <b>{(page - 1) * limit + 1}</b>–<b>{Math.min(page * limit, total)}</b> of <b>{total}</b></>
              : "No results"}
          </div>
          <div className="controls">
            <button onClick={() => setPage(1)} disabled={page <= 1}>⏮ First</button>
            <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page <= 1}>◀ Prev</button>
            <span style={{ padding: ".35rem .6rem" }}>Page {page} / {Math.max(1, Math.ceil(total / Math.max(1, limit)))}</span>
            <button onClick={() => setPage(p => Math.min(Math.max(1, Math.ceil(total / Math.max(1, limit))), p + 1))}
                    disabled={page >= Math.max(1, Math.ceil(total / Math.max(1, limit)))}>Next ▶</button>
            <button onClick={() => setPage(Math.max(1, Math.ceil(total / Math.max(1, limit))))}
                    disabled={page >= Math.max(1, Math.ceil(total / Math.max(1, limit)))}>Last ⏭</button>
            <select
              value={limit}
              onChange={e => { setLimit(parseInt(e.target.value, 10) || 10); setPage(1); }}
              title="Rows per page"
            >
              {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}/page</option>)}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
