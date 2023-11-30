/* This file contains the Comment model for the database.  The comments table has two foreign keys, 
one that references the blog_posts table and one that references the users table.*/
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

                model: 'users',
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