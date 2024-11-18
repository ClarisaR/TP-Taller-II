const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("tallerW2", "root", "admin", {
    host: "localhost",
    dialect: "mysql",
});

module.exports = sequelize;