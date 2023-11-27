function renderCommentData(commentData, res, signedIn){

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    let logInOrLogOut = undefined;

    console.log("req.session.loggedIn", req.session.logged_in);

    if(req.session.logged_in === true){

        logInOrLogOut = "Logout"
    
    } else {

        logInOrLogOut = "Login";
    }

    res.render('comment', {
        comments,
        loggedIn: signedIn,
    });

}

module.exports = renderCommentData;