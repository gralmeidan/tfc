import Joi = require('joi');

export const locationSchema = Joi.string().valid('home', 'away').required();

export default {
  locationSchema,
};
