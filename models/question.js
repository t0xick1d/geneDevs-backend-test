const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helper');

const schema = Joi.object({
  topicId: Joi.string().required(),
  question: Joi.string().required(),
  answearList: Joi.array().items(
    Joi.object({
      answer: Joi.string().required(),
      isRight: Joi.boolean().required(),
    }),
  ),
});
const updateSchema = Joi.object({
  question: Joi.string().required(),
  answearList: Joi.array().items(
    Joi.object({
      answer: Joi.string().required(),
      isRight: Joi.boolean().required(),
    }),
  ),
});

const questionSchema = new Schema({
  topicId: {
    type: String,
  },
  question: {
    type: String,
  },
  answearList: [
    {
      answer: { type: String },
      isRight: { type: Boolean },
    },
  ],
});

questionSchema.post('save', handleMongooseError);

const Question = model('question', questionSchema);

module.exports = { Question, schema, updateSchema };
