
/* This file performs route modularization so that the API routes and the home routes
can be in different files. */
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./html/home-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);

module.exports = router;