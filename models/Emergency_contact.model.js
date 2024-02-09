'use strict';
const sequelize = require("sequelize"),
mysqlDB = require("../db");

const EmergencyContacts = mysqlDB.define(
  "emergency_contact",
  {
    // Model attributes are defined here
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    first_name: {
      type: sequelize.STRING,
      allowNull: false
    },
    last_name: {
      type: sequelize.STRING,
      allowNull: false
    },
    mobile: {
      type: sequelize.STRING,
      allowNull: false
    },
    relation: {
       type: sequelize.STRING,
       allowNull: false
    }
});


module.exports = EmergencyContacts