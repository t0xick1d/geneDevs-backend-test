const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/question');

const { validateBody, isValidId } = require('../../middleweres/');

const { schema, updateFavoriteSchema } = require('../../models/question');

router.get('/', ctrl.getAll);

// router.get('/:questionId', isValidId, ctrl.getById);

// router.post('/', validateBody(schema), ctrl.add);

// router.delete('/:questionId', isValidId, ctrl.deleteById);

// router.put('/:questionId', isValidId, validateBody(schema), ctrl.updateById);

// router.patch(
//   '/:questionId/favorite',
//   isValidId,
//   validateBody(updateFavoriteSchema),
//   ctrl.updateStatusContact,
// );

module.exports = router;
