/* The function gets the appropriate title for the form to create, update, and delete 
comments and blog posts.*/
function getCudFormTitle(newElement, elementType){

    let newElementBoolean = undefined;
    
    if(newElement){

         newElementBoolean = JSON.parse(newElement);
    }

    let cudFormTitle = undefined;

    if((newElementBoolean) && (elementType === "Comment")){

        cudFormTitle = "Add a New Comment";

    } else if(!(newElementBoolean) && (elementType === "Comment")){

        cudFormTitle = "Edit or Delete a Comment";

    } else if((newElementBoolean) && (elementType === "Blog Post")){

        cudFormTitle = "Create a New Blog Post";

    } else if(!(newElementBoolean) && (elementType === "Blog Post")){

        cudFormTitle = "Edit or Delete a Blog Post";
    }
    
    return cudFormTitle;
}

module.exports = getCudFormTitle;