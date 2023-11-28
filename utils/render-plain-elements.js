// let postsSection = document.getElementById("posts-section");

// let individualPosts = postsSection.querySelectorAll('> section');

// individualPosts.forEach(post => {

//     post.addEventListener("click", openPostEditor);
// });

function renderPlainElements(data, dataType, req, res, pageTitle, signedIn, specificPage, parentTitle = "", parentContent = "", parentUser = "", parentCreatedDate = ""){

    const plainElements = data.map((element) => element.get({ plain: true }));

    let logInOrLogOut = undefined;

    console.log("req.session.loggedIn", req.session.logged_in);

    if(signedIn === "true"){

        logInOrLogOut = "Logout"
    
    } else {

        logInOrLogOut = "Login";
    }

    console.log("signed in", signedIn)

    if(dataType === "comment"){


        res.render("single-blog-post", {
            plainElements, title: pageTitle, 
            loginOrLogout: logInOrLogOut, 
            welcomeLoggedInUser: `Welcome, ${req.session.username}`, 
            loggedIn: signedIn,
            whichPage: specificPage,
            blogPostTitle: parentTitle,
            blogPostContent: parentContent,
            blogPostUser: parentUser,
            blogPostCreatedDate: parentCreatedDate


        });
    
    } else {

        res.render(dataType, {
            plainElements, title: pageTitle, 
            loginOrLogout: logInOrLogOut, 
            welcomeLoggedInUser: `Welcome, ${req.session.username}`, 
            loggedIn: signedIn,
            whichPage: specificPage
        });
    } 

    
}

module.exports = renderPlainElements;