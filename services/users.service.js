"use strict";
const Address = require('../models/Address.model');
const User = require('../models/User.model'),
Participant = require('../models/Participant.model');

class UserService {

	async get_user(qry) {
		return new Promise(async (resolve, reject) => {
			try {
		    let user = await User.findOne(qry)
				resolve(user)
			} catch(err) {
				reject(err)
			}
		})
  }

  
	async set_user(userObj) {
		return new Promise(async (resolve, reject) => {
			try {
				let user = await User.create(userObj);
				resolve(user)
			}catch(err) {
				reject(err)
			}
		})
  }

  async get_participant(qry) {
		return new Promise(async (resolve, reject) => {
			try {
		    let user = await Participant.findOne(qry)
				resolve(user)
			} catch(err) {
				reject(err)
			}
		})
  }

  
	async set_participant(userObj) {
		return new Promise(async (resolve, reject) => {
			try {
				let user = await Participant.create(userObj);
				resolve(user)
			}catch(err) {
				reject(err)
			}
		})
  }

  async setAddress(addrObj) {
    return new Promise(async (resolve, reject) => {
			try {
				let addr = await Address.create(addrObj);
				resolve(addr.id)
			}catch(err) {
				reject(err)
			}
		})
  }

  async updateUser(userObj, userId) {
    return new Promise(async (resolve, reject) => {
			try {
				let user = await User.update(userObj,{where:{userId : userId}});
				resolve(user)
			}catch(err) {
				reject(err)
			}
		})
  }
  
}

module.exports = UserService