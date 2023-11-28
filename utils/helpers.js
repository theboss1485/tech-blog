// The expert learning assistant chatbot told me how to use the UUID package.

const {v4: uuidv4} = require('uuid')

module.exports = {

    equals: (argumentOne, argumentTwo) => {

        if(argumentOne === argumentTwo){

            console.log("argumentOne", argumentOne);
            console.log("argumentTwo", argumentTwo);

            return true;
        
        } else {

            return false;
        }
    },

    doubleEquals: (argumentOne, argumentTwo, argumentThree, argumentFour) =>{

        if((argumentOne === argumentTwo) && (argumentThree === argumentFour)){

            return true;
        
        } else {

            return false;
        } 
    },

    notEqual: (argumentOne, argumentTwo) => {

        if(argumentOne === argumentTwo){

            return false;

        } else {

            return true;
        }
    },

    generateUuid: () => {

        return uuidv4();
    },

    count: (index) => {

        return index + 1;
    }
}