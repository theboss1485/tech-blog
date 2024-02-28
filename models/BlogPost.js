/* This file contains the BlogPost model for the database.  The blog_posts table has
a foreign key that references the users table.*/
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
    {
        id: {

            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {

            type: DataTypes.STRING,
            allowNull: false
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
        }

    },
    {
        sequelize,
        timestamps: {

            createdAt: true,
            updatedAt: false,
        },
        freezeTableName: true,
        underscored: true,
        modelName: 'blog_post',
    }
);

BlogPost.beforeCreate((blogPost, options) => {

    // Convert the string ID to an integer
    blogPost.id = parseInt(blogPost.id, 10);
    blogPost.user_id = parseInt(blogPost.user_id, 10);
});

module.exports = BlogPost;