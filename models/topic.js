const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helper');

const schema = Joi.object({
  id: Joi.string(),
  topic: Joi.string().required(),
  listQuestionId: Joi.array().items(Joi.string().required()),
});

const questionSchema = new Schema({
  topic: {
    type: String,
  },
  idUser: {},
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
