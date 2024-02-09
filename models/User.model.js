'use strict';
const sequelize = require("sequelize"),
bcrypt = require('bcrypt'),
mysqlDB = require("../db");

const User = mysqlDB.define(
  "users",
  {
    // Model attributes are defined here
    user_id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: sequelize.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
    },
    password: {
      type: sequelize.STRING,
      allowNull: false,
    },
    mobile: {
       type: sequelize.STRING,
       allowNull: false,
       unique: true,
     },
    participant_flag: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    user_type_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    emergency_contact_id: {
      type: sequelize.STRING,
    },
    address_id: {
      type: sequelize.INTEGER,
    },
    status_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    }
  }
);

User.beforeCreate((user, options) => {
  return bcrypt.hash(user.password, 10).then(hash => {
    user.password = hash;
  }).catch(err => { 
    throw new Error(); 
  });
});


module.exports = User