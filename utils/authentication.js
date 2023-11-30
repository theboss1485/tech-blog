
/* I basically took this function from activity 20 of module 14.  If the user isn't authenticated, it
redirects him or her to the login page.*/
function baseAuthenticateWhetherLoggedIn(req, res, next){

    if (!req.session.logged_in) {

        res.redirect('/login');

    } else {

        next();
    }


}

/* This function ensures that if the user tries to access the comment 
editor while logged out, he or she will be redirected to the Log In page. */
function loggedInAuthenticationBeforeCud(req, res, next){

    if (req.query.cudComment){

        if(JSON.parse(req.query.cudComment)){

            if (!req.session.logged_in) {
    
                res.redirect('/login');
        
            } else {
        
                next();
            }
        
        } else {
    
            next();
        }
    
    } else {

        next();
    }
    
}

module.exports = {baseAuthenticateWhetherLoggedIn, loggedInAuthenticationBeforeCud};