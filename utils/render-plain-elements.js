// let postsSection = document.getElementById("posts-section");

// let individualPosts = postsSection.querySelectorAll('> section');

// individualPosts.forEach(post => {

//     post.addEventListener("click", openPostEditor);
// });

function renderPlainElements(data, dataType, req, res, pageTitle, signedIn, specificPage, editElementId, cudForm = "false", 
                            newComment = "false", userId = "", blogPostId = "", parentTitle = "", parentContent = "", parentUser = "", parentCreatedDate = ""){

                                console.log("blog post id", blogPostId);



    const plainElements = data.map((element) => element.get({ plain: true }));

    let logInOrLogOut = undefined;

    console.log("req.session.loggedIn", req.session.logged_in);

    if(signedIn === "true"){

        logInOrLogOut = "Logout"
    
    } else {

        logInOrLogOut = "Login";
    }

    console.log("signed in", signedIn);

    let cudFormTitle = undefined;

    if(newComment === "true"){

        cudFormTitle = "Add a New Comment";

    } else {

        cudFormTitle = "Edit or Delete a Comment";
    }

    if(newComment === "true"){}

    if(dataType === "comment"){

        let elementInQuestion = "";

        if(editElementId !== ""){

            elementInQuestion = plainElements.find(function(element){

                
                console.log("element.id", element.id)
                console.log("edit comment id", parseInt(editElementId));
                console.log("-------")
                if(element.id === parseInt(editElementId)){
                    return element.id;
                }
            }).content;
        }

        // console.log("blog post id", blogPostId);

        // console.log("Plain Elements", plainElements);

        // console.log("logged in user", req.session.user_id);

        console.log("plain elements", plainElements);

        res.render("single-blog-post", {
            elementInQuestion, editElementId,
            plainElements, cudFormTitle, userId,
            loggedInUserId: req.session.user_id,
            title: pageTitle, 
            type: dataType,
            loginOrLogout: logInOrLogOut, 
            welcomeLoggedInUser: `Welcome, ${req.session.username}`, 
            loggedIn: signedIn,
            whichPage: specificPage,
            postId: blogPostId,
            blogPostTitle: parentTitle,
            blogPostContent: parentContent,
            blogPostUser: parentUser,
            blogPostCreatedDate: parentCreatedDate,
            displayCudForm: cudForm,
            new: newComment
        });
    
    } else if (dataType === "blog-post"){

        res.render(dataType, {
            loggedInUserId: req.session.user_id,
            plainElements, title: pageTitle, 
            loginOrLogout: logInOrLogOut, 
            welcomeLoggedInUser: `Welcome, ${req.session.username}`, 
            loggedIn: signedIn,
            whichPage: specificPage
        });
    } 

    
}

module.exports = renderPlainElements;