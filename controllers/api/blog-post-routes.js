const router = require('express').Router();
const {BlogPost} = require('../../models');
const {baseAuthenticateWhetherLoggedIn} = require('../../utils/authentication.js')

// This POST route creates a blog post and sends it to the database.
router.post('/', baseAuthenticateWhetherLoggedIn, async (req, res) => {

    try{

        let blogPost = await BlogPost.create(
            
            {
                title: req.body.title,
                content: req.body.content,
                user_id: req.session.user_id
            }
        );

        res.status(200).json(blogPost);
    
    } catch (error){

        console.log(error);
        res.status(500).json(error);
    }
});

// This PUT route updates a blog post by its ID.
router.put('/:id', baseAuthenticateWhetherLoggedIn, async (req, res) => {

    try {

        let update = await BlogPost.update(
        
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
    
                    id: req.params.id,
                }
            }
        )

        res.status(200).json(update);

    } catch(error) {

        console.log(error);
        res.status(500).json(error);
    } 
});

/*This DELETE route deletes a blog post by its ID.  The reason I am finding the blog post before deleting it is to
circumvent the bug in sequelize discussed here: https://github.com/sequelize/sequelize/issues/8444*/
router.delete('/:id', baseAuthenticateWhetherLoggedIn, async (req, res) => {

    try {

        let blogPost = await BlogPost.findOne({

            where: {

                id: req.params.id,

            },
        });

        let deletion = await blogPost.destroy();

        res.status(200).json(deletion);

    } catch(error) {

        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;