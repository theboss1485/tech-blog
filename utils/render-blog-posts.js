const getElementContent = require('./get-element-content.js');
const getLoginOrLogoutText = require('./get-login-or-logout-text.js');
const getCudFormTitle = require('./get-cud-form-title.js');
const convertStringToBoolean = require('./convert-string-to-boolean.js')

function renderBlogPosts(blogPosts, req, res, pageTitle, whichPage, error = ""){

    let loginOrLogout = getLoginOrLogoutText(req.session.logged_in);

    let cudFormTitle = getCudFormTitle(req.query.newElement, "Comment");

    

    if(req.query.newElement === "true"){

        cudFormTitle = "Add a Blog Post";
    
    } else if(req.query.newElement === "false"){

        cudFormTitle = "Edit or Delete a Blog Post";
        
    }

    elementToBeEdited = getElementContent(blogPosts, req.query.editPostId);

    let displayCudForm = convertStringToBoolean(req.query.cudPost);
    let newElement = convertStringToBoolean(req.query.newElement);

    res.render("blog-posts", {
        blogPosts,
        pageTitle,
        whichPage,
        cudFormTitle,
        elementToBeEdited,
        loginOrLogout,
        error,
        type: "Blog Post",
        loggedIn: req.session.logged_in,
        loggedInUserId: req.session.user_id,
        loggedInUser: req.session.username,
        editElementId: req.query.editPostId,
        displayCudForm,
        newElement
    });

}

// function renderPlainElements(data, dataType, req, res, signedIn, specificPage, cudForm = "false", newElement = "false", errorMessage, editElementId = "",
//                              userId = "", blogPostId = "", parentTitle = "", parentContent = "", parentUser = "", parentCreatedDate = ""){

//                                 console.log("edit Element id 1", editElementId);

//                                 console.log("blog post id", blogPostId);



//     const plainElements = data.map((element) => element.get({ plain: true }));

//     let logInOrLogOut = undefined;

//     console.log("req.session.loggedIn", req.session.logged_in);

//     if(signedIn === "true"){

//         logInOrLogOut = "Logout"
    
//     } else {

//         logInOrLogOut = "Login";
//     }

//     console.log("signed in", signedIn);

//     let cudFormTitle = undefined;

//     if(dataType === "blog-post"){

//         if(newElement === "true"){

//             cudFormTitle = "Add a New Blog Post";
        
//         } else if(newElement === "false"){

//             cudFormTitle = "Edit or Delete a Blog Post";
//         }

//     } else if(dataType === "comment"){

//         if(newElement === "true"){

//             cudFormTitle = "Add a New Comment";
        
//         } else if(newElement === "false"){

//             cudFormTitle = "Edit or Delete a Comment";
//         }

//     }

//     console.log("edit Element id 2", editElementId);

//     let elementInQuestion = "";
//     let contentInQuestion = "";
//     let titleInQuestion = "";
//     if (editElementId !== "" && editElementId !== undefined){

//         console.log("edit Element id 3", editElementId);

//         elementInQuestion = plainElements.find(function(element){

//             if(element.id === parseInt(editElementId)){

//                 return element.id;
//             }
//         });

//         contentInQuestion = elementInQuestion.content
//         titleInQuestion = elementInQuestion.title;
//     }

    

//     if (dataType === "comment"){

        

//         res.render("single-blog-post", {
//             contentInQuestion, 
//             editElementId,
//             plainElements, 
//             cudFormTitle, 
//             userId,
//             loggedInUserId: req.session.user_id,
//             errorMessage,
//             title: pageTitle, 
//             type: dataType,
//             loginOrLogout: logInOrLogOut, 
//             welcomeLoggedInUser: `Welcome, ${req.session.username}`, 
//             loggedIn: signedIn,
//             whichPage: specificPage,
//             postId: blogPostId,
//             blogPostTitle: parentTitle,
//             blogPostContent: parentContent,
//             blogPostUser: parentUser,
//             blogPostCreatedDate: parentCreatedDate,
//             displayCudForm: cudForm,
//             new: newElement
//         });
    
//     } else if (dataType === "blog-post"){

        

//         res.render(dataType, {

//             cudFormTitle,
//             titleInQuestion,
//             contentInQuestion,
//             editElementId,
//             loggedInUserId: req.session.user_id,
//             errorMessage,
//             displayCudForm: cudForm,
//             type: dataType,
//             plainElements, title: pageTitle, 
//             loginOrLogout: logInOrLogOut, 
//             welcomeLoggedInUser: `Welcome, ${req.session.username}`, 
//             loggedIn: signedIn,
//             whichPage: specificPage,
//             new: newElement
//         });
//     } 

    
// }

module.exports = renderBlogPosts;