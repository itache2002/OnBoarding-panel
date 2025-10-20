// src/components/CategoryPicker.jsx
import React from 'react';
import {
  listCategories,
  listSubCategories,
  createSubcategory,
} from '../api/community';

const ADD_NEW_VALUE = '__add_new__';

export default function CategoryPicker({
  value = { categoryId: null, subcategoryId: null },
  onChange = () => {},
  disabled = false,
  required = false,
  label = 'Category',
  subLabel = 'Sub-category',
}) {
  const [cats, setCats] = React.useState([]);
  const [subs, setSubs] = React.useState([]);
  const [loadingCats, setLoadingCats] = React.useState(true);
  const [loadingSubs, setLoadingSubs] = React.useState(false);
  const [error, setError] = React.useState('');
  const [showAddInput, setShowAddInput] = React.useState(false);
  const [newSubName, setNewSubName] = React.useState('');

  const { categoryId, subcategoryId } = value || {};

  // Load categories on mount
  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingCats(true);
        setError('');
        const data = await listCategories();
        if (!alive) return;
        setCats(data.sort((a, b) => (a.name || '').localeCompare(b.name || '')));
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load categories');
      } finally {
        if (alive) setLoadingCats(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  // Load sub-cats when category changes
  React.useEffect(() => {
    if (!categoryId) {
      setSubs([]);
      setShowAddInput(false);
      return;
    }
    let alive = true;
    (async () => {
      try {
        setLoadingSubs(true);
        setError('');
        const data = await listSubCategories({ parentId: categoryId });
        if (!alive) return;
        setSubs(data.sort((a, b) => (a.name || '').localeCompare(b.name || '')));
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load sub-categories');
      } finally {
        if (alive) setLoadingSubs(false);
      }
    })();
    return () => { alive = false; };
  }, [categoryId]);

  const handleCategory = (e) => {
    const cid = e.target.value || null;
    // reset sub when category changes
    onChange({ categoryId: cid, subcategoryId: null });
    setShowAddInput(false);
    setNewSubName('');
  };

  const handleSub = (e) => {
    const val = e.target.value;
    if (val === ADD_NEW_VALUE) {
      setShowAddInput(true);
      onChange({ categoryId, subcategoryId: null });
      return;
    }
    setShowAddInput(false);
    setNewSubName('');
    onChange({ categoryId, subcategoryId: val || null });
  };

  const addNewSub = async (e) => {
    e.preventDefault();
    if (!categoryId) return alert('Select a category first.');
    const name = (newSubName || '').trim();
    if (!name) return alert('Enter a sub-category name.');
    try {
      const created = await createSubcategory(categoryId, name);
      // refresh subs and select the newly created one
      const data = await listSubCategories({ parentId: categoryId });
      setSubs(data.sort((a, b) => (a.name || '').localeCompare(b.name || '')));
      onChange({ categoryId, subcategoryId: created?.id || null });
      setShowAddInput(false);
      setNewSubName('');
    } catch (e2) {
      alert(e2?.response?.data?.error || e2?.message || 'Failed to create sub-category');
    }
  };

  return (
    <div style={styles.wrap}>
      <div style={styles.row}>
        <label style={styles.label}>
          {label}{required ? ' *' : ''}
          <select
            value={categoryId || ''}
            onChange={handleCategory}
            disabled={disabled || loadingCats}
            required={required}
            style={styles.select}
          >
            <option value="">— Select category —</option>
            {cats.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.row}>
        <label style={styles.label}>
          {subLabel}
          <select
            value={showAddInput ? ADD_NEW_VALUE : (subcategoryId || '')}
            onChange={handleSub}
            disabled={disabled || !categoryId || loadingSubs}
            style={styles.select}
          >
            <option value="">
              {categoryId ? '— Select sub-category —' : 'Select a category first'}
            </option>

            {/* Existing subs */}
            {subs.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}

            {/* Add new option */}
            {categoryId && <option value={ADD_NEW_VALUE}>➕ Add new sub-category…</option>}
          </select>
        </label>
      </div>

      {showAddInput && (
        <form onSubmit={addNewSub} style={styles.addRow}>
          <input
            type="text"
            value={newSubName}
            onChange={(e) => setNewSubName(e.target.value)}
            placeholder="New sub-category name"
            style={styles.input}
          />
          <button type="submit" style={styles.btn}>Add</button>
          <button
            type="button"
            style={styles.btnGhost}
            onClick={() => { setShowAddInput(false); setNewSubName(''); }}
          >
            Cancel
          </button>
        </form>
      )}

      {error ? <p style={styles.err}>{error}</p> : null}
    </div>
  );
}

const styles = {
  wrap: { display: 'grid', gap: 10 },
  row: { display: 'grid', gap: 6 },
  label: { fontSize: 13, color: '#333', display: 'grid', gap: 6 },
  select: { padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd' },
  input: { padding: '10px 12px', borderRadius: 10, border: '1px solid #ddd', minWidth: 240 },
  addRow: { display: 'flex', gap: 8, alignItems: 'center' },
  btn: { padding: '10px 14px', borderRadius: 10, border: '1px solid #0a66c2', background: '#0a66c2', color: '#fff', cursor: 'pointer' },
  btnGhost: { padding: '10px 14px', borderRadius: 10, border: '1px solid #ddd', background: '#f7f7f7', cursor: 'pointer' },
  err: { color: '#c00', fontSize: 12, margin: '4px 0 0' },
};
