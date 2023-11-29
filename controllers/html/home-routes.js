const router = require('express').Router();
const {User, BlogPost, Comment} = require('../../models');
const { sequelize } = require('../../models/User.js');
const renderBlogPosts = require('../../utils/render-blog-posts.js');
const renderPlainElements = require('../../utils/render-blog-posts.js');
const renderSinglePostAndComments = require('../../utils/render-single-post-and-comments.js');
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

router.get('/', async (req, res) => {

    try{

        res.set('Cache-Control', 'no-store');

        let blogPostData = await BlogPost.findAll({include: User})  

        let blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        renderBlogPosts(blogPosts, req, res, "Tech Blog", "home");

    } catch(error){

        console.log(error);
        res.status(400).json(error);
    }
});


router.get('/login', (req, res) => {

    res.set('Cache-Control', 'no-store');

    let loginOrLogoutText = undefined;

    if(req.session.logged_in === false || req.session.logged_in === undefined){

        loginOrLogoutText = "Login"
    
    } else if (req.session.logged_in === true){

        loginOrLogoutText = "Logout"
    }
    

        let invalidCredentials = "";

        if(req.query.valid === "false"){

            invalidCredentials = "Your username or password is incorrect.  Please try again!";
        }

    try{

        res.render('login-signup', {

            logInOrSignUp: "Log In!",
            logInOrSignUpInstead: "Sign Up Instead",
            subtitle: "Log In",
            errorMessage: invalidCredentials,
            loginOrLogout: loginOrLogoutText
        });
    
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

    let error = "";
    
    if(req.query.error === "invalidCommentSubmission"){

        error = `The content of a comment must not be left blank.  Try again.`
    }

    try{

        let blogPostData = await BlogPost.findOne({
        
        include: [
            {
                model: User
            }
        ],

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

        let comments = commentData.map((comment) => comment.get({ plain: true }));

        // console.log("blog post", blogPost);

        // let editCommentId = "";

        // if(req.query.editCommentId !== null && req.query.editCommentId !== undefined){

        //     editCommentId = req.query.editCommentId
        // }

        renderSinglePostAndComments(comments, blogPost, req, res, error);

    } catch(error){

        console.log(error);
        res.status(400).json(error);
    }
});

// router.get('/cud-post', async (req, res) => {

//     try{

//         res.render('create-update-delete', {

//             newPost: "true",
//             postPageTitle: "Create New Post",
    
//         });

//     } catch{

//         console.log(error);
//         res.status(400).json(error);
//     }

    
// });

// router.get('/cud-post/:id', async (req, res) =>{

//     let blogPostData = await BlogPost.findOne({

//         where: {

//             user_id: req.params.id
//         }
//     })

//     let blogPost = blogPostData.get({plain: true});

//     if(req.query.newPost === "true"){

//         res.render('create-update-delete', {

//             newPost: "false",
//             postPageTitle: "Edit or Delete Post",
//         });
        
    
//     } else if(req.query.newPost === "false"){

//         res.render('create-update-delete', {

//             newPost: "false",
//             postPageTitle: "Edit or Delete Post",
//             blogPostTitle: blogPost.title,
//             blogPostContents: blogPost.contents
//         });
//     }
// });

// router.get('/blogPosts/:id', (req, res) => {

//     BlogPost.findByPk(req.params.id, {include: User}).then((blogPostData) => {

//         renderBlogPostData(blogPostData, res);
        
//     }).catch((error) => {

//         console.log(error);
//         res.status(400).json(error);
//     });
// });

router.get('/dashboard', async (req, res) => {

    try{

        if(req.session.logged_in === false ||req.session.logged_in === undefined ){

            res.redirect('/login');
        
        } else {

            let error = "";

            if(req.query.error === "invalidPostSubmission"){

                error = `The title and content of a post must not be left blank. A post title can only contain the special characters '!', ':', '?', and '-'
                        and can't start with those characters or end with ':' or '-'.  Try again'`
            }

            //console.log("req.session.user_id 2", req.session.user_id);

            let blogPostData = await BlogPost.findAll({

            where: {

                user_id: req.session.user_id
            }

            });

            let blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));


            renderBlogPosts(blogPosts, req, res, "Your Dashboard", "dashboard", error)

            // if(req.query.cudPost !== "true"){

            //     renderPlainElements(blogPostData, "blog-post", req, res, "Your Dashboard", renderLoggedInVariable(req), "dashboard");
            
            // } else {

            //     if(req.query.newElement === "true"){

            //         renderPlainElements(blogPostData, "blog-post", req, res, "Your Dashboard", renderLoggedInVariable(req), "dashboard", req.query.cudPost, req.query.newElement, errorMessage, "");

            //     } else {

            //         renderPlainElements(blogPostData, "blog-post", req, res, "Your Dashboard", renderLoggedInVariable(req), 
            //                             "dashboard", req.query.cudPost, req.query.newElement, errorMessage, req.query.postId);
            //     }
            // }
        }

    } catch {

        console.log(error);
        res.status(400).json(error);
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

    try{

        renderPlainElements(commentData, "comment", req, res, "Tech Blog", renderLoggedInVariable(req), "N/A");
    
    } catch {

        console.log(error);
        res.status(400).json(error);
    }
    
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