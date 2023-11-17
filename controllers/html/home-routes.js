const router = require('express').Router();

router.get('/users/', (req, res) =>{

    User.findAll().then((userData) => {

    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.get('/blogPosts/', (req, res) => {

    BlogPost.findAll({include: User}).then((blogPostData) => {

    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
})

router.get('/blogPosts/:id', (req, res) => {

    BlogPost.findByPk(req.params.id, {include: User}).then((blogPostData) => {
        
    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.get('/comments/:id', (req, res) => {

    Comment.findByPk(req.params.id, {include: User, include: BlogPost}).then((commentData) => {
        
    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

module.exports = router;