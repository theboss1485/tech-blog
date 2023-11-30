/* The purpose of this file is to modularize the API routes so that
they can be placed into different files, rather than having them all 
in one large file.*/

const router = require('express').Router();
const blogPostRoutes = require('./blog-post-routes');
const commentRoutes = require('./comment-routes');
const userRoutes = require('./user-routes');

router.use('/blogPosts', blogPostRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);

module.exports = router