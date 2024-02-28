/* This file contains the User model for the database.  */
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
    {
        id: {

            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {

            type: DataTypes.STRING,
            allowNull: false,
            validate: {

                is: /^[a-zA-Z0-9]+$/
            }
        },
        password: {

            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

User.beforeCreate((user, options) => {

    // Convert the string ID to an integer
    user.id = parseInt(user.id, 10);
});

module.exports = User;