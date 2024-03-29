
// This connection allows the server-side javaScript to connect to the database.
const Sequelize = require('sequelize');
require('dotenv').config();
const pg = require('pg');

let sequelize

if (process.env.JAWSDB_URL) {

    sequelize = new Sequelize(process.env.JAWSDB_URL);

} else if (process.env.COCKROACHDB_URL){

    sequelize = new Sequelize(process.env.COCKROACHDB_URL, {
        dialectModule: pg
    });

}  else {

    sequelize = new Sequelize(

        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD, 
        {
            host: '127.0.0.1',
            dialect: 'mysql',
            dialectOptions: {
                decimalNumbers: true,
              },
        });
}



module.exports = sequelize;