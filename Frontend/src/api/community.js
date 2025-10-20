// // // // import api from './http';

// // // // export const listCommunities = async () => (await api.get('/community')).data;

// // // // export const getCommunity = async id => (await api.get(`/community/${id}`)).data;

// // // // export const createCommunity = async payload =>
// // // //   (await api.post('/community', payload)).data;

// // // // export const updateCommunity = async (id, payload) =>
// // // //   (await api.put(`/community/${id}`, payload)).data;

// // // // export const deleteCommunity = async id =>
// // // //   (await api.delete(`/community/${id}`)).data;


// // // import api from './http';

// // // /** Get all communities */
// // // export const listCommunities = async () =>
// // //   (await api.get('/community')).data;

// // // /** Get single community by ID */
// // // export const getCommunity = async id =>
// // //   (await api.get(`/community/${id}`)).data;

// // // /** Create a new community (with or without files) */
// // // export const createCommunity = async payload => {
// // //   const isFormData = payload instanceof FormData;
// // //   const config = isFormData
// // //     ? { headers: { 'Content-Type': 'multipart/form-data' } }
// // //     : {};
// // //   return (await api.post('/community', payload, config)).data;
// // // };

// // // /** Update community by ID (with or without files) */
// // // export const updateCommunity = async (id, payload) => {
// // //   const isFormData = payload instanceof FormData;
// // //   const config = isFormData
// // //     ? { headers: { 'Content-Type': 'multipart/form-data' } }
// // //     : {};
// // //   return (await api.put(`/community/${id}`, payload, config)).data;
// // // };

// // // /** Delete community */
// // // export const deleteCommunity = async id =>
// // //   (await api.delete(`/community/${id}`)).data;




// // // api/communityApi.js
// // import api from './http';

// // /* ───────────────────────── helpers ───────────────────────── */
// // const buildQuery = (params = {}) => {
// //   const qs = new URLSearchParams();
// //   Object.entries(params).forEach(([k, v]) => {
// //     if (v === undefined || v === null || v === '') return;
// //     if (Array.isArray(v)) v.forEach(x => qs.append(k, x));
// //     else qs.append(k, String(v));
// //   });
// //   const s = qs.toString();
// //   return s ? `?${s}` : '';
// // };

// // const toFormData = (payload = {}) => {
// //   const fd = new FormData();
// //   Object.entries(payload).forEach(([k, v]) => {
// //     if (v === undefined || v === null) return;

// //     // files (File/Blob)
// //     if (v instanceof File || v instanceof Blob) {
// //       fd.append(k, v);
// //       return;
// //     }

// //     // arrays
// //     if (Array.isArray(v)) {
// //       v.forEach(val => {
// //         if (val != null) fd.append(`${k}[]`, val);
// //       });
// //       return;
// //     }

// //     // social_links object → JSON
// //     if (k === 'social_links' && typeof v !== 'string') {
// //       fd.append(k, JSON.stringify(v));
// //       return;
// //     }

// //     // primitives / strings
// //     fd.append(k, v);
// //   });
// //   return fd;
// // };

// // /* ───────────────────────── list / get ───────────────────────── */

// // /**
// //  * Get communities (optionally filtered).
// //  * filters:
// //  *  - category, subCategory, reachedOut (bool), q
// //  *  - createdFrom, createdTo (ISO strings)
// //  *  - sortBy: created_at|name|category|sub_category|reached_out
// //  *  - order: asc|desc
// //  *  - limit, offset (numbers)
// //  */
// // export const listCommunities = async (filters = {}) => {
// //   const url = `/community${buildQuery(filters)}`;
// //   return (await api.get(url)).data;
// // };

// // /**
// //  * Same as listCommunities but returns { rows, total, limit, offset }.
// //  * Just sets paged=true under the hood.
// //  */
// // export const listCommunitiesPaged = async (filters = {}) => {
// //   const url = `/community${buildQuery({ ...filters, paged: true })}`;
// //   return (await api.get(url)).data;
// // };

