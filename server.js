const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const session = require('express-session')

let SequelizeStore = require("connect-session-sequelize")(session.Store)

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection.js');

const helpers = require('./utils/helpers.js')

const hbs = exphbs.create({helpers});

// I took this 'session' code from activity 17 of Module 14.
const sess = {

    secret: process.env.SESSION_SECRET,
    cookie: {
        
        maxAge: 3600000
    },

    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({

        db: sequelize,
    }),
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use((req, res, next) => {
    if (req.url.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/html');
    }
    next();
  });

app.use(express.static(path.join(__dirname, '/public')));



app.use(require('./controllers'));

sequelize.sync().then(() => {

    console.log("sequelize synchronization successful!");

    app.listen(PORT, () => {

        console.log(`App listening on port ${PORT}!`);
    })

}).catch((error) => {

    console.log(error)
});