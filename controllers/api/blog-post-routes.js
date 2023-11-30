const router = require('express').Router();
const {BlogPost} = require('../../models');


// router.get('/:id', async (req, res) => {

//     let userBlogPostData = await BlogPost.findAll({

//         where: {

//             user_id: req.params.id
//         }
//     })
// });


// This POST route creates a blog post and sends it to the database.
router.post('/', async (req, res) => {

    if(req.session.logged_in){

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
    
    } else {

        res.status(301).redirect('../../login')
    } 
});

// This PUT route updates a blog post by its ID.
router.put('/:id', async (req, res) => {

    if(req.session.logged_in){

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

    } else {

        res.status(301).redirect('../../login')
    } 
    
});

/*This DELETE route deletes a blog post by its ID.  The reason I am finding the blog post before deleting it is to
circumvent the bug in sequelize discussed here: https://github.com/sequelize/sequelize/issues/8444*/
router.delete('/:id', async (req, res) => {

    if(req.session.logged_in){

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
    
    } else {

        res.status(301).redirect('../../login')
    }
});

// router.delete('/:id', (req, res) => {

//     BlogPost.destroy({

//         where: {

//             id: req.params.id
//         }
    
//         }).then((deletion) => {

//         res.status(200).json(deletion);
    
//     }).catch((error) => {

//         console.log(error);
//         res.status(400).json(error);
//     });
// });



module.exports = router;