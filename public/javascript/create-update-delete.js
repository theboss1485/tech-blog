
let createButton = document.getElementById("create-button");
let updateButton = document.getElementById("update-button");
let deleteButton = document.getElementById("delete-button");

let postTitle = document.getElementById("post-title");
let content = document.getElementById("content");

let singleBlogPost = document.getElementById("single-blog-post");
let welcomeLine = document.getElementById("welcome-line");

/* The following outer if statements add event listeners to the create, update
and delete buttons for creating, updating, and deleting blog posts and comments.*/
if (createButton !== null){

    createButton.addEventListener("click", () => {

        if (createButton.dataset.type === "Blog Post"){

            createElement("blog post");

        } else if (createButton.dataset.type === "Comment"){

            createElement( "comment");
        }
    });
}

if (updateButton !== null){

    updateButton.addEventListener("click", (event) => {

        if (updateButton.dataset.type === "Blog Post"){

            updateElement(event, "blog post");

        } else if (updateButton.dataset.type === "Comment"){

            updateElement(event, "comment");
        }
    });
}

if (deleteButton !== null){

    deleteButton.addEventListener("click", (event) => {

        if (deleteButton.dataset.type === "Blog Post"){

            deleteElement(event, "blog post");

        } else if (deleteButton.dataset.type === "Comment"){

            deleteElement(event, "comment");
        }
    });
}


/* This function sends POST requests to the server to create comments and blog posts. */
async function createElement(elementType){

    if(performValidation(elementType) === true){

        let requestUrl = generateUrlPiece(elementType);
        let requestBody = generateBody(elementType);

        try {

            let response = await fetch(requestUrl, {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: requestBody
        
            });
            
            handleRedirection(response, elementType);
        
        } catch(error){

            console.log(error)
        }

    /* If the user makes an invalid submission, the system redirects the user so that an error 
    message can be rendered. */
    } else {

        if(elementType === "comment"){

            document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&cudComment=true&newElement=true&error=invalidCommentSubmission`;

        } if(elementType === "blog post"){

            document.location.href =`/dashboard?cudPost=true&newElement=true&error=invalidPostSubmission`;
        }
    }
}

/* This function sends UPDATE requests to the server to update comments and blog posts. */
async function updateElement(event, elementType){

    if(performValidation(elementType) === true){

        let requestUrl = generateUrlPiece(elementType);
        let requestBody = generateBody(elementType);

        let id = event.target.dataset.editElementId;
        
        try {

            let response = await fetch(`${requestUrl}${id}`, {

                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: requestBody
        
            });

            handleRedirection(response, elementType);
        
        } catch(error){

            console.log(error)
        }

    /* If the user makes an invalid submission, the system redirects the user so that an error 
    message can be rendered. */
    } else {

        if (elementType === "comment"){

            document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&` +
            `cudComment=true&newElement=false&editCommentId=${event.target.dataset.editElementId}&error=invalidCommentSubmission`;
        
        } else if (elementType === "blog post"){

            document.location.href =`/dashboard/?cudPost=true&newElement=false&editPostId=${event.currentTarget.dataset.editElementId}&error=invalidPostSubmission`;
        }
    }
}

/* This function sends DELETE requests to the server to update comments and blog posts. */
async function deleteElement(event, elementType){

    let requestUrl = generateUrlPiece(elementType);

    let id = event.target.dataset.editElementId;
    
    try {

        let response = await fetch(`${requestUrl}${id}`, {

            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        handleRedirection(response, elementType);
    
    } catch(error){

        console.log(error)
    }
}


/* This function generates part of the fetch URL so that the code to generate that part
doesn't need to repeated three times. */
function generateUrlPiece(elementType){

    if(elementType === "blog post"){

        return "/api/blogPosts/";
    
    } else if(elementType === "comment"){

        return "/api/comments/";
    }
}

/* This function generates the fetch request body so that the code to generate the body
doesn't need to repeated three times. */
function generateBody(elementType){

    let body = undefined;

    if(elementType === "blog post"){

        let loggedInUserId = welcomeLine.dataset.userId;

        body =  JSON.stringify({ title: postTitle.value, content: content.value, user_id: loggedInUserId});
    
    } else if(elementType === "comment"){

        let blogPostId = singleBlogPost.dataset.databasePostId;

        body =  JSON.stringify({content: content.value, user_id: welcomeLine.dataset.userId, blog_post_id: blogPostId});
    }

    return body;
}

/* This function handles redirection if a fetch request is valid so that the code to handle redirection
doesn't need to repeated three times. If the url ends in "login" the first if block redirects the user.
I did this because I was having trouble getting the redirection to work by only using res.redirect.*/
function handleRedirection(response, elementType){

    if(response.url.slice(-5) === "login"){

        document.location.href = "/login";
    
    } else {

        if(elementType === "blog post"){

            document.location.href =`/dashboard`
        
        } else if(elementType === "comment"){
    
            document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&cudComment=false`;
        }
    }
}

/* This function performs validation on the Title and Content fields for blog posts and comments,
so as to make sure the user gave valid input. */
function performValidation(elementType){

    let titleRegex = /^[a-zA-Z0-9 ][a-zA-Z0-9-:!? ]*[a-zA-Z0-9!? ]?$/

    let trimmedContent = content.value.trim();
    

    if(elementType === "blog post"){

        let trimmedTitle = postTitle.value.trim();

        let passingRegex = titleRegex.test(trimmedTitle.value); 


        if((passingRegex === false) || (trimmedContent === "")){

            return false
        }

    } else if (elementType === "comment"){

        if(trimmedContent === ""){

            return false
        }

    }

    return true;
}