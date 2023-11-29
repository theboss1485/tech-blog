const router = require('express').Router();
const {User} = require('../../models');
const {sessionSaveWithPromise, sessionDestroyWithPromise} = require('../../utils/session-promise-functions.js')


router.get('/', (req, res) =>{

    User.findAll().then((userData) => {

        res.json(userData);

    }).catch((error) => {

        console.log(error);
        res.status(400).json(error);
    });
});

router.post('/', async (req, res) =>{

    try{

        let duplicateUser = await User.findOne({

            where: {

                username: req.body.username
            }
        });
        if(!duplicateUser){


            let validUser = await User.create({

                username: req.body.username,
                password: req.body.password,
        
            });
    
            req.session.user_id = validUser.id
            req.session.username = validUser.username;
            req.session.logged_in = true;

           await sessionSaveWithPromise(req);
    
            res.redirect(301, `../../dashboard`);
        
        } else {

            res.redirect(301, `/signup?taken=true`);
        } 

    } catch(error){

        console.log(error);
        res.status(400).json(error);
    }
});

/* I copied this code from the solved mini project of Module 14.  I really don't know any
way to do this other than changing the variable names.*/
router.get('/logout', async (req, res) => {

    res.set('Cache-Control', 'no-store');

    if(req.session.logged_in === true){

        req.session.destroy(() => {

            res.redirect(301, '../../login');
        })

        //await sessionDestroyWithPromise(req);
    
    }

    // console.log("test1");

    
    // console.log("test2");
});

router.post('/login', async (req, res) =>{

    res.set('Cache-Control', 'no-store');

    try {

        let userData = await User.findOne({

            where: {

                username: req.body.username,
                //password: req.body.password
            }
        });

        

        

        let validUser = undefined;

        if(userData){

            validUser = await userData.get({plain: true});
        }

        if(validUser !== undefined){
            

            req.session.user_id = validUser.id
            req.session.logged_in = true;
            req.session.username = validUser.username;

            await sessionSaveWithPromise(req);

           res.redirect(301, `../../dashboard`);
        
        } else {

            res.redirect(301, `/login?valid=false`);
        }

    } catch(error){

        console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;