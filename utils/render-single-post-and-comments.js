const getElementContent = require('./get-element-content.js');
const getCudFormTitle = require('./get-cud-form-title.js')
const convertStringToBoolean = require('./convert-string-to-boolean.js');

/*  This function renders the single blog post and comments on the 
single-blog-post-and-comments page.*/
function renderSinglePostAndComments(comments, blogPost, req, res, error){

    let cudFormTitle = getCudFormTitle(req.query.newElement, "Comment");

    let elementToBeEdited = undefined

    if(req.query.editCommentId){

        elementToBeEdited = getElementContent(res, comments, req.query.editCommentId);

        if (!elementToBeEdited) {

            res.redirect("/?error=invalidRedirection");
            return;
        }
    }

    let displayCudForm = convertStringToBoolean(req.query.cudComment);
    let newElement = convertStringToBoolean(req.query.newElement);

    res.render("single-blog-post", {
        blogPost,
        comments,
        pageTitle: "Tech Blog",
        type: "Comment", 
        cudFormTitle,
        elementToBeEdited,
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