// // /** Get single community by ID */
// // export const getCommunity = async (id) =>
// //   (await api.get(`/community/${id}`)).data;

// // /* ───────────────────────── create / update / delete ───────────────────────── */

// // /**
// //  * Create a community.
// //  * Accepts either:
// //  *  - { sub_category_id, ... } OR
// //  *  - { category, sub_category, ... } (backend will create/find and link)
// //  * File fields (if any): logo, image
// //  * Include reached_out if you want to set it upfront.
// //  */
// // export const createCommunity = async (payload) => {
// //   const isMultipart =
// //     payload instanceof FormData || payload?.logo instanceof File || payload?.image instanceof File;

// //   const data = isMultipart ? (payload instanceof FormData ? payload : toFormData(payload)) : payload;
// //   const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};

// //   return (await api.post('/community', data, config)).data;
// // };

// // /**
// //  * Update a community by ID (partial updates allowed).
// //  * Same payload rules as createCommunity.
// //  */
// // export const updateCommunity = async (id, payload) => {
// //   const isMultipart =
// //     payload instanceof FormData || payload?.logo instanceof File || payload?.image instanceof File;

// //   const data = isMultipart ? (payload instanceof FormData ? payload : toFormData(payload)) : payload;
// //   const config = isMultipart ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};

// //   return (await api.put(`/community/${id}`, data, config)).data;
// // };

// // /** Delete community */
// // export const deleteCommunity = async (id) =>
// //   (await api.delete(`/community/${id}`)).data;

// // /* ───────────────────────── reached_out helpers ───────────────────────── */

// // /** Toggle/set reached_out flag */
// // export const setReachedOut = async (id, value = true) =>
// //   (await api.patch(`/community/${id}/reached-out`, { value })).data;

// // /* ───────────────────────── taxonomy for filter UIs ───────────────────────── */

// // export const listCategories = async () =>
// //   (await api.get('/community/@meta/categories')).data;

// // /** Pass either { categoryId } or { categoryName } */
// // export const listSubCategories = async (args = {}) =>
// //   (await api.get(`/community/@meta/sub-categories${buildQuery(args)}`)).data;



// // src/api/community.js
// import api from './http';

// const buildQuery = (params = {}) => {
//   const qs = new URLSearchParams();
//   Object.entries(params).forEach(([k, v]) => {
//     if (v === undefined || v === null || v === '') return;
//     qs.append(k, String(v));
//   });
//   const s = qs.toString();
//   return s ? `?${s}` : '';
// };

// /** Get all communities (ALWAYS returns an array) */
// export const listCommunities = async (filters = {}) => {
//   const url = `/community${buildQuery(filters)}`;
//   const { data } = await api.get(url);
//   if (Array.isArray(data)) return data;
//   if (data && Array.isArray(data.rows)) return data.rows;
//   return [];
// };

// /** Paged list — ALWAYS returns { rows, total, limit, offset } */
// export const listCommunitiesPaged = async (filters = {}) => {
//   const url = `/community${buildQuery({ ...filters, paged: true })}`;
//   const { data } = await api.get(url);

//   if (Array.isArray(data)) {
//     const limit = Number(filters.limit) || data.length || 10;
//     const offset = Number(filters.offset) || 0;
//     return { rows: data, total: data.length, limit, offset };
//   }

//   if (data && Array.isArray(data.rows)) {
//     const limit = Number(data.limit ?? filters.limit) || data.rows.length || 10;
//     const offset = Number(data.offset ?? filters.offset) || 0;
//     const total = Number(data.total) || data.rows.length;
//     return { rows: data.rows, total, limit, offset };
//   }

//   // fallback
//   return { rows: [], total: 0, limit: Number(filters.limit) || 10, offset: Number(filters.offset) || 0 };
// };

// export const getCommunity = async (id) =>
//   (await api.get(`/community/${id}`)).data;

