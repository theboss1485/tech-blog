const router = require('express').Router();
const {User, BlogPost, Comment} = require('../../models');
const { sequelize } = require('../../models/User.js');
const renderBlogPosts = require('../../utils/render-blog-posts.js');
const renderSinglePostAndComments = require('../../utils/render-single-post-and-comments.js');
const {baseAuthenticateWhetherLoggedIn, loggedInAuthenticationBeforeCud } = require('../../utils/authentication.js')

// This GET route gets the home page and renders the current blog posts.
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

// This GET route gets the Log In page.
router.get('/login', (req, res) => {

    res.set('Cache-Control', 'no-store');

    let postId = undefined;

    if(req.query.blogPostId){

        postId = req.query.blogPostId

    } else {

        postId = "";
    }

        let invalidCredentials = "";

        if (req.query.valid === "false"){

            invalidCredentials = "Your username or password is incorrect.  Please try again!";
        }

    try{

        res.render('login-signup', {

            pageTitle: "Tech Blog",
            logInOrSignUp: "Log In!",
            logInOrSignUpInstead: "Sign Up Instead",
            subtitle: "Log In",
            postId,
            errorMessage: invalidCredentials,
        });
    
    } catch(error) {

        console.log(error);
        res.status(400).json(error);
    }
        
});

// This GET route gets the Sign Up page.
router.get('/signup', (req, res) => {

    let invalidCredentials = "";

    if (req.query.taken === "true"){

        invalidCredentials = "This username is already taken.  Please try again!"
    }

    try{

        res.render('login-signup', {

            pageTitle: "Tech Blog",
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

/* When a user clicks a blog post on the home page, this route is called. It renders the blog post
that was clicked, plus any comments belonging to it.*/
router.get('/single-blog-post-and-comments', loggedInAuthenticationBeforeCud, async (req, res) => {

    res.set('Cache-Control', 'no-store');

    let error = "";
    
    if(req.query.error === "invalidCommentSubmission"){

        error = `The content of a comment must not be left blank.  Try again.`
    }

    try{

        let blogPostData = await BlogPost.findOne(
            
            {
                include: [
                    {
                        model: User
                    }
                ],

                where: {

                    id: req.query.id
                }
            }
        );

        let blogPost = blogPostData.get({plain: true});

        let commentData = await Comment.findAll(
            
            {
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
            }
        );

        let comments = commentData.map((comment) => comment.get({ plain: true }));

        renderSinglePostAndComments(comments, blogPost, req, res, error);

    } catch(error){

        console.log(error);
        res.status(400).json(error);
    }
});

/* This GET route gets the dashboard page and renders the blog posts there.  If the user
makes an invalid blog post submission, it assists with rendering an error message*/
router.get('/dashboard', baseAuthenticateWhetherLoggedIn, async (req, res) => {

    try {

        let error = "";

        if(req.query.error === "invalidPostSubmission"){

            error = `The title and content of a post must not be left blank. A post title can only contain the special characters '!', ':', '?', and '-'
                     and can't start with those characters or end with ':' or '-'.  Try again'`
        }

        let blogPostData = await BlogPost.findAll(

            {

                where: {

                    user_id: req.session.user_id
                }

            }
        );

        let blogPosts = blogPostData.map((blogPost) => blogPost.get({ plain: true }));

        renderBlogPosts(blogPosts, req, res, "Your Dashboard", "dashboard", error);

    } catch(error) {

        console.log(error);
        res.status(400).json(error);
    }    
});

module.exports = router;