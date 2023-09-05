const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helper');

const schema = Joi.object({
  id: Joi.string(),
  question: Joi.string().required(),
  answearList: Joi.array().items(
    Joi.object({
      answear: Joi.string().required(),
      isRght: Joi.boolean().required(),
    }),
  ),
});

const questionSchema = new Schema({
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

module.exports = { Question, schema };
