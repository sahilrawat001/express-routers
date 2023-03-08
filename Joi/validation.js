const Joi = require("joi");



const userSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
  name: Joi.string().min(4).required(),
  age: Joi.number().integer().min(1).max(90).required(),
  gender: Joi.string().valid("m", "f").required(),
  type: Joi.string().valid("u").required()
});
const contactSchema = Joi.object().keys({
  id: Joi.number().integer().required(),
  contact: Joi.number().integer().required(),
  state: Joi.string().required(),
  type: Joi.string().valid("c").required(),
  mail: Joi.string().email({ tlds: { allow: ['com', 'in', 'net'] } }).lowercase(),
});
const userUpdate = Joi.object().keys({
  name: Joi.string().min(4),                                                   
  age: Joi.number().integer().min(1).max(90),
  gender: Joi.string().valid("m", "f")
})

const contactUpdate = Joi.object().keys({
  contact: Joi.number().integer(),
  state: Joi.string(),
   mail: Joi.string().email({ tlds: { allow: ['com', 'in', 'net'] } }).lowercase()
})
 
module.exports = { userSchema, contactSchema,userUpdate,contactUpdate };