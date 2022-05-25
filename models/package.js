//const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db-connect');
const { DataTypes } = require("sequelize");

const Package = sequelize.define('Package', {
  // Model attributes are defined here
  packageName: {
    type: DataTypes.STRING
  },
  packageType: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  duration: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  generalDescription: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  detailedDescription: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  pricePerPerson: {
    type: DataTypes.INTEGER
    // allowNull defaults to true
  },
  packageCoverPhoto: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

module.exports = Package;