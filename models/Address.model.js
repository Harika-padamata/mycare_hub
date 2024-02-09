'use strict';
const sequelize = require("sequelize"),
mysqlDB = require("../db");

const Address = mysqlDB.define(
  "address",
  {
    // Model attributes are defined here
    id: {
      type: sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    address_line: {
      type: sequelize.STRING,
      allowNull: false,
    },
    suburb: {
      type: sequelize.STRING,
      allowNull: false,
    },
    postcode: {
      type: sequelize.STRING,
      allowNull: false,
    },
    address_type: {
       type: sequelize.STRING,
       allowNull: false,
    }
});


module.exports = Address