const router = require('express').Router();
const {User, BlogPost, Comment} = require('../../models');
const { sequelize } = require('../../models/User.js');
const renderPlainElements = require('../../utils/render-plain-elements.js');
const renderCommentData = require('../../utils/render-comment-data.js');
//let loggedInUser = require('activeUser');

router.get('/users/', (req, res) =>{

    User.findAll().then((userData) => {

    const users = userData.map((user) => user.get({ plain: true }));
    
    res.json(users);

    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.get('/', (req, res) => {

    res.set('Cache-Control', 'no-store');

    BlogPost.findAll({include: User}).then((blogPostData) => {

        renderPlainElements(blogPostData, "blog-post", req, res, "Tech Blog", renderLoggedInVariable(req), "home");

        res.status(200).json;

    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
})

router.get('/login', (req, res) => {

    res.set('Cache-Control', 'no-store');

    let loginOrLogoutText = undefined;

    if(req.session.logged_in === false || req.session.logged_in === undefined){

        loginOrLogoutText = "Login"
    
    } else if (req.session.logged_in === true){

        loginOrLogoutText = "Logout"
    }
    try{

        let invalidCredentials = "";

        if(req.query.valid === "false"){

            invalidCredentials = "Your username or password is incorrect.  Please try again!";
        }

        res.render('login-signup', {

            logInOrSignUp: "Log In!",
            logInOrSignUpInstead: "Sign Up Instead",
            subtitle: "Log In",
            errorMessage: invalidCredentials,
            loginOrLogout: loginOrLogoutText
        });

        res.status(200).json;
    
    } catch(error) {

        console.log(error);
        res.status(400).json(error);
    }
        
});

router.get('/signup', (req, res) => {

    let invalidCredentials = "";

    if (req.query.taken === "true"){

        invalidCredentials = "This username is already taken.  Please try again!"
    }

    try{

        res.render('login-signup', {

            logInOrSignUp: "Sign Up!",
            logInOrSignUpInstead: "Log In Instead",
            subtitle: "Sign Up",
            errorMessage: invalidCredentials,
            loginOrLogout: req.session.logged_in ? "Logout" : "Login"
        });
    
    } catch(error) {

        console.log(error);
        res.status(400).json(error);
    }
        
});

router.get('/single-blog-post-and-comments', async (req, res) => {

    let blogPostData = await BlogPost.findOne({include: User}, {

        where: {

            id: req.query.id
        }
    });

    let blogPost = blogPostData.get({plain: true});

    let commentData = await Comment.findAll({

        include: [
            {
                model: User,
                where: {

                    id: sequelize.col('comment.user_id')
                }
            }

        ], 

        where: {

            blog_post_id: req.query.id
        }
    });

    let editCommentId = "";

    if(req.query.editCommentId !== null && req.query.editCommentId !== undefined){

        editCommentId = req.query.editCommentId
    }

    renderPlainElements(commentData, "comment", req, res, "Tech Blog", 
                        renderLoggedInVariable(req), "N/A", editCommentId, req.query.cudComment, req.query.newComment,
                         blogPost.user.id, blogPost.id, blogPost.title, blogPost.content, blogPost.user.username, blogPost.createdAt);
});

router.get('/cud-post', async (req, res) => {

    res.render('create-update-delete-post', {

        newPost: "true",
        postPageTitle: "Create New Post",

    });
});

router.get('/cud-post/:id', async (req, res) =>{

    let blogPostData = await BlogPost.findOne({

        where: {

            user_id: req.params.id
        }
    })

    let blogPost = blogPostData.get({plain: true});

    if(req.query.newPost === "true"){

        res.render('create-update-delete', {

            newPost: "false",
            postPageTitle: "Edit or Delete Post",
        });
        
    
    } else if(req.query.newPost === "false"){

        res.render('create-update-delete', {

            newPost: "false",
            postPageTitle: "Edit or Delete Post",
            blogPostTitle: blogPost.title,
            blogPostContents: blogPost.contents
        });
    }
});


// router.get('/blogPosts/:id', (req, res) => {

//     BlogPost.findByPk(req.params.id, {include: User}).then((blogPostData) => {

//         renderBlogPostData(blogPostData, res);
        
//     }).catch((error) => {

//         console.log(error);
//         res.status(400).json(error);
//     });
// });

router.get('/dashboard', async (req, res) => {

    if(req.session.logged_in === false ||req.session.logged_in === undefined ){

        res.redirect('/login');
    
    } else {

        //console.log("req.session.user_id 2", req.session.user_id);

        let blogPostData = await BlogPost.findAll({

        where: {

            user_id: req.session.user_id
        }

    });
    
        renderPlainElements(blogPostData, "blog-post", req, res, "Your Dashboard", renderLoggedInVariable(req), "dashboard");
    }
});

router.get('/comments', async (req, res) => {

    let commentData = await Comment.findAll({

        include: [
            {
                model: User,
                where: {

                    id: sequelize.col('comment.user_id')
                }
            }

        ], 

        where: {

            blog_post_id: req.query.post
        }
    });

    renderPlainElements(commentData, "comment", req, res, "Tech Blog", renderLoggedInVariable(req), "N/A");
});

function renderLoggedInVariable(req){

    let loggedIn = undefined;

    if(req.session.logged_in === true){

        loggedIn = "true";
    
    } else if (req.session.logged_in === false || req.session.logged_in === undefined){

        loggedIn = "false";
    }

    return loggedIn;
}





module.exports = router;