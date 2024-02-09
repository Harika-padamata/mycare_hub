'use strict';
const MasterRef = require('../models/Master_ref.model');

module.exports = {
  async get_master_ref_value(key, val) {
    try {
      let resp = await MasterRef.findOne({where: { type: key, value : val} })
      return resp.id
    }catch(err) {
      throw err.message
    }

  }
}