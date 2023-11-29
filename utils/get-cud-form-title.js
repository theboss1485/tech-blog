function getCudFormTitle(newElement, elementType){

    let = NewElementBoolean = Boolean(newElement);
    let cudFormTitle = undefined;

    if((NewElementBoolean) && (elementType === "Comment")){

        cudFormTitle = "Add a New Comment";

    } else if(!(NewElementBoolean) && (elementType === "Comment")){

        cudFormTitle = "Edit or Delete a Comment";

    } else if((NewElementBoolean) && (elementType === "Blog Post")){

        cudFormTitle = "Create a New Blog Post";

    } else if(!(NewElementBoolean) && (elementType === "Blog Post")){

        cudFormTitle = "Edit or Delete a Blog Post";
    }   
}

module.exports = getCudFormTitle;