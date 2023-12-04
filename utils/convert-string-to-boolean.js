
/* This function converts a string from a query parameter ("true" or "false")
into a Boolean (true or false) so that it can be used more efficiently. */
function convertStringToBoolean(stringInQuestion){

    if(stringInQuestion){

        let parsedString = JSON.parse(stringInQuestion);

        

        return parsedString;
    
    } else {

        return "";
    }   
}

module.exports = convertStringToBoolean;