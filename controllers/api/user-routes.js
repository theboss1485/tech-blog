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

        console.log("test 1");
        if(!duplicateUser){

            let validUser = await User.create({

                username: req.body.username,
                password: req.body.password,
        
            });
    
            req.session.user_id = validUser.id
            req.session.username = validUser.username;
            req.session.logged_in = true;

           await sessionSaveWithPromise(req);

           console.log("req.session.user_id", req.session.user_id,);
           console.log("req.session.logged_in", req.session.logged_in);
    
            //res.render("blog-post", {title: "Your Dashboard"});
            res.redirect(301, `../../dashboard`);
        
        } else {

            console.log("test 2");
           // res.render('login-signup', {errorMessage: "This username is already taken.  Please try again!"});
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

    console.log("this is a test.")

    if(req.session.logged_in === true){

        req.session.destroy(() => {
            console.log("destroyed!!");
            res.redirect(301, '../../login');
        })

        //await sessionDestroyWithPromise(req);
        // console.log("destroyed!!")
        
        // console.log("destroyed 2222")
    
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

        console.log("Username", req.body.username);

        console.log("User Data", userData);

        let validUser = undefined;

        if(userData){

            validUser = await userData.get({plain: true});
        }

        console.log("Valid User", validUser);

        if(validUser !== undefined){
            
            // req.session.save(() => {
            //     req.session.user_id = validUser.id
            //     req.session.logged_in = true;
            //     req.session.username = validUser.username;
            //     console.log("Session Obj: ", req.session);
            //     res.redirect(301, `../../dashboard`);
            // })

            req.session.user_id = validUser.id
            req.session.logged_in = true;
            req.session.username = validUser.username;

            await sessionSaveWithPromise(req);

            req.session.user_id = validUser.id
            req.session.logged_in = true;
            req.session.username = validUser.username;

            

            // await req.session.save();
            // req.session.save();
        
         //   console.log("req.session.user_id", req.session.user_id);

           res.redirect(301, `../../dashboard`);
        
        } else {

            //res.render('login-signup', {errorMessage: "Your username or password is incorrect  Please try again!"});
            res.redirect(301, `/login?valid=false`);
        }

    } catch(error){

        console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;