const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/question');

const { validateBody, isValidId, authenticate } = require('../../middleweres/');

const { schema, updateSchema } = require('../../models/question');

//router.get('/', ctrl.getAll);

router.get('/:topicId', authenticate, isValidId, ctrl.getById);

router.post('/', authenticate, validateBody(schema), ctrl.add);

router.delete('/:topicId', authenticate, isValidId, ctrl.deleteById);

// router.put('/:questionId', isValidId, validateBody(schema), ctrl.updateById);

router.patch(
  '/:topicId/update',
  authenticate,
  isValidId,
  validateBody(updateSchema),
  ctrl.updateById,
);

module.exports = router;
