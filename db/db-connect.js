const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('orshimo', 'sqluser', 'Aa123456', {
  host: '127.0.1',
  dialect: 'postgres'
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