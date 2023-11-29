const router = require('express').Router();
const {User, BlogPost} = require('../../models');
const renderPlainElements = require('../../utils/render-blog-posts.js');


router.get('/:id', async (req, res) => {

    // let userData = User.findOne({
        

    //     where: {

    //         username: req.params.username
    //     }
    // })

    // let userInQuestion = userData.get({plain: true});


    let userBlogPostData = await BlogPost.findAll({

        where: {

            user_id: req.params.id
        }
    })


    //renderPlainElements(userBlogPostData, "blog-post", req, res, "Your Dashboard", loggedIn, "dashboard");
});

router.post('/', (req, res) => {

    BlogPost.create({

        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    
    }).then((blogPost) => {

        res.status(200).json(blogPost);
    
    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.put('/:id', (req, res) => {

    BlogPost.update(
        
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {

                id: req.params.id,
            }
        }

    ).then((update) => {

        res.status(200).json(update);
    
    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.delete('/:id', (req, res) => {

    BlogPost.destroy({

        where: {

            id: req.params.id
        }
    
        }).then((deletion) => {

        res.status(200).json(deletion);
    
    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

module.exports = router;