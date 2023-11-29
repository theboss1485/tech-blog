function convertStringToBoolean(stringInQuestion){

    if(stringInQuestion === "true"){

        return true
    
    } else if (stringInQuestion === "false"){

        return false;
    }   
}

module.exports = convertStringToBoolean;