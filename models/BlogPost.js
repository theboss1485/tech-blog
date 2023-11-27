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

                model: 'User',
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
        freezeTableName: false,
        underscored: true,
        modelName: 'BlogPost',
    }
);

module.exports = BlogPost;