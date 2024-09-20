const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sistemagestao','root','root',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;