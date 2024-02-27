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

    let blogPosts = [];
    let comments = [];
    await sequelize.drop();
    await sequelize.sync({ force: true });

    let users = await User.bulkCreate(userDataWithHashedPasswords, {

        individualHooks: true,
        returning: true,
    });

    let userData = await User.findAll();
    console.log("user data", userData)

    console.log("Users seeded!");

    console.log("users", users)

    for (const blogPost of blogPostData){

        let randomUserIndex = Math.floor(Math.random() * users.length);
        console.log("randomUserIndex", randomUserIndex);
        let blogPostUserId = users[randomUserIndex].id;
        users.splice(randomUserIndex, 1);

        console.log("BlogPostUserId", blogPostUserId);

        let seededBlogPost = await BlogPost.create({

            ...blogPost,
            user_id: blogPostUserId
        });

        blogPosts.push(seededBlogPost)
    }

    console.log("Blog Posts seeded!");

    for (const comment of commentData){

        let randomCommentBlogPostIndex = Math.floor(Math.random() * blogPosts.length);
        let commentId= blogPosts[randomCommentBlogPostIndex].id;
        blogPosts.splice(randomCommentBlogPostIndex, 1);

        let seededComment = await Comment.create({

            ...comment,
            user_id: commentId,
            blog_post_id: [commentId]
        })

        comments.push(seededComment)
    }

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
