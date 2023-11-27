let commentsSection = document.getElementById("comments-section");

//let individualChangeableComments = commentsSection.querySelectorAll();

let editButtons = document.querySelectorAll('[id^="edit-delete-comment-button-"]')

editButtons.forEach(button => {

    button.addEventListener("click", (event) => {

        openCommentEditor("false", event);
    });
})

let createCommentButton = document.getElementById("new-comment-button");

    createCommentButton.addEventListener("click", (event) => {

        openCommentEditor("true", event);
    });

async function openCommentEditor(newComment){

    document.location.href =`/single-blog-post/id=${${event.currentTarget.dataset.databasePostId}}`;

    // if(newComment === "true"){

    //     await fetch('/api/blogPosts/cud-comment');

    //     document.location.href ='/cud-post';

    // } else if(newPost === "false"){

    //     await fetch(`/cud-post/${event.currentTarget.dataset.databasePostId}`);

    //     //await fetch(`/api/blogPosts/${event.currentTarget.dataset.databasePostId}`);


    //     document.location.href =`/cud-post/${event.currentTarget.dataset.databasePostId}`;
    // }

    await fetch(`/cud-post?newComment=${newComment}`);

    document.location.href =`/cud-comment?newComment=${newComment}`;
}