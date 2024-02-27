// This file seeds the database.  I took most of the code to seed the database from activity 7 of module 14.

const sequelize = require('../config/connection');
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const userData = require('./user-seeds.json');
const blogPostData = require('./blog-post-seeds.json');
const commentData = require('./comment-seeds.json');
const bcrypt = require('bcrypt');

let userDataWithHashedPasswords = hashUserPasswords(userData);

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userDataWithHashedPasswords, {
    individualHooks: true,
    returning: true,
  });

  let userData = await User.findAll();
  console.log("user data", userData)

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

/* This function hashes the user seed passwords.  I didn't hide the user seed passwords 
with environment variables, but I did hash them here.*/
function hashUserPasswords(userData){

    for(let counter = 0; counter < userData.length; counter++){

        let hashedPassword = bcrypt.hashSync(userData[counter].password, 10)

        userData[counter].password = hashedPassword;
    }

    return userData;
}
