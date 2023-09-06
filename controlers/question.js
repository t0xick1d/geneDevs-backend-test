const { Question } = require('../models/question');

const { HttpError } = require('../helper');
const { ctrlWrapper } = require('../helper');

const getById = async (req, res, next) => {
  const { topicId } = req.params;
  console.log(topicId);
  const result = await Question.find({ topicId });
  console.log(result);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const body = req.body;
  const newQuestion = await Question.create(body);
  res.status(201).json(newQuestion);
};

const deleteById = async (req, res, next) => {
  const { topicId } = req.params;
  const deleteQuestion = await Question.findByIdAndRemove(topicId);
  if (!deleteQuestion) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'Question deleted' });
};

const updateById = async (req, res, next) => {
  const id = req.params.topicId;
  const updateQuestion = await Question.findByIdAndUpdate(
    id,
    {
      ...req.body,
      $set: { answearList: req.body.answearList },
    },
    { new: true, upsert: true },
  );
  if (!updateQuestion) {
    throw HttpError(400, 'missing fields');
  }
  res.status(200).json(updateQuestion);
};

module.exports = {
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
