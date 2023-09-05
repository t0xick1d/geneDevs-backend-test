const { Topics } = require('../models/topic');

const { HttpError } = require('../helper');
const { ctrlWrapper } = require('../helper');

const getAll = async (req, res, next) => {
  const { _id: idUser } = req.user;
  const result = await Topics.find({ idUser });
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const { _id: idUser } = req.user;
  const body = req.body;
  const newTopics = await Topics.create({ ...body, idUser });
  res.status(201).json(newTopics);
};

const deleteById = async (req, res, next) => {
  const { topicId } = req.params;
  const deleteTopice = await Topics.findByIdAndRemove(topicId);
  if (!deleteTopice) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json({ message: 'Topic deleted' });
};

const updateById = async (req, res, next) => {
  const id = req.params.topicId;
  const updateTopics = await Topics.findByIdAndUpdate(id, req.body, { new: true });
  if (!updateTopics) {
    throw HttpError(400, 'missing fields');
  }
  res.status(200).json(updateTopics);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
