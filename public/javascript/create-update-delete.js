// const { BlogPost } = require("../../models");
// const { update } = require("../../models/User");

let createButton = document.getElementById("create-button");
let updateButton = document.getElementById("update-button");
let deleteButton = document.getElementById("delete-button");

let postTitle = document.getElementById("post-title");
let content = document.getElementById("content");

let singleBlogPost = document.getElementById("single-blog-post");
let welcomeLine = document.getElementById("welcome-line");

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



async function createElement(elementType){

    if(performValidation(elementType) === true){

        let requestUrl = generateUrlPiece(elementType);
        let requestBody = generateBody(elementType);

        try {

            await fetch(requestUrl, {

                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: requestBody
        
            });
            
            handleRedirection(elementType);
        
        } catch(error){

            console.log(error)
        }
    } else {

        if(elementType === "comment"){

            document.location.href =`/single-blog-post-and-comments?id=${blogPost.dataset.databasePostId}&cudComment=true&newElement=true&error=invalidCommentSubmission`;

        } if(elementType === "blog post"){

            document.location.href =`/dashboard?cudPost=true&newElement=true&error=invalidPostSubmission`;
        }
    }
}

async function updateElement(event, elementType){

    if(performValidation(elementType) === true){

        let requestUrl = generateUrlPiece(elementType);
        let requestBody = generateBody(elementType);

        let id = event.target.dataset.editElementId;
        
        try {

            await fetch(`${requestUrl}${id}`, {

                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: requestBody
        
            });

            handleRedirection(elementType);
        
        } catch(error){

            console.log(error)
        }
    } else {

        if (elementType === "comment"){

            document.location.href =`/single-blog-post-and-comments?id=${blogPost.dataset.databasePostId}&
                                    cudComment=true&newElement=false&editCommentId=${event.target.dataset.editElementId}&error=invalidCommentSubmission`;
        
        } else if (elementType === "blog post"){

            document.location.href =`/dashboard/?cudPost=true&newElement=false&editPostId=${event.currentTarget.dataset.editElementId}&error=invalidPostSubmission`;
        }
    }
}

async function deleteElement(event, elementType){

    let requestUrl = generateUrlPiece(elementType);

    let id = event.target.dataset.editElementId;
    
    try {

        await fetch(`${requestUrl}${id}`, {

            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });

        handleRedirection(elementType);
        
        //document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&cudComment=false`;
    
    } catch(error){

        console.log(error)
    }
}

function generateUrlPiece(elementType){

    if(elementType === "blog post"){

        return "/api/blogPosts/";
    
    } else if(elementType === "comment"){

        return "/api/comments/";
    }
}

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

function handleRedirection(elementType){

    if(elementType === "blog post"){

        document.location.href =`/dashboard`
    
    } else if(elementType === "comment"){

        document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&cudComment=false`;
    }
}

function performValidation(elementType){

    let titleRegex = /^[a-zA-Z0-9 ][a-zA-Z0-9-:!? ]*[a-zA-Z0-9!? ]?$/

    let trimmedContent = content.value.trim();
    

    if(elementType === "blog post"){

        let trimmedTitle = postTitle.value.trim();

        let passingRegex = titleRegex.test(postTitle.value); 


        if((trimmedTitle === "") || (passingRegex === false) || (trimmedContent === "")){

            return false
        }

    } else if (elementType === "comment"){

        if(trimmedContent === ""){

            return false
        }

    }

    return true;
}