const router = require('express').Router();
const {User, BlogPost} = require('../../models');



router.post('/', (req, res) => {

    BlogPost.create({

        title: req.body.title,
        contents: req.body.contents,
        user_id: req.body.user_id
    
    }).then((blogPost) => {

        res.status(200).json(blogPost);
    
    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.update('/:id', (req, res) => {

    BlogPost.update(
        
        {
            title: req.body.title,
            contents: req.body.contents
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