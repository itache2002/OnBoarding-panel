  // // models/communityModel.js
  // const db = require('../Services/db');

  // /* ───────── helpers ───────────────────────── */

  // const COLUMNS = `
  //   id, name, category, contact, address, email,
  //   social_links, logo, description, create_at,
  //   sub_category, image, in_charge
  // `;

  // /* ───────── CRUD ──────────────────────────── */

  // exports.findAll = async () => {
  //   const { rows } = await db.query(`SELECT ${COLUMNS} FROM community ORDER BY create_at DESC`);
  //   return rows;
  // };

  // exports.findById = async (id) => {
  //   const { rows: [row] } = await db.query(`SELECT ${COLUMNS} FROM community WHERE id = $1`, [id]);
  //   return row;
  // };

  // exports.create = async (payload) => {                                       
  //   const {
  //     name, category, contact, address, email,
  //     social_links, logo, description, sub_category,
  //     image, in_charge
  //   } = payload;

  //   const { rows: [row] } = await db.query(
  //     `INSERT INTO community
  //       (name, category, contact, address, email,
  //         social_links, logo, description,
  //         sub_category, image, in_charge)
  //     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
  //     RETURNING ${COLUMNS}`,
  //     [
  //       name, category, contact, address, email,
  //       social_links, logo, description, sub_category,
  //       image, in_charge
  //     ]
  //   );

  //   return row;
  // };

  // exports.update = async (id, payload) => {
  //   const {
  //     name, category, contact, address, email,
  //     social_links, logo, description, sub_category,
  //     image, in_charge
  //   } = payload;

  //   const { rows: [row] } = await db.query(
  //     `UPDATE community SET
  //       name=$2, category=$3, contact=$4, address=$5, email=$6,
  //       social_links=$7, logo=$8, description=$9, sub_category=$10,
  //       image=$11, in_charge=$12
  //     WHERE id=$1
  //     RETURNING ${COLUMNS}`,
  //     [
  //       id, name, category, contact, address, email,
  //       social_links, logo, description, sub_category,
  //       image, in_charge
  //     ]
  //   );

  //   return row;                // undefined when not found
  // };

  // exports.remove = async (id) => {
  //   const { rowCount } = await db.query('DELETE FROM community WHERE id = $1', [id]);
  //   return rowCount;           // 0 when not found
  // };



  // models/communityModel.js
'use strict';

const db = require('../Services/db');

/**
 * Columns exposed via the VIEW public.community_enriched
 * (Make sure you've created the view per the SQL I shared earlier.)
 */
const ENRICHED_COLUMNS = `
  id, name, category, sub_category, description, contact, email, address,
  in_charge, social_links, logo, image, reached_out, created_at
`;

/* ──────────────────────────────────────────────────────────────────────────
 * Internal helpers
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * Find or create a category by name (case-insensitive).
 * @param {string} name
 * @returns {Promise<string|null>} category id (uuid) or null
 */
async function getOrCreateCategoryId(name) {
  if (!name) return null;

  // lookup
  let { rows } = await db.query(
    `SELECT id FROM categories WHERE lower(name) = lower($1) LIMIT 1`,
    [name]
  );
  if (rows[0]) return rows[0].id;

  // insert
  ({ rows } = await db.query(
    `INSERT INTO categories (name) VALUES ($1) RETURNING id`,
    [name]
  ));
  return rows[0].id;
}

/**
 * Find or create a sub-category by (categoryId, name) (case-insensitive).
 * @param {string} categoryId
 * @param {string} subCategoryName
 * @returns {Promise<string|null>} sub_category id (uuid) or null
 */
async function getOrCreateSubCategoryId(categoryId, subCategoryName) {
  if (!categoryId || !subCategoryName) return null;

  let { rows } = await db.query(
    `SELECT id
       FROM sub_categories
      WHERE category_id = $1 AND lower(name) = lower($2)
      LIMIT 1`,
    [categoryId, subCategoryName]
  );
  if (rows[0]) return rows[0].id;

  ({ rows } = await db.query(
    `INSERT INTO sub_categories (category_id, name)
     VALUES ($1, $2) RETURNING id`,
    [categoryId, subCategoryName]
  ));
  return rows[0].id;
}

/**
 * Build WHERE clause and params for filters on the enriched view.
 * Supported filters: category, subCategory, reachedOut, q, createdFrom, createdTo
 * @param {object} filters
 * @returns {{ whereSQL: string, params: any[] }}
 */
