// I took code to seed the database from activity 7 of module 14.

const sequelize = require('../config/connection');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const userData = require('./user-seeds.json');
const blogPostData = require('./blog-post-seeds.json');
const commentData = require('./comment-seeds.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  console.log("Users seeded!");

  await BlogPost.bulkCreate(blogPostData, {
    individualHooks: true,
    returning: true,
  });

  console.log("Blog Posts seeded!");

  await Comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  console.log("Comments seeded!");

  process.exit(0);
};

try{
    seedDatabase();

} catch(error){

    console.log(error)
}
