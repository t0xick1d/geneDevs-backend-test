const { Question } = require('../models/question');

const { HttpError } = require('../helper');
const { ctrlWrapper } = require('../helper');

const getAll = async (req, res, next) => {
  const result = await Question.find();
  console.log(result);
  res.status(200).json(result);
};

// const getById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await Contact.findById(contactId);
//   if (!result) {
//     console.log(HttpError);
//     throw HttpError(404, 'Not found');
//   }
//   res.status(200).json(result);
// };

// const add = async (req, res, next) => {
//   const body = req.body;
//   const newContact = await Contact.create(body);
//   res.status(201).json(newContact);
// };

// const deleteById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const deleteContact = await Contact.findByIdAndRemove(contactId);
//   if (!deleteContact) {
//     throw HttpError(404, 'Not found');
//   }
//   res.status(200).json({ message: 'contact deleted' });
// };

// const updateById = async (req, res, next) => {
//   const id = req.params.contactId;
//   const updateContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!updateContact) {
//     throw HttpError(400, 'missing fields');
//   }
//   res.status(200).json(updateContact);
// };
// const updateStatusContact = async (req, res, next) => {
//   const id = req.params.contactId;
//   const updateStatusContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
//   if (!updateStatusContact) {
//     throw HttpError(400, 'missing fields');
//   }
//   res.status(200).json(updateStatusContact);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getById: ctrlWrapper(getById),
  // add: ctrlWrapper(add),
  // deleteById: ctrlWrapper(deleteById),
  // updateById: ctrlWrapper(updateById),
  // updateStatusContact: ctrlWrapper(updateStatusContact),
};