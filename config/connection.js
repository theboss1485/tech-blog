require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(

    process.env.DB_NAME,
    process.env.DB_USER,
    process.DB_PW, 
    {
        host: 'localhost',
        dialect: 'mysql',
        dialectOptions: {
            decimalNumbers: true,
          },
    });

module.exports = sequelize;