const getElementContent = require('./get-element-content.js');
const getCudFormTitle = require('./get-cud-form-title.js');
const convertStringToBoolean = require('./convert-string-to-boolean.js')

/* This function renders the blog posts on the home page and the blog post titles
on the dashboard.*/
function renderBlogPosts(blogPosts, req, res, pageTitle, whichPage, error = ""){

    let cudFormTitle = getCudFormTitle(req.query.newElement, "Blog Post");

    let elementToBeEdited = undefined;

    if (req.query.editPostId){

        elementToBeEdited = getElementContent(res, blogPosts, req.query.editPostId);

        if (!elementToBeEdited) {

            res.redirect("/?error=invalidRedirection");
            return;
        }
    }

    let displayCudForm = convertStringToBoolean(req.query.cudPost);
    let newElement = convertStringToBoolean(req.query.newElement);

    let invalidRedirectionMessage = false

    console.log("req.query.error", req.query.error);

    /* If the user attempts to edit the URL and change the query parameters there, the system 
    displays an error message. */
    if (req.query.error === "invalidRedirection"){

        invalidRedirectionMessage = "You have attempted an invalid redirection.  This isn't allowed."
    
    } else {

        invalidRedirectionMessage = "";
    }

    console.log("invalid redirection message", invalidRedirectionMessage);

    res.render("blog-posts", {
        blogPosts,
        pageTitle,
        whichPage,
        cudFormTitle,
        elementToBeEdited,
        error,
        invalidRedirectionMessage,
        type: "Blog Post",
        loggedIn: req.session.logged_in,
        loggedInUserId: req.session.user_id,
        loggedInUser: req.session.username,
        editElementId: req.query.editPostId,
        displayCudForm,
        newElement
    });
}

module.exports = renderBlogPosts;