const Sequelize = require('sequelize');
const database = require('../database/users');

const users = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false
    },

    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = users;