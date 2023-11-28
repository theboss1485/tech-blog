// const { BlogPost } = require("../../models");
// const { update } = require("../../models/User");

let createButton = document.getElementById("create-button");
let updateButton = document.getElementById("update-button");
let deleteButton = document.getElementById("delete-button");

let postTitle = document.getElementById("post-title");
let content = document.getElementById("content");

let singleBlogPost = document.getElementById("single-blog-post");
let welcomeLine = document.getElementById("welcome-line");

if(createButton !== null){

    createButton.addEventListener("click", () => {

        if(createButton.dataset.type === "blog post"){

            createElement("blog post");

        } else if (createButton.dataset.type === "comment"){

            createElement("comment");
        }
    });
}

if(updateButton !== null){

    updateButton.addEventListener("click", (event) => {

        if(updateButton.dataset.type === "blog post"){

            updateElement(event, "blog post");

        } else if (updateButton.dataset.type === "comment"){

            updateElement(event, "comment");
        }
    });
}

if(deleteButton !== null){

    deleteButton.addEventListener("click", (event) => {

        if(deleteButton.dataset.type === "blog post"){

            deleteElement(event, "blog post");

        } else if (deleteButton.dataset.type === "comment"){

            deleteElement(event, "comment");
        }
    });
}



async function createElement(elementType){

    let requestUrl = generateUrlPiece(elementType);
    let requestBody = generateBody(elementType);

    try {

        await fetch(requestUrl, {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: requestBody
    
        });

        document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&cudComment=false`;
    
    } catch(error){

        console.log(error)
    }
}

async function updateElement(event, elementType){

    let requestUrl = generateUrlPiece(elementType);
    let requestBody = generateBody(elementType);

    let id = event.target.dataset.editElementId;
    
    try {

        await fetch(`${requestUrl}${id}`, {

            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: requestBody
    
        });

        document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&cudComment=false`;
    
    } catch(error){

        console.log(error)
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

        document.location.href =`/single-blog-post-and-comments?id=${singleBlogPost.dataset.databasePostId}&cudComment=false`;
    
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

        let loggedInUserId = welcomeLine.dataset.loggedInUserId;

        body =  JSON.stringify({ title: postTitle.value, content: content.value, user_id: loggedInUserId});
    
    } else if(elementType === "comment"){

        let blogPostId = singleBlogPost.dataset.databasePostId;
        let blogPostUserId = singleBlogPost.dataset.userId;

        body =  JSON.stringify({content: content.value, user_id: blogPostUserId, blog_post_id: blogPostId});
    }

    return body;
}