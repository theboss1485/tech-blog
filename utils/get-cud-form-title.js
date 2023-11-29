function getCudFormTitle(newElement, elementType){

    console.log("inside 222222222222");

    let newElementBoolean = undefined;

    console.log("New Element", newElement);
    
    if(newElement){

         newElementBoolean = JSON.parse(newElement);
    }

    console.log("Element Type", elementType);

    console.log("New Element Boolean", newElementBoolean);
    
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