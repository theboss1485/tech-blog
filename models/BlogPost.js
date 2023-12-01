/* This file contains the BlogPost model for the database.  The blog_posts table has
a foreign key that references the users table.*/
const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class BlogPost extends Model {}

BlogPost.init(
    {
        id: {

            type: DataTypes.INTEGER,
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

            type: DataTypes.INTEGER,
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

module.exports = BlogPost;