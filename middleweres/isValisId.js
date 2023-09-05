const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helper');

const isValidId = (req, res, next) => {
  const { questionId } = req.params;
  if (!isValidObjectId(questionId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};
module.exports = isValidId;
