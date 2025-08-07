import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as eventApi from "../api/event";
import bgImg from "../assets/1.png";

export default function EventList() {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  /* ─── fetch once ─── */
  useEffect(() => {
    eventApi.listEvents().then(setRows);
  }, []);

  /* ─── helpers ─── */
  const handleEdit = id => navigate(`/event/${id}/edit`);

  const handleDelete = async id => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await eventApi.deleteEvent(id);
      setRows(prev => prev.filter(r => r.id !== id));
    } catch (err) {
      alert(err?.response?.data?.error || "Delete failed");
    }
  };

  const handleAdd = () => navigate("/event/new");

  /* ─── render ─── */
  return (
    <section className="el-section">
      <style>{`
        :root {
          --royal-red: #7A133D;
          --heritage-red: #C62039;
          --royal-gold: #D2A857;
          --royal-cream: #FFF9F2;
          --sage: #8BBAA1;
          --teal: #056675;
        }
        .el-section {
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

        .back-btn {
        background: none;
        border: none;
        color: var(--heritage-red);
        font-weight: 700;
        font-size: 1rem;
        cursor: pointer;
        margin-right: 1rem;
        transition: color 0.2s;
        }
        .back-btn:hover {
        color: var(--teal);
        }


        .el-card { width: 100%; max-width: 36rem; background: #8da4cc7a; border-radius: 1.25rem; box-shadow: 0 10px 25px rgba(0,0,0,0.08); padding: 1.5rem 1rem; }
        .el-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .el-title { color: var(--heritage-red); font-size: 1.75rem; font-weight: 900; }
        .add-btn { background: var(--royal-gold); color: #fff; border: none; border-radius: 0.5rem; padding: 0.4rem 0.9rem; font-weight: 700; cursor: pointer; transition: background 0.15s; }
        .add-btn:hover { background: #b99143; }
        .el-table-wrapper { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; font-size: 0.875rem; }
        thead th { background: var(--royal-gold); color: #fff; padding: 0.55rem; text-align: left; }
        tbody td { padding: 0.55rem; border-bottom: 1px solid rgba(0,0,0,0.05); }
        tbody tr:nth-child(even) { background: #fafafa; }
        .el-actions { display: flex; gap: 0.5rem; }
        .el-btn { border: none; border-radius: 0.35rem; padding: 0.25rem 0.5rem; font-weight: 600; cursor: pointer; transition: background 0.15s; }
        .el-btn.edit { background: var(--royal-gold); color: #fff; }
        .el-btn.edit:hover { background: #b99143; }
        .el-btn.delete { background: var(--heritage-red); color: #fff; }
        .el-btn.delete:hover { background: var(--royal-red); }
        @media (min-width: 640px) { .el-card { max-width: 48rem; padding: 2rem 1.5rem; } .el-title { font-size: 2.25rem; } }
      `}</style>

      <div className="el-card">
        <div className="el-header">
        {/* back button */}
        <button className="back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
          <h2 className="el-title">Events</h2>
          <button className="add-btn" onClick={handleAdd}>+ Add New</button>
        </div>

        <div className="el-table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Location</th>
                <th>Category</th>
                <th style={{ width: "110px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.id}>
                  <td>{r.event_name}</td>
                  <td>{r.event_date}</td>
                  <td>{r.location}</td>
                  <td>{r.category}</td>
                  <td>
                    <div className="el-actions">
                      <button className="el-btn edit"   onClick={() => handleEdit(r.id)}>Edit</button>
                      <button className="el-btn delete" onClick={() => handleDelete(r.id)}>Del</button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "1rem" }}>
                    No events found.
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