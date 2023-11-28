let commentsSection = document.getElementById("comments-section");

//let individualChangeableComments = commentsSection.querySelectorAll();

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



async function openCommentEditor(newElement, event){

    let blogPost = document.getElementById("single-blog-post");

    if(newElement === "true"){

        document.location.href =`/single-blog-post-and-comments?id=${blogPost.dataset.databasePostId}&cudComment=true&newElement=${newElement}`;
    
    } else if (newElement === "false"){
        
        document.location.href =`/single-blog-post-and-comments?id=${blogPost.dataset.databasePostId}&cudComment=true&newElement=${newElement}&editCommentId=${event.target.dataset.content}`;
    }

    
}