let postFunctionsScript = document.getElementById("post-functions-script");
let whichPage = postFunctionsScript.dataset.whichPage;

let postsSection = document.getElementById("posts-section");

let createPostButton = document.getElementById("new-post-button");



let individualPosts = postsSection.children;

for(let counter = 0; counter < individualPosts.length - 1; counter++){

    if(individualPosts[counter].id !=="create-update-delete-post"){

        individualPosts[counter].addEventListener("click", async (event) => {
        
            // window.location.href =`/comments?post=${event.currentTarget.dataset.databasePostId}`;
    
            if(whichPage === "home"){
    
                document.location.href =`/single-blog-post-and-comments/?id=${event.currentTarget.dataset.databasePostId}&cudComment=false`;
            
            } else if (whichPage === "dashboard"){
    
                openPostEditor("false", event)
            }
    
            
        });
    }
}

if(createPostButton !== undefined && createPostButton !== null){

    createPostButton.addEventListener("click", (event) => {

        openPostEditor("true", event);
    });
}


async function openPostEditor(newElement, event){

    if(createPostButton !== undefined && createPostButton !== null){

        if(event.target === createPostButton){

            event.stopPropagation();
        }
    }

    if(newElement === "true"){

        document.location.href =`/dashboard?cudPost=true&newElement=${newElement}`;

    } else if(newElement === "false"){

        document.location.href =`/dashboard/?cudPost=true&newElement=${newElement}&editPostId=${event.currentTarget.dataset.databasePostId}`;
    }

    
}
