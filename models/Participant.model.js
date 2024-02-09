'use strict';
const sequelize = require("sequelize"),
mysqlDB = require("../db");

const Participant = mysqlDB.define('participant', {
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
  gender_id: {
    type: sequelize.STRING,
    allowNull: true,
  },
  date_of_birth: {
    type: sequelize.STRING,
    allowNull: true
  },
  user_id: {
    type: sequelize.STRING,
    allowNull: true
  },
  plan_type: {
    type: sequelize.STRING,
    allowNull: true
  },
  Min_of_hours_required: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  plan_manager_id: {
    type: sequelize.INTEGER,
    allowNull: true
  },
  due_date_terms: {
    type: sequelize.STRING
  }
}, {
  timestamps: true,
  freezeTableName: true
});

module.exports = Participant
