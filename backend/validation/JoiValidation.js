const { Joi } = require('celebrate');

const signupSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/w?w?w?.+/i),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const signinSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const userIdSchema = {
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
};

const userProfileSchema = {
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
};

const userAvatarSchema = {
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/https?:\/\/w?w?w?.+/i),
  }),
};

module.exports = {
  signupSchema,
  signinSchema,
  userIdSchema,
  userProfileSchema,
  userAvatarSchema,
};
