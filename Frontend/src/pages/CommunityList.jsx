


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as commApi from "../api/community";
import bgImg from "../assets/1.png";

export default function CommunityList() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  /* ─── fetch once ─── */
  useEffect(() => {
    commApi.listCommunities().then(setRows);
  }, []);

  /* ─── helpers ─── */
  const handleEdit = id => navigate(`/community/${id}/edit`);

  const handleDelete = async id => {
    if (!window.confirm("Delete this community?")) return;
    try {
      await commApi.deleteCommunity(id);
      setRows(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  const handleAdd = () => navigate("/community/new");

  /* ─── render ─── */
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
        .cl-card { width: 100%; max-width: 36rem; background: #8da4cc7a; border-radius: 1.25rem; box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 1.5rem 1rem; }
        .cl-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .cl-title { color: var(--heritage-red); font-size: 1.75rem; font-weight: 900; }
        .add-btn { background: var(--royal-gold); color: #fff; border: none; border-radius: 0.5rem; padding: 0.4rem 0.9rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .add-btn:hover { background: #b99143; }
        .cl-table-wrapper { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        thead th { background: var(--royal-gold); color: #fff; padding: 0.55rem; text-align: left; }
        tbody td { padding: 0.55rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        tbody tr:nth-child(even) { background: #fafafa; }
        .cl-actions { display: flex; gap: 0.5rem; }
        .cl-btn { border: none; border-radius: 0.35rem; padding: 0.25rem 0.5rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .cl-btn.edit { background: var(--royal-gold); color: #fff; }
        .cl-btn.edit:hover { background: #b99143; }
        .cl-btn.delete { background: var(--heritage-red); color: #fff; }
        .cl-btn.delete:hover { background: var(--royal-red); }
        @media (min-width: 640px) { .cl-card { max-width: 48rem; padding: 2rem 1.5rem; } .cl-title { font-size: 2.25rem; } }
      `}</style>

      <div className="cl-card">
        <div className="cl-header">
          <h2 className="cl-title">Communities</h2>
          <button className="add-btn" onClick={handleAdd}>+ Add New</button>
        </div>

        <div className="cl-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th style={{ width: "110px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.category}</td>
                  <td>
                    <div className="cl-actions">
                      <button className="cl-btn edit"   onClick={() => handleEdit(r.id)}>Edit</button>
                      <button className="cl-btn delete" onClick={() => handleDelete(r.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", padding: "1rem" }}>
                    No communities found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
