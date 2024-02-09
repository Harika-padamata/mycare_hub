'use strict';
const sequelize = require("sequelize"),
mysqlDB = require("../db");

const MasterRef = mysqlDB.define('master_ref', {
  // Model attributes are defined here
  id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  type: {
    type: sequelize.STRING,
    allowNull: false
  },
  value: {
    type: sequelize.STRING,
    allowNull: false,
  },
  status: {
    type: sequelize.STRING,
    allowNull: false
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = MasterRef
