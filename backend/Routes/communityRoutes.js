// // // // // routes/communityRoutes.js
// // // // const express = require('express');
// // // // const { requireAuth } = require('../middleware/jwt');
// // // // const ctrl = require('../Controllers/communityController');

// // // // const router = express.Router();

// // // // /* protect all routes */
// // // // router.use(requireAuth);

// // // // /* CRUD */
// // // // router.get('/',      ctrl.getAll);
// // // // router.get('/:id',   ctrl.getById);
// // // // router.post('/',     ctrl.create);
// // // // router.put('/:id',   ctrl.update);
// // // // router.delete('/:id', ctrl.remove);

// // // // module.exports = router;


// // // const express = require('express');
// // // const path = require('path');
// // // const multer = require('multer');
// // // const { requireAuth } = require('../middleware/jwt');
// // // const ctrl = require('../Controllers/communityController');

// // // const router = express.Router();

// // // /* Protect all routes */
// // // router.use(requireAuth);

// // // /* ───── Multer Setup ───── */
// // // const tmpDir = path.join(__dirname, '..', 'tmp'); // temporary upload folder
// // // const upload = multer({ dest: tmpDir });

// // // /* ───── Routes ───── */

// // // // GET all & one
// // // router.get('/', ctrl.getAll);
// // // router.get('/:id', ctrl.getById);

// // // // CREATE with file upload (logo & image)
// // // router.post(
// // //   '/',
// // //   upload.fields([
// // //     { name: 'logo', maxCount: 1 },
// // //     { name: 'image', maxCount: 1 }
// // //   ]),
// // //   ctrl.create
// // // );

// // // // UPDATE with file upload (logo & image)
// // // router.put(
// // //   '/:id',
// // //   upload.fields([
// // //     { name: 'logo', maxCount: 1 },
// // //     { name: 'image', maxCount: 1 }
// // //   ]),
// // //   ctrl.update
// // // );

// // // // DELETE
// // // router.delete('/:id', ctrl.remove);

// // // module.exports = router;



// // // routes/community.js
// // 'use strict';

// // const express = require('express');
// // const multer  = require('multer');
// // const path    = require('path');
// // const ctrl    = require('../controllers/communityController');

// // const router = express.Router();

// // // Multer temp storage (files will be moved by controller)
// // const upload = multer({ dest: path.join(__dirname, '..', 'tmp') });

// // // List / detail
// // router.get('/', ctrl.getAll);
// // router.get('/:id', ctrl.getById);

// // // Create / update accept logo/image files
// // router.post('/',
// //   upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
// //   ctrl.create
// // );

// // router.put('/:id',
// //   upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'image', maxCount: 1 }]),
// //   ctrl.update
// // );

// // router.delete('/:id', ctrl.remove);

// // // Reached-out toggle
// // router.patch('/:id/reached-out', express.json(), ctrl.setReachedOut);

// // // Taxonomy
// // router.get('/@meta/categories', ctrl.listCategories);
// // router.get('/@meta/sub-categories', ctrl.listSubCategories);

// // module.exports = router;


// // backend/Routes/communityRoutes.js
// 'use strict';

// const express = require('express');
// const multer  = require('multer');
// const path    = require('path');
// const ctrl    = require('../Controllers/communityController'); // adjust if your path differs

// const router = express.Router();

// // Multer temp storage (controller will move files into /uploads/community-images)
// const upload = multer({ dest: path.join(__dirname, '..', 'tmp') });

// /**
//  * IMPORTANT:
//  * - Do NOT put query strings in route paths (e.g., '/x?y=:y') — use req.query instead.
//  * - Avoid bare wildcards like '/*'. If you ever need a catch-all, prefer '/:splat*'.
//  * - Put specific routes before parameterized ones (e.g., meta routes before '/:id').
//  */

// /* ---------------- Meta (for filter UIs) ---------------- */
// router.get('/@meta/categories', ctrl.listCategories);
// router.get('/@meta/sub-categories', ctrl.listSubCategories); // expects ?categoryId=... or ?categoryName=...

// /* ---------------- CRUD ---------------- */
// router.get('/', ctrl.getAll);
// router.get('/:id', ctrl.getById);

// router.post(
//   '/',
//   upload.fields([
//     { name: 'logo',  maxCount: 1 },
//     { name: 'image', maxCount: 1 },
//   ]),
//   ctrl.create
// );

// router.put(
//   '/:id',
//   upload.fields([
//     { name: 'logo',  maxCount: 1 },
//     { name: 'image', maxCount: 1 },
//   ]),
//   ctrl.update
// );

// // JSON body is already parsed globally in index.js via app.use(express.json())
// router.patch('/:id/reached-out', ctrl.setReachedOut);

// router.delete('/:id', ctrl.remove);

// module.exports = router;


'use strict';

const express = require('express');
const multer  = require('multer');
const path    = require('path');
const ctrl    = require('../Controllers/communityController'); // adjust if your path differs

const router = express.Router();

// Multer temp storage (controller moves files into /uploads/community-images)
const upload = multer({ dest: path.join(__dirname, '..', 'tmp') });

/**
 * IMPORTANT for Express 5 / path-to-regexp@6:
 * - No bare wildcards like '/*' or '*'
 * - No query strings in route paths (use req.query)
 * - Put specific routes before param routes (meta before '/:id')
 */

/* -------- Meta (for filter UIs) -------- */
router.get('/@meta/categories', ctrl.listCategories);
router.get('/@meta/sub-categories', ctrl.listSubCategories); // uses req.query.categoryId or req.query.categoryName

/* -------- CRUD -------- */
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

router.post(
  '/',
  upload.fields([
    { name: 'logo',  maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  ctrl.create
);

router.put(
  '/:id',
  upload.fields([
    { name: 'logo',  maxCount: 1 },
    { name: 'image', maxCount: 1 },
  ]),
  ctrl.update
);

router.patch('/:id/reached-out', ctrl.setReachedOut);

router.delete('/:id', ctrl.remove);

module.exports = router;
