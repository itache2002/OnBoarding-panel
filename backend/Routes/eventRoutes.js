const express = require('express');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const { requireAuth } = require('../middleware/jwt');
const ctrl = require('../Controllers/eventController');

const router = express.Router();
router.use(requireAuth);

/* ───── Multer Setup ───── */
const tmpDir = path.join(__dirname, '..', 'tmp');
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true });
const upload = multer({ dest: tmpDir });

/* ───── Routes ───── */
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);

router.post(
  '/',
  upload.fields([{ name: 'event_image', maxCount: 1 }]),
  ctrl.create
);

router.put(
  '/:id',
  upload.fields([{ name: 'event_image', maxCount: 1 }]),
  ctrl.update
);

router.delete('/:id', ctrl.remove);

module.exports = router;
