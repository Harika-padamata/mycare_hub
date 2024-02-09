'use strict';
const MasterRef = require('../models/Master_ref.model');

module.exports = {
  signupMapping : async (obj)=> {
    let rows = await MasterRef.findOne({where: { type: 'participant_flag', value : obj.type == 'self' ? 'y' : 'n' } })
    let user_type_id = await MasterRef.findOne({where: {type : 'user_type', value : obj.user_type == 'participant' ? 'participant' : 'supportworker'}})
    let status_id = await MasterRef.findOne({where: {type : 'user_status', value : 'n'}})
    let user_obj = {}, participant_obj = {};
    user_obj.name = obj.first_name +' '+obj.last_name;
    user_obj.email = obj.email
    user_obj.password = obj.password
    user_obj.mobile = obj.phone
    user_obj.participant_flag = rows.id
    user_obj.user_type_id = user_type_id.id
    user_obj.status_id = status_id.id
    user_obj.address_id = 0
    user_obj.emergency_contact_id = 0
    if (obj.type == 'someone') {
      participant_obj.first_name = obj.participant_first_name
      participant_obj.last_name = obj.participant_last_name
      participant_obj.email = obj.participant_email
      participant_obj.mobileno = obj.participant_phone
    } else {
      participant_obj.first_name = obj.first_name
      participant_obj.last_name = obj.last_name
      participant_obj.email = obj.email
      participant_obj.mobileno = obj.phone
    }
    return {user_obj : user_obj, participant_obj : participant_obj}
  }
}