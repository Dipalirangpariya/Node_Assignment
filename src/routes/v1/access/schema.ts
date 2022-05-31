import Joi from '@hapi/joi';
import { join } from 'path';

export default {
  userCredential: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),

  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),

  signup: Joi.object().keys({
    name: Joi.string().required().min(3),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    roleid:Joi.string().required().min(3)
  }),

  
};
