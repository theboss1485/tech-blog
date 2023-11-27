// const { BlogPost } = require("../../models");
// const { update } = require("../../models/User");

let createButton = document.getElementById("create-button");
let updateButton = document.getElementById("update-button");
let deleteButton = document.getElementById("delete-button");

let postTitle = document.getElementById("post-title");
let content = document.getElementById("content");

if(createButton !== undefined){

    createButton.addEventListener("click", () => {

        if(createButton.dataset.type === "blog post"){

            createElement("blog post");

        } else if (createButton.dataset.type === "comment"){

            createElement("comment");
        }
    });
}

if(updateButton !== undefined){

    updateButton.addEventListener("click", () => {

        if(updateButton.dataset.type === "blog post"){

            updateElement("blog post");

        } else if (createButton.dataset.type === "comment"){

            updateElement("comment");
        }
    });
}

if(deleteButton !== undefined){

    deleteButton.addEventListener("click", () => {

        if(deleteButton.dataset.type === "blog post"){

            deleteElement("blog post");

        } else if (deleteButton.dataset.type === "comment"){

            deleteElement("comment");
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
    
    } catch(error){

        console.log(error)
    }
}

async function updateElement(event, elementType){

    let requestUrl = generateUrlPiece(elementType);
    let requestBody = generateBody(elementType);

    let postId = event.target.dataset.post-id;
    
    try {

        await fetch(`${requestUrl}${postId}`, {

            method: "UPDATE",
            headers: {"Content-Type": "application/json"},
            body: requestBody
    
        });
    
    } catch(error){

        console.log(error)
    }
}

async function deleteElement(event, elementType){

    let requestUrl = generateUrlPiece(elementType);

    let postId = event.target.dataset.post-id;
    
    try {

        await fetch(`${requestUrl}${postId}`)({

            method: "DELETE",
            headers: {"Content-Type": "application/json"},
        });
    
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

function generateBody(){

    let body = undefined;

    if(elementType === "blog post"){

        body =  JSON.stringify({ title: postTitle.textContent, content: content.textContent});
    
    } else if(elementType === "comment"){

        body =  JSON.stringify({content: content.textContent});
    }

    return body;
}