function buildWhereClause(filters = {}) {
  const {
    category,        // string
    subCategory,     // string
    reachedOut,      // boolean
    q,               // string, search
    createdFrom,     // ISO date string or Date
    createdTo        // ISO date string or Date
  } = filters;

  const conditions = [];
  const params = [];

  if (category) {
    params.push(category);
    conditions.push(`lower(category) = lower($${params.length})`);
  }
  if (subCategory) {
    params.push(subCategory);
    conditions.push(`lower(sub_category) = lower($${params.length})`);
  }
  if (typeof reachedOut === 'boolean') {
    params.push(reachedOut);
    conditions.push(`reached_out = $${params.length}`);
  }
  if (q) {
    params.push(`%${q}%`);
    const p = `$${params.length}`;
    conditions.push(
      `(name ILIKE ${p} OR description ILIKE ${p} OR address ILIKE ${p}
        OR email ILIKE ${p} OR in_charge ILIKE ${p})`
    );
  }
  if (createdFrom) {
    params.push(createdFrom);
    conditions.push(`created_at >= $${params.length}`);
  }
  if (createdTo) {
    params.push(createdTo);
    conditions.push(`created_at <= $${params.length}`);
  }

  const whereSQL = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  return { whereSQL, params };
}

/**
 * Validate sortBy/order and return ORDER BY clause.
 * @param {string} sortBy
 * @param {'asc'|'desc'} order
 * @returns {string}
 */
function buildOrderBy(sortBy = 'created_at', order = 'desc') {
  const allowedSort = new Set([
    'created_at', 'name', 'category', 'sub_category', 'reached_out'
  ]);
  const sortCol = allowedSort.has(String(sortBy)) ? sortBy : 'created_at';
  const sortDir = String(order).toLowerCase() === 'asc' ? 'ASC' : 'DESC';
  return `ORDER BY ${sortCol} ${sortDir}`;
}

/**
 * Normalize social_links into JSON string safely.
 * @param {object|string|null|undefined} social_links
 * @returns {string} JSON string
 */
function toJSONText(social_links) {
  if (social_links == null) return JSON.stringify({});
  if (typeof social_links === 'string') return social_links;
  return JSON.stringify(social_links);
}

/* ──────────────────────────────────────────────────────────────────────────
 * Query APIs
 * ────────────────────────────────────────────────────────────────────────── */

/**
 * List communities with filters + sorting + pagination.
 * @param {object} filters
 *  - category, subCategory, reachedOut, q, createdFrom, createdTo
 *  - sortBy ('created_at'|'name'|'category'|'sub_category'|'reached_out')
 *  - order ('asc'|'desc')
 *  - limit (number)
 *  - offset (number)
 * @returns {Promise<Array>}
 */
exports.findAll = async (filters = {}) => {
  const {
    sortBy = 'created_at',
    order = 'desc',
    limit = 50,
    offset = 0
  } = filters;

  const { whereSQL, params } = buildWhereClause(filters);
  const orderSQL = buildOrderBy(sortBy, order);

  const sql = `
    SELECT ${ENRICHED_COLUMNS}
      FROM community_enriched
      ${whereSQL}
      ${orderSQL}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `;
  const finalParams = [...params, Number(limit), Number(offset)];
  const { rows } = await db.query(sql, finalParams);
  return rows;
};

/**
 * Same as findAll, but also returns total count for pagination UIs.
 * @returns {Promise<{rows: Array, total: number, limit: number, offset: number}>}
 */
exports.findAllPaged = async (filters = {}) => {
  const {
    sortBy = 'created_at',
    order = 'desc',
    limit = 50,
    offset = 0
  } = filters;

  const { whereSQL, params } = buildWhereClause(filters);
  const orderSQL = buildOrderBy(sortBy, order);

  const countSQL = `SELECT COUNT(*)::int AS total FROM community_enriched ${whereSQL}`;
  const { rows: countRows } = await db.query(countSQL, params);
  const total = countRows?.[0]?.total ?? 0;

  const dataSQL = `
    SELECT ${ENRICHED_COLUMNS}
      FROM community_enriched
      ${whereSQL}
      ${orderSQL}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
  `;
  const finalParams = [...params, Number(limit), Number(offset)];
  const { rows } = await db.query(dataSQL, finalParams);

  return { rows, total, limit: Number(limit), offset: Number(offset) };
};

exports.findById = async (id) => {
  const { rows: [row] } = await db.query(
    `SELECT ${ENRICHED_COLUMNS} FROM community_enriched WHERE id = $1`,
    [id]
  );
  return row;
};

/**
 * Create a community.
 * You can either:
 *  - pass { sub_category_id }
 *  - OR pass { category, sub_category } (auto find/create & link)
 * Accepts reached_out (bool).
 */
