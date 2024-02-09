const Joi = require('joi');

module.exports = {
  validateSignup : async(obj)=> {
    return new Promise(async (resolve, reject) => {
      let schema = Joi.object({
        type: Joi.string().required().valid('self', 'someone'),
        user_type : Joi.string().required().valid('participant', 'supportworker'),
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.string().email().required().messages({
          'string.email': `Please enter a valid "Email"`,
          'string.empty': `"Email" cannot be an empty`
        }),
        password: Joi.string().min(3).max(15).required(),
        confirm_password: Joi.string().valid(Joi.ref('password')).required(),
        participant_first_name: Joi.alternatives().conditional('type', { is: 'someone', then: Joi.string().required() }),
        participant_last_name: Joi.alternatives().conditional('type', { is: 'someone', then: Joi.string().required() }),
        participant_email: Joi.alternatives().conditional('type', { is: 'someone', then: Joi.string().email().required() }),
        participant_phone: Joi.alternatives().conditional('type', { is: 'someone', then: Joi.string().required() }),
        
      })
      try {
        let is_valid = await schema.validateAsync(obj, {allowUnknown: true})
        resolve('success')
      } catch(err) {
        reject(err)
      }
    })
  },

  validateLogin : async(obj)=> {
    return new Promise(async (resolve, reject) => {
      let schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(3).max(15).required(),
      })
      try {
        let is_valid = await schema.validateAsync(obj, {allowUnknown: true})
        resolve('success')
      } catch(err) {
        reject(err)
      }
    })
  },

  validateEmail : async(obj)=> {
    return new Promise(async (resolve, reject) => {
      let schema = Joi.object({
        type: Joi.string().required(),
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.string().email().required().messages({
          'string.email': `Please enter a valid "Email"`,
          'string.empty': `"Email" cannot be an empty`
        }),
        message: Joi.string()
      })
      try {
        let is_valid = await schema.validateAsync(obj, {allowUnknown: true})
        resolve('success')
      } catch(err) {
        reject(err)
      }
    })
  },

  validateUserDetails : async(obj)=> {
    return new Promise(async (resolve, reject) => {
      let schema = Joi.object({
        first_name: Joi.string().min(3).max(30).required(),
        last_name: Joi.string().min(3).max(30).required(),
        phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
        email: Joi.string().email().required().messages({
          'string.email': `Please enter a valid "Email"`,
          'string.empty': `"Email" cannot be an empty`
        }),
        dob: Joi.date().required(),
        gender: Joi.string().required().valid('male', 'female')
      })
      try {
        let is_valid = await schema.validateAsync(obj, {allowUnknown: true})
        resolve('success')
      } catch(err) {
        reject(err)
      }
    })
  },
  
  validateAddress : async(obj)=> {
    return new Promise(async (resolve, reject) => {
      let schema = Joi.object({
        address_line: Joi.string().min(3).max(300).required(),
        state: Joi.string().min(3).max(30).required(),
        postcode: Joi.string().length(6).pattern(/^[0-9]+$/).required(),
        suburb: Joi.date().required()
      })
      try {
        let is_valid = await schema.validateAsync(obj, {allowUnknown: true})
        resolve('success')
      } catch(err) {
        reject(err)
      }
    })
  }

  
}