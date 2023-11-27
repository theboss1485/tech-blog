const router = require('express').Router();
const {Comment, User, BlogPost} = require('../../models');

// router.get('/', (req, res) => {

//     Comment.findAll({include: User, include: BlogPost}).then((blogPostData) => {

//     }).catch((error) => {

//         console.log(error);
//         res.status(400).json(error);
//     });
// })



router.post('/', (req, res) => {

    Comment.create({

        title: req.body.title,
        contents: req.body.contents,
        user_id: req.body.user_id,
        blog_post_id: req.body.blog_post_id
    
    }).then((comment) => {

        res.status(200).json(comment);
    
    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.put('/:id', (req, res) => {

    Comment.update(
        
        {
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

     Comment.destroy({

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