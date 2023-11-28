let postFunctionsScript = document.getElementById("post-functions-script");
let whichPage = postFunctionsScript.dataset.whichPage;

let postsSection = document.getElementById("posts-section");

let createPostButton = document.getElementById("new-post-button");



let individualPosts = postsSection.children;

if(whichPage === "home"){

    for(let counter = 0; counter < individualPosts.length - 1; counter++){

        individualPosts[counter].addEventListener("click", async (event) => {
            
            // window.location.href =`/comments?post=${event.currentTarget.dataset.databasePostId}`;

            document.location.href =`/single-blog-post-and-comments/?id=${event.currentTarget.dataset.databasePostId}&cudComment=false`;
        });
    }

} else if(whichPage === "dashboard"){

    individualPosts.forEach(post => {

        post.addEventListener("click", openPostEditor)
    });

    if(createPostButton !== undefined && createPostButton !== null){

        createPostButton.addEventListener("click", (event) => {

            openPostEditor("true", event);
        });
    }
}

async function openPostEditor(newPost, event){

    if(createPostButton !== undefined && createPostButton !== null){

        if(event.target === createPostButton){

            event.stopPropagation();
        }
    }

    if(newPost === "true"){

        await fetch('/api/blogPosts/cud-post');

        document.location.href ='/cud-post';

    } else if(newPost === "false"){

        await fetch(`/cud-post/${event.currentTarget.dataset.databasePostId}`);

        //await fetch(`/api/blogPosts/${event.currentTarget.dataset.databasePostId}`);


        document.location.href =`/cud-post/${event.currentTarget.dataset.databasePostId}`;
    }

    
}
