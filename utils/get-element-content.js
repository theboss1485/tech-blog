/* If the user is going to edit or delete a blog post or comment,
this function gets the text of that blog post or comment so that 
it can be displayed on the page. */
function getElementContent(res, elements, editElementId){

    elementInQuestion = elements.find(function(element){

        if(element.id === parseInt(editElementId)){

            return element.id;
        }
    });

    if(elementInQuestion !== null && elementInQuestion !== undefined){

        return elementInQuestion;
    
    } else {

        return null;
    } 
}

module.exports = getElementContent