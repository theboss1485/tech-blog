const router = require('express').Router();
const {User} = require('../../models');
const {sessionSaveWithPromise, sessionDestroyWithPromise} = require('../../utils/session-promise-functions.js')
const bcrypt = require('bcrypt');



/*This GET route gets all the users.*/
router.get('/', async (req, res) =>{

    try{

        let userData = await User.findAll();

        res.status(200).json(userData);

    } catch(error) {
    
        console.log(error);
        res.status(500).json(error);
    }
});

    

/* This POST route creates a new user if it doesn't find an existing one 
with the same username. */
router.post('/', async (req, res) =>{

    try{

        let duplicateUser = await User.findOne({

            where: {

                username: req.body.username
            }
        });

        console.log("duplicate user", duplicateUser);

        if(!duplicateUser){

            let hashedPassword = await bcrypt.hash(req.body.password, 10);

            console.log("hashed password", hashedPassword)

            let validUser = await User.create({

                username: req.body.username,
                password: hashedPassword
        
            });
    
            req.session.user_id = validUser.id
            req.session.username = validUser.username;
            req.session.logged_in = true;

           await sessionSaveWithPromise(req);
    
            res.redirect(301, `../../dashboard`);
        
        /* If there is an existing user with the username in question
        the system redirects the user to the Sign Up page and renders
        an error message.*/
        } else {

            res.redirect(301, `/signup?taken=true`);
        } 

    } catch(error){

        console.log(error);
        res.status(500).json(error);
    }
});

// This route logs the user out and calls a method that destroys the session.
router.get('/logout', async (req, res) => {

    res.set('Cache-Control', 'no-store');

    if(req.session.logged_in === true){

        try{

            await sessionDestroyWithPromise(req);
            res.redirect(301, '../../login');
        
        } catch (error){

            res.status(500).end();
        }
    }
});

/* This POST route logs the user in if their credentials are correct.
It then redirects them to the dashboard page.  If the credentials aren't correct
the system redirects the user to the Log In page and displays an error message. */
router.post('/login', async (req, res) =>{

    res.set('Cache-Control', 'no-store');

    try {

        let userData = await User.findOne({

            where: {

                username: req.body.username,
            }
        });

        let validUser = undefined;
        let validPassword = undefined;

        if(userData){

            validUser = await userData.get({plain: true});
        }

        if(validUser){

            validPassword = await bcrypt.compare(req.body.password, validUser.password)
        }

        if (validPassword){

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