

'use strict';

const express = require('express');
const multer  = require('multer');
const path    = require('path');
const ctrl    = require('../Controllers/communityController');

const router = express.Router();


const upload = multer({ dest: path.join(__dirname, '..', 'tmp') });


router.get('/categories', ctrl.listCategories);
router.get('/sub-categories', ctrl.listSubCategories);

// Create
router.post('/categories', ctrl.createCategory);
router.post('/categories/:parentId/subcategories', ctrl.createSubcategory);


router.patch('/categories/:id', ctrl.updateCategory);


router.get('/@meta/categories', ctrl.listCategories);
router.get('/@meta/sub-categories', ctrl.listSubCategories);


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
