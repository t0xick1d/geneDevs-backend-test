const express = require('express');

const router = express.Router();

const ctrl = require('../../controlers/topic');

const { validateBody, isValidId, authenticate } = require('../../middleweres/');

const { schema } = require('../../models/topic');

router.get('/', authenticate, ctrl.getAll);

router.post('/', authenticate, validateBody(schema), ctrl.add);

router.delete('/:topicId', authenticate, isValidId, ctrl.deleteById);

router.patch('/:topicId/update', authenticate, isValidId, validateBody(schema), ctrl.updateById);

module.exports = router;
