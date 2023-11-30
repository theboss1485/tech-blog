const router = require('express').Router();
const {Comment} = require('../../models');
const {baseAuthenticateWhetherLoggedIn} = require('../../utils/authentication.js')

// This POST route creates a new comment.
router.post('/', baseAuthenticateWhetherLoggedIn, async (req, res) => {

    try {

        let comment = await Comment.create(
        
            {
                content: req.body.content,
                user_id: req.body.user_id,
                blog_post_id: req.body.blog_post_id
            }
        )

    res.status(200).json(comment);
    
    console.log("outside");
    } catch (error) {

        console.log(error);
        res.status(500).json(error);
    }
});

// This PUT route updates a comment by its ID.
router.put('/:id', baseAuthenticateWhetherLoggedIn, async (req, res) => {

    try {

        let update = await Comment.update(
        
            {
                content: req.body.content
            },
            {
                where: {
    
                    id: req.params.id,
                }
            }
        )

        res.status(200).json(update);

    } catch(error){

        console.log(error);
        res.status(500).json(error);
    }
});


//This DELETE route deletes a comment by its ID.
router.delete('/:id', baseAuthenticateWhetherLoggedIn, async (req, res) => {

    try {

        let deletion = await Comment.destroy(
            
            {
                where: {
        
                    id: req.params.id
                }
            }
        )

        res.status(200).json(deletion);

        } catch(error) {

        console.log(error);
        res.status(500).json(error);
    }
});

module.exports = router;