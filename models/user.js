//const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db-connect');
const { DataTypes } = require("sequelize");

const User = sequelize.define('User', {
  // Model attributes are defined here
  userFullName: {
    type: DataTypes.STRING
  },
  userRole: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  passwordHash: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  profilePhoto: {
    type: DataTypes.BLOB
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

module.exports = User;