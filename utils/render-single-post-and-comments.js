const getElementContent = require('./get-element-content.js');
const getLoginOrLogoutText = require('./get-login-or-logout-text.js');
const getCudFormTitle = require('./get-cud-form-title.js')
const convertStringToBoolean = require('./convert-string-to-boolean.js');

function renderSinglePostAndComments(comments, blogPost, req, res, error){

    let loginOrLogout = getLoginOrLogoutText(req.session.logged_in);

    let cudFormTitle = getCudFormTitle(req.query.newElement, "Comment");

    
    elementToBeEdited = getElementContent(comments, req.query.editCommentId);
    console.log("Edited!", elementToBeEdited);

    let displayCudForm = convertStringToBoolean(req.query.cudComment);
    let newElement = convertStringToBoolean(req.query.newElement);
    
    //console.log("blog post", blogPost)
    console.log("req.session.user_id", req.session.user_id);
    console.log("req.session.username", req.session.username);

    res.render("single-blog-post", {
        blogPost,
        comments,
        pageTitle: "Tech Blog",
        type: "Comment", 
        cudFormTitle,
        elementToBeEdited,
        loginOrLogout,
        error,
        loggedIn: req.session.logged_in,
        loggedInUserId: req.session.user_id,
        loggedInUser: req.session.username,
        editElementId: req.query.editCommentId,
        newElement,
        displayCudForm
    });
}


module.exports = renderSinglePostAndComments;