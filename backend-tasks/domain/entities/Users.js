const { DataTypes } = require('sequelize');
const sequelize = require('../public/database/db');

const Usuario = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: "Users",
    timestamps: false,
});

module.exports = Usuario;