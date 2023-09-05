const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../helper');

const isValidId = (req, res, next) => {
  const { topicId } = req.params;
  if (!isValidObjectId(topicId)) {
    next(HttpError(400, `${topicId} is not valid id`));
  }
  next();
};
module.exports = isValidId;
