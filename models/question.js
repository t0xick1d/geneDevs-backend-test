const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helper');

const schema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(8).required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const questionSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Set name for contact'],
  },
});

questionSchema.post('save', handleMongooseError);

const Question = model('question', questionSchema);

module.exports = { Question, schema, updateFavoriteSchema };
