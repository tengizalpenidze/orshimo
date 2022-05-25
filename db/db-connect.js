const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('cooking_app', 'sqluser', 'Aa123456', {
  host: '127.0.1',
  dialect: 'mysql'
});

(async()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;