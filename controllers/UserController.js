'use strict';
const Joi = require('joi'),
{validateSignup, validateLogin, validateEmail, validateUserDetails, validateAddress} = require('../utils/schema'),
{signupMapping} = require('../utils/mapping'),
{get_master_ref_value} = require('../utils/commonFunctions'),
{ Op } = require("sequelize"),
UserService = require('../services/users.service'),
bcrypt = require('bcrypt'),
jwt = require('jsonwebtoken'),
userService = new UserService(),
sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);


module.exports = {

	signup : async (req, res)=> {
    console.log("signup");
		try {
      let valid = await validateSignup(req.body)
      let mappedObj = await signupMapping(req.body)
      let user = await userService.get_user({where : {[Op.or] : [{email : mappedObj.user_obj.email}, {mobile : mappedObj.user_obj.mobile}]}})
      if (!user) {
        let new_user = await userService.set_user(mappedObj.user_obj)
        mappedObj.participant_obj['user_id'] = new_user.user_id
        let new_participant = await userService.set_participant(mappedObj.participant_obj)
        res.status(200).json({status : 200, message : 'Account successfully created'})
      } else {
        res.status(400).json({status : 400, message : 'user already existed with this email/phone number'})
      }
		} catch(err) {
      console.log(err)
			res.status(400).json({status : 400, message : err.message})
		}
	},

  login : async (req, res)=> {
    console.log("login");
    // console.log(req.body);
    try {
      let validate = await validateLogin(req.body)
      let user = await userService.get_user({where : {[Op.or] : [{email : req.body.username}, {mobile : req.body.username}]}})
      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);
        if (match) {
          let token = await jwt.sign({data: user.user_id}, 'mycarehub_secret', { expiresIn: 60 * 30 });
          res.status(200).json({status : 200, message : 'Logged in successfully', data : token})
        } else {
          res.status(400).json({status : 400, message : 'Invalid Creditials'})
        }
      } else {
        res.status(400).json({status : 400, message : 'Invalid Creditials'})
      }
    } catch(err) {
      res.status(400).json({status : 400, message : err.message})
    }
  },
  
	send_email : async (req, res) => {
		console.log("send_email");
    // console.log(req.body)  
    try {
      let valid = await validateEmail(req.body)
      let type = req.body.type == 'care' ? 'Looking for care' : 'A support worker'
      let msg = {
        to: process.env.TO_EMAIL,
        from: process.env.FROM_EMAIL, // Use the email address or domain you verified above
        subject: process.env.EMAIL_SUB,
        html: '<p><b>Dear Admin</b></p><p>Please find bellow new user details</p><p>Name : '+req.body.first_name+' '+req.body.last_name+'</p><p>Inquiry For : '+type+'</p><p>Email : '+req.body.email+'</p><p>Contact Number : '+req.body.phone+'</p><p>Message : '+req.body.message+'</p>',
      };
      sgMail.send(msg).then((resp) => { 
        // console.log(resp);
        res.status(200).json({status : 200, message : 'Email sent successfully'}) 
      }, error => {
        console.error(error);
        if (error.response) {
          console.error(error.response.body)
          res.status(400).json({status : 400, message : error.message})
        }
      });
    } catch(err) {
      console.log(err.message)
      res.status(400).json({status : 400, message : err.message})
    }
	},

  get_user_details: async (req, res)=> {
    console.log('get_user_details');
    try {
      let user = await userService.get_user({where : {user_id : req.user.user_id}})
      if(user) {
        res.status(200).json({status:200, message : 'User details', data : user})
      } else {
        res.status(400).json({status: 400, message: 'Unable to find user details'})
      }
    } catch(err) {
      res.status(500).json({status: 500, message: err.message})
    }
  },

  update_user_details: async (req, res)=> {
    console.log('update_user_details')
    try {
      await validateAddress(req.body.address);
      await validateUserDetails(req.body)
      let addr_type = await get_master_ref_value('address_type', 'residential')
      req.body.address['address_type'] = addr_type
      let addr_id = await userService.setAddress(req.body.address)
      req.body['address_id'] = addr_id;
      await userService.updateUser(req.body, req.user.user_id);
      res.status(200).json({status:200, message: 'user details are updated successfully'})
    }catch(err) {
      res.status(403).json({status: 403, message : err.message})
    }
  },

  get_emergency_contacts: async (req, res)=> {
    console.log('get_emergency_contacts')
    let valid = await validateContactsDetails(req.body)
  },

  save_emergency_contacts: async (req, res)=> {
    console.log('update_emergency_contacts')
    let valid = await validateContactsDetails(req.body)
  }

}