exports.create = async (payload) => {
  const {
    name,
    description,
    contact,
    email,
    address,
    in_charge,
    social_links,
    logo,
    image,

    // linking options:
    sub_category_id,
    category,
    sub_category,

    // flags:
    reached_out = false
  } = payload;

  let subCatId = sub_category_id || null;

  // Resolve by names if ID not provided
  if (!subCatId && (category || sub_category)) {
    const catId = await getOrCreateCategoryId(category);
    subCatId = await getOrCreateSubCategoryId(catId, sub_category);
  }

  if (!subCatId) {
    throw new Error('sub_category_id or (category + sub_category) is required');
  }

  const socialLinksJSON = toJSONText(social_links);

  // Insert into base table
  const { rows: [{ id }] } = await db.query(
    `INSERT INTO community
       (name, description, contact, email, address, in_charge,
        social_links, logo, image, sub_category_id, reached_out)
     VALUES ($1,$2,$3,$4,$5,$6,$7::json,$8,$9,$10,$11)
     RETURNING id`,
    [
      name, description, contact, email, address, in_charge,
      socialLinksJSON, logo, image, subCatId, reached_out
    ]
  );

  // Return enriched row
  const { rows: [row] } = await db.query(
    `SELECT ${ENRICHED_COLUMNS} FROM community_enriched WHERE id = $1`,
    [id]
  );
  return row;
};

/**
 * Update a community (partial updates supported).
 * To relink:
 *  - provide sub_category_id
 *  - or provide (category + sub_category) to resolve/create and link
 */
exports.update = async (id, payload) => {
  const {
    name,
    description,
    contact,
    email,
    address,
    in_charge,
    social_links,
    logo,
    image,
    reached_out,
    sub_category_id,
    category,
    sub_category
  } = payload;

  // Resolve new sub_category_id if names provided
  let newSubCatId = sub_category_id || null;
  if (!newSubCatId && (category || sub_category)) {
    const catId = await getOrCreateCategoryId(category);
    newSubCatId = await getOrCreateSubCategoryId(catId, sub_category);
  }

  // Normalize social links if provided
  const socialLinksJSON =
    typeof social_links === 'undefined' ? null : toJSONText(social_links);

  const { rows: [updated] } = await db.query(
    `UPDATE community SET
       name            = COALESCE($2, name),
       description     = COALESCE($3, description),
       contact         = COALESCE($4, contact),
       email           = COALESCE($5, email),
       address         = COALESCE($6, address),
       in_charge       = COALESCE($7, in_charge),
       social_links    = COALESCE($8::json, social_links),
       logo            = COALESCE($9, logo),
       image           = COALESCE($10, image),
       reached_out     = COALESCE($11, reached_out),
       sub_category_id = COALESCE($12, sub_category_id)
     WHERE id = $1
     RETURNING id`,
    [
      id,
      name ?? null,
      description ?? null,
      contact ?? null,
      email ?? null,
      address ?? null,
      in_charge ?? null,
      socialLinksJSON,
      logo ?? null,
      image ?? null,
      typeof reached_out === 'boolean' ? reached_out : null,
      newSubCatId ?? null
    ]
  );

  if (!updated) return undefined;

  const { rows: [row] } = await db.query(
    `SELECT ${ENRICHED_COLUMNS} FROM community_enriched WHERE id = $1`,
    [id]
  );
  return row;
};

exports.remove = async (id) => {
  const { rowCount } = await db.query('DELETE FROM community WHERE id = $1', [id]);
  return rowCount; // 0 when not found
};

/**
 * Convenience toggler for reached_out flag.
 * @param {string} id
 * @param {boolean} value
 */
exports.setReachedOut = async (id, value = true) => {
  const { rows: [row] } = await db.query(
    `UPDATE community SET reached_out = $2 WHERE id = $1 RETURNING id`,
    [id, !!value]
  );
  if (!row) return null;
  const { rows: [enriched] } = await db.query(
    `SELECT ${ENRICHED_COLUMNS} FROM community_enriched WHERE id = $1`,
    [id]
  );
  return enriched;
};

/* ──────────────────────────────────────────────────────────────────────────
 * Extra utilities (optional but handy for UI filters)
 * ────────────────────────────────────────────────────────────────────────── */

/** List all categories (sorted by name). */
exports.listCategories = async () => {
  const { rows } = await db.query(
    `SELECT id, name, slug, description, created_at FROM categories ORDER BY name ASC`
  );
  return rows;
};

/**
 * List sub-categories. Pass either:
 *  - categoryId, or
 *  - categoryName (case-insensitive)
 */
exports.listSubCategories = async ({ categoryId, categoryName } = {}) => {
  if (categoryName && !categoryId) {
    const { rows: cat } = await db.query(
      `SELECT id FROM categories WHERE lower(name) = lower($1) LIMIT 1`,
      [categoryName]
    );
    categoryId = cat?.[0]?.id || null;
  }

  const params = [];
  let where = '';
  if (categoryId) {
    params.push(categoryId);
    where = `WHERE category_id = $1`;
  }

  const { rows } = await db.query(
    `SELECT id, category_id, name, slug, description, created_at
       FROM sub_categories
       ${where}
       ORDER BY name ASC`,
    params
  );
  return rows;
};
