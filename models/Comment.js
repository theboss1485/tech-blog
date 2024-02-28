/* This file contains the Comment model for the database.  The comments table has two foreign keys, 
one that references the blog_posts table and one that references the users table.*/
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
    {
        id: {

            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        content: {

            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {

            type: DataTypes.BIGINT,
            allowNull: false,
            references: {

                model: 'user',
                key: 'id'
            }
        },
        blog_post_id: {

            type: DataTypes.BIGINT,
            allowNull: false,
            references: {

                model: 'blog_post',
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
        freezeTableName: true,
        underscored: true,
        modelName: 'comment',
    }
);

Comment.beforeCreate((comment, options) => {

    // Convert the string ID to an integer
    comment.id = parseInt(comment.id, 10);
    comment.blog_post_id = parseInt(comment.blog_post_id, 10);
    comment.user_id = parseInt(comment.user_id, 10);
});

module.exports = Comment;