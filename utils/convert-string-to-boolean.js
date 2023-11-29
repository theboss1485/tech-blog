

function convertStringToBoolean(stringInQuestion){

    if(stringInQuestion){

        let parsedString = JSON.parse(stringInQuestion);

        console.log("parsed string", parsedString);

        return parsedString;
    
    } else {

        return "";
    } 

    

    // if(stringInQuestion === "true"){

    //     return true
    
    // } else if (stringInQuestion === "false"){

    //     return false;
    // }   
}

module.exports = convertStringToBoolean;