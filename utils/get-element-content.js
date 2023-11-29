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