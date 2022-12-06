import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
  MONGO_INITDB_DATABASE: Joi.string().required(),
  MONGO_URI: Joi.string().required(),
  PORT: Joi.number().default(3000),
  STATE: Joi.string().default('dev'),
  JWT_SECRET: Joi.string().required(),
});