// export const createCommunity = async (payload) => {
//   const isFormData =
//     payload instanceof FormData || payload?.logo instanceof File || payload?.image instanceof File;
//   const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
//   return (await api.post('/community', payload, config)).data;
// };

// export const updateCommunity = async (id, payload) => {
//   const isFormData =
//     payload instanceof FormData || payload?.logo instanceof File || payload?.image instanceof File;
//   const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
//   return (await api.put(`/community/${id}`, payload, config)).data;
// };

// export const deleteCommunity = async (id) =>
//   (await api.delete(`/community/${id}`)).data;

// export const setReachedOut = async (id, value = true) =>
//   (await api.patch(`/community/${id}/reached-out`, { value })).data;

// export const listCategories = async () =>
//   (await api.get('/community/@meta/categories')).data;

// export const listSubCategories = async (args = {}) =>
//   (await api.get(`/community/@meta/sub-categories${buildQuery(args)}`)).data;



// src/api/community.js
import api from './http';

/* -------------------- utils -------------------- */
const hasFileCtor = typeof File !== 'undefined';
const isFile = (v) => hasFileCtor && v instanceof File;

const buildQuery = (params = {}) => {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === '') return;
    qs.append(k, String(v));
  });
  const s = qs.toString();
  return s ? `?${s}` : '';
};

/* ---------------- Communities ------------------ */
/** Get all communities (ALWAYS returns an array) */
export const listCommunities = async (filters = {}) => {
  const url = `/community${buildQuery(filters)}`;
  const { data } = await api.get(url);
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.rows)) return data.rows;
  return [];
};

/** Paged list — ALWAYS returns { rows, total, limit, offset } */
export const listCommunitiesPaged = async (filters = {}) => {
  const url = `/community${buildQuery({ ...filters, paged: true })}`;
  const { data } = await api.get(url);

  if (Array.isArray(data)) {
    const limit = Number(filters.limit) || data.length || 10;
    const offset = Number(filters.offset) || 0;
    return { rows: data, total: data.length, limit, offset };
  }

  if (data && Array.isArray(data.rows)) {
    const limit = Number(data.limit ?? filters.limit) || data.rows.length || 10;
    const offset = Number(data.offset ?? filters.offset) || 0;
    const total = Number(data.total) || data.rows.length;
    return { rows: data.rows, total, limit, offset };
  }

  return { rows: [], total: 0, limit: Number(filters.limit) || 10, offset: Number(filters.offset) || 0 };
};

export const getCommunity = async (id) =>
  (await api.get(`/community/${id}`)).data;

export const createCommunity = async (payload) => {
  const isFormData =
    payload instanceof FormData || isFile(payload?.logo) || isFile(payload?.image);
  const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  return (await api.post('/community', payload, config)).data;
};

export const updateCommunity = async (id, payload) => {
  const isFormData =
    payload instanceof FormData || isFile(payload?.logo) || isFile(payload?.image);
  const config = isFormData ? { headers: { 'Content-Type': 'multipart/form-data' } } : {};
  return (await api.put(`/community/${id}`, payload, config)).data;
};

export const deleteCommunity = async (id) =>
  (await api.delete(`/community/${id}`)).data;

export const setReachedOut = async (id, value = true) =>
  (await api.patch(`/community/${id}/reached-out`, { value })).data;

/* --------- Categories & Sub-categories --------- */
/** Current (legacy) list endpoints you were using */
export const listCategories = async () =>
  (await api.get('/community/@meta/categories')).data;

export const listSubCategories = async (args = {}) =>
  (await api.get(`/community/@meta/sub-categories${buildQuery(args)}`)).data;

/** ✅ NEW: create a sub-category under a parent category (by parentId) */
export const createSubcategory = async (parentId, name) =>
  (await api.post(`/community/categories/${parentId}/subcategories`, { name })).data;

/* (Optional) helpers if you ever need them:
export const createCategory = async (name) =>
  (await api.post('/community/categories', { name })).data;

export const updateCategory = async (id, payload) =>
  (await api.patch(`/community/categories/${id}`, payload)).data;
*/
