
/* I basically took this function from activity 20 of module 14.  If the user isn't authenticated, it
redirects him or her to the login page.*/
function baseAuthenticateWhetherLoggedIn(req, res, next){

    if (!req.session.logged_in) {

        res.redirect('/login');

    } else {

        next();
    }


}

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