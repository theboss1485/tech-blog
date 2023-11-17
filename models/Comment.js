const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {

            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        contents: {

            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {

            type: DataTypes.INTEGER,
            allowNull: false,
            references: {

                model: 'user',
                key: 'id'
            }
        },
        blog_post_id: {

            type: DataTypes.INTEGER,
            allowNull: false,
            references: {

                model: 'blogpost',
                key: 'id'
            }
        }

    },
    {
        sequelize,
        timestamps: {

            createdAt: true,
            updatedAt: false
        },
        freezeTableName: false,
        underscored: true,
        modelName: 'BlogPost',
    }
);

module.exports = Comment;