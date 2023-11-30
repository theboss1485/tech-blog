/* This file adds event listeners to editable comments' buttons, and also includes
a function to open the comment editor/creator.*/
let commentsSection = document.getElementById("comments-section");

let editButtons = document.querySelectorAll('[id^="edit-delete-comment-button-"]')

editButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        openCommentEditor("false", event);
    });
});

let createCommentButton = document.getElementById("new-comment-button");

if(createCommentButton !== null){

    createCommentButton.addEventListener("click", (event) => {

        openCommentEditor("true");
    });
}


/* This function opens the comment editor/creator. */
async function openCommentEditor(newElement, event){

    let blogPost = document.getElementById("single-blog-post");

    if(newElement === "true"){

        document.location.href =`/single-blog-post-and-comments?id=${blogPost.dataset.databasePostId}&cudComment=true&newElement=${newElement}`;
    
    } else if (newElement === "false"){

        document.location.href =`/single-blog-post-and-comments?id=${blogPost.dataset.databasePostId}&cudComment=true&newElement=${newElement}&editCommentId=${event.target.dataset.content}`;
    }

    
}