/* If the user is going to edit or delete a blog post or comment,
this function gets the text of that blog post or comment so that 
it can be displayed on the page. */
function getElementContent(res, elements, editElementId){

    console.log("elements", elements);
    console.log("editElementId", editElementId);

    elementInQuestion = elements.find(function(element){

        if(element.id === editElementId){

            return element.id;
        }
    });

    console.log("element in question", elementInQuestion);

    // UUIDs can't be ANDed.
    let uuidString = elementInQuestion.toString()

    if(elementInQuestion !== null && uuidString !== undefined){

        return elementInQuestion;
    
    } else {

        return null;
    } 
}

module.exports = getElementContent