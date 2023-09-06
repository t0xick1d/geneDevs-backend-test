const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helper');

const schema = Joi.object({
  topic: Joi.string().required(),
  listQuestionId: Joi.array().items(Joi.string()),
});

const schemaUpdate = Joi.object({
  topic: Joi.string().required(),
  listQuestionId: Joi.array().items(Joi.string()),
});

const topicsSchema = new Schema({
  topic: {
    type: String,
  },
  idUser: {
    type: String,
    required: [true, 'idUser is required'],
  },
  listQuestionID: [{ type: String }],
});

topicsSchema.post('save', handleMongooseError);

const Topics = model('topic', topicsSchema);

module.exports = { Topics, schema, schemaUpdate };
