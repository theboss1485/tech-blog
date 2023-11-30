const router = require('express').Router();
const {Comment} = require('../../models');

// This POST route creates a new comment.
router.post('/', async (req, res) => {

    if (req.session.logged_in){

        try {

            let comment = await Comment.create(
            
                {
                    content: req.body.content,
                    user_id: req.body.user_id,
                    blog_post_id: req.body.blog_post_id
                }
            )
    
        res.status(200).json(comment);
        
        } catch (error) {
    
            console.log(error);
            res.status(500).json(error);
        }

    } else {

        res.status(301).redirect('../../login');
    }
    
});

// This PUT route updates a comment by its ID.
router.put('/:id', async (req, res) => {

    if (req.session.logged_in){

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

    } else {

        res.status(301).redirect('../../login');
    }
});


//This DELETE route deletes a comment by its ID.
router.delete('/:id', async (req, res) => {

    if(req.session.logged_in){

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
    
    } else {

        res.status(301).redirect('../../login');
    }

});

module.exports = router;