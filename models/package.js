//const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/db-connect');
const { DataTypes } = require("sequelize");

const Package = sequelize.define('Package', {
  // Model attributes are defined here
  packageName: {
    type: DataTypes.STRING
  },
  packageNameRU: {
    type: DataTypes.STRING
  },
  packageNameGE: {
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
  durationRU: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  durationGE: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  generalDescription: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  generalDescriptionRU: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  generalDescriptionGE: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  detailedDescription: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  detailedDescriptionRU: {
    type: DataTypes.TEXT
    // allowNull defaults to true
  },
  detailedDescriptionGE: {
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
  },
  packageCoverPhoto2: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  packageCoverPhoto3: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

module.exports = Package;