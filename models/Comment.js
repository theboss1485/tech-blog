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
        content: {

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

                model: 'blog_posts',
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
        modelName: 'Comment',
    }
);

module.exports = Comment;