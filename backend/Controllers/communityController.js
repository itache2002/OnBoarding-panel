// // // controllers/communityController.js
// // const community = require('../Model/communityModel');

// // /* Notice: every fn gets (req,res,next) signature for router */

// // exports.getAll   = async (_req, res, next) => {
// //   try {
// //     res.json(await community.findAll());
// //   } catch (err) { next(err); }
// // };

// // exports.getById  = async (req, res, next) => {
// //   try {
// //     const row = await community.findById(req.params.id);
// //     if (!row) return res.status(404).json({ error: 'Not found' });
// //     res.json(row);
// //   } catch (err) { next(err); }
// // };

// // exports.create   = async (req, res, next) => {
// //   try {
// //     const row = await community.create(req.body);
// //     res.status(201).json(row);
// //   } catch (err) { next(err); }
// // };

// // exports.update   = async (req, res, next) => {
// //   try {
// //     const row = await community.update(req.params.id, req.body);
// //     if (!row) return res.status(404).json({ error: 'Not found' });
// //     res.json(row);
// //   } catch (err) { next(err); }
// // };

// // exports.remove   = async (req, res, next) => {
// //   try {
// //     const deleted = await community.remove(req.params.id);
// //     if (!deleted) return res.status(404).json({ error: 'Not found' });
// //     res.json({ 'message': 'The recorde is Deleted ', 'staus': 'success' });
// //   } catch (err) { next(err); }
// // };
  


// // controllers/communityController.js
// const fs       = require('fs');
// const path     = require('path');
// const community = require('../Model/communityModel');

// // ─────────────────────────────────────────────
// // Helpers
// // ─────────────────────────────────────────────
// const UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'community-images');

// // ensure upload directory exists
// if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// /** move a single uploaded file from multer's tmp folder into UPLOAD_DIR
//  *  returns the relative path we store in DB (e.g.  uploads/community-images/1720548454-logo.png)
//  */
// const moveFile = (file, fieldName) => {
//   if (!file) return null;
//   const ext   = path.extname(file.originalname);
//   const fname = `${Date.now()}-${fieldName}${ext}`;
//   const dest  = path.join(UPLOAD_DIR, fname);
//   fs.renameSync(file.path, dest);          // move file
//   return path.relative(path.join(__dirname, '..'), dest).replace(/\\/g, '/');
// };

// /** builds a clean payload for DB, incl. file-paths + parsed social_links */
// const buildPayload = (body, files = {}) => {
//   const payload = { ...body };

//   // parse social_links string → object (ignore if already object)
//   if (typeof payload.social_links === 'string') {
//     try { payload.social_links = JSON.parse(payload.social_links); }
//     catch { payload.social_links = {}; }
//   }

//   // handle files
//   if (files.logo?.[0])  payload.logo  = moveFile(files.logo[0],  'logo');
//   if (files.image?.[0]) payload.image = moveFile(files.image[0], 'image');

//   return payload;
// };

// // ─────────────────────────────────────────────
// // CRUD
// // ─────────────────────────────────────────────
// exports.getAll = async (_req, res, next) => {
//   try { res.json(await community.findAll()); }
//   catch (err) { next(err); }
// };

// exports.getById = async (req, res, next) => {
//   try {
//     const row = await community.findById(req.params.id);
//     if (!row) return res.status(404).json({ error: 'Not found' });
//     res.json(row);
//   } catch (err) { next(err); }
// };

// exports.create = async (req, res, next) => {
//   try {
//     const payload = buildPayload(req.body, req.files);
//     const row = await community.create(payload);
//     res.status(201).json(row);
//   } catch (err) { next(err); }
// };

// exports.update = async (req, res, next) => {
//   try {
//     const payload = buildPayload(req.body, req.files);
//     const row = await community.update(req.params.id, payload);
//     if (!row) return res.status(404).json({ error: 'Not found' });
//     res.json(row);
//   } catch (err) { next(err); }
// };

// exports.remove = async (req, res, next) => {
//   try {
//     const deleted = await community.remove(req.params.id);
//     if (!deleted) return res.status(404).json({ error: 'Not found' });
//     res.json({ message: 'The record is deleted', status: 'success' });
//   } catch (err) { next(err); }
// };


// controllers/communityController.js
'use strict';

const fs        = require('fs');
const path      = require('path');
const community = require('../Model/communityModel'); // <-- adjust if your path differs

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads', 'community-images');

// ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

/** Move a single uploaded file from multer's tmp folder into UPLOAD_DIR.
 *  Returns the relative path we store in DB (e.g. "uploads/community-images/1720548454-logo.png")
 */
const moveFile = (file, fieldName) => {
  if (!file) return null;
  const ext   = path.extname(file.originalname);
  const fname = `${Date.now()}-${fieldName}${ext}`;
  const dest  = path.join(UPLOAD_DIR, fname);
  fs.renameSync(file.path, dest); // move file
  return path.relative(path.join(__dirname, '..'), dest).replace(/\\/g, '/');
};

/** Parse boolean from query/body tolerant of strings like "true", "1", "yes". */
const parseBool = (val) => {
  if (typeof val === 'boolean') return val;
  if (val == null) return undefined;
  const s = String(val).trim().toLowerCase();
  if (['true', '1', 'yes', 'y', 'on'].includes(s)) return true;
  if (['false', '0', 'no', 'n', 'off'].includes(s)) return false;
  return undefined;
};

/** Safe int param (>= 0) with default. */
const intParam = (val, def) => {
  const n = parseInt(val, 10);
  return Number.isFinite(n) && n >= 0 ? n : def;
};

/** builds a clean payload for DB, incl. file-paths + parsed social_links + reached_out */
const buildPayload = (body, files = {}) => {
  const payload = { ...body };

  // normalize reached_out (accept "reachedOut" too)
  const r1 = parseBool(payload.reached_out);
  const r2 = parseBool(payload.reachedOut);
  if (typeof r1 === 'boolean') payload.reached_out = r1;
  else if (typeof r2 === 'boolean') payload.reached_out = r2;

  // parse social_links string → object (ignore if already object)
  if (typeof payload.social_links === 'string') {
    try { payload.social_links = JSON.parse(payload.social_links); }
    catch { payload.social_links = {}; }
  }

  // handle files
  if (files.logo?.[0])  payload.logo  = moveFile(files.logo[0],  'logo');
  if (files.image?.[0]) payload.image = moveFile(files.image[0], 'image');

  return payload;
};

// ─────────────────────────────────────────────
// List / Filters
// ─────────────────────────────────────────────

/**
 * GET /communities
 * Query params (all optional):
 *  - category, subCategory, reachedOut, q, createdFrom, createdTo
 *  - sortBy: created_at|name|category|sub_category|reached_out
 *  - order: asc|desc
 *  - limit, offset (numbers)
 *  - paged=true  → returns { rows, total, limit, offset }
 */
exports.getAll = async (req, res, next) => {
  try {
    const filters = {
      category:     req.query.category,
      subCategory:  req.query.subCategory,
      reachedOut:   parseBool(req.query.reachedOut),
      q:            req.query.q,
      createdFrom:  req.query.createdFrom,
      createdTo:    req.query.createdTo,
      sortBy:       req.query.sortBy,
      order:        req.query.order,
      limit:        intParam(req.query.limit, 50),
      offset:       intParam(req.query.offset, 0),
    };

    if (String(req.query.paged).toLowerCase() === 'true') {
      const out = await community.findAllPaged(filters);
      return res.json(out);
    }

    const rows = await community.findAll(filters);
    res.json(rows);
  } catch (err) { next(err); }
};

exports.getById = async (req, res, next) => {
  try {
    const row = await community.findById(req.params.id);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) { next(err); }
};

// ─────────────────────────────────────────────
// Create / Update / Delete
// ─────────────────────────────────────────────

/**
 * Create accepts either:
 *  - sub_category_id
 *  - or { category, sub_category } to auto find/create and link.
 * Supports reached_out (bool).
 */
exports.create = async (req, res, next) => {
  try {
    const payload = buildPayload(req.body, req.files);
    const row = await community.create(payload);
    res.status(201).json(row);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const payload = buildPayload(req.body, req.files);
    const row = await community.update(req.params.id, payload);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const deleted = await community.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'The record is deleted', status: 'success' });
  } catch (err) { next(err); }
};

// ─────────────────────────────────────────────
// Reached-out helpers
// ─────────────────────────────────────────────

/** PATCH /communities/:id/reached-out (body: { value: true|false }) */
exports.setReachedOut = async (req, res, next) => {
  try {
    const value = parseBool(req.body?.value);
    if (typeof value !== 'boolean') {
      return res.status(400).json({ error: 'value must be boolean' });
    }
    const row = await community.setReachedOut(req.params.id, value);
    if (!row) return res.status(404).json({ error: 'Not found' });
    res.json(row);
  } catch (err) { next(err); }
};

// ─────────────────────────────────────────────
// Taxonomy helpers (optional, handy for filter UIs)
// ─────────────────────────────────────────────

/** GET /categories */
exports.listCategories = async (_req, res, next) => {
  try { res.json(await community.listCategories()); }
  catch (err) { next(err); }
};

/** GET /sub-categories?categoryId=... OR ?categoryName=... */
exports.listSubCategories = async (req, res, next) => {
  try {
    const { categoryId, categoryName } = req.query;
    const rows = await community.listSubCategories({ categoryId, categoryName });
    res.json(rows);
  } catch (err) { next(err); }
};

