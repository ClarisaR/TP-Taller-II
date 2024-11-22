const { DataTypes } = require('sequelize');
const sequelize = require('../public/database/db');

const Task = sequelize.define('Tasks', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT({length: 1}),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }

}, {
    tableName: "Tasks",
    timestamps: false
});

module.exports = Task;