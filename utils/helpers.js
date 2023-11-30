const dayjs = require('dayjs');

// The expert learning assistant chatbot told me how to use the UUID package.
const {v4: uuidv4} = require('uuid');
const { update } = require('../models/User');

module.exports = {

    /* This handlebars helper function compares two arguments so that I can use 
    handlebars to see if two elements are equal.*/
    equals: (argumentOne, argumentTwo) => {

        if(argumentOne === argumentTwo){

            return true;
        
        } else {

            return false;
        }
    },

    /* This handlebars helper function formats a date to be MM/DD/YYYY. */
    formatDate: (dateToBeFormatted) => {

        let formattedDate = dayjs(dateToBeFormatted).format('MM/DD/YYYY');
        return formattedDate;
    },

    /* This handlebars helper function generates UUIDs for use as the IDs of certain HTML elements.*/
    generateUuid: () => {

        return uuidv4();
    },

    /* This handlebars helper function increments a counter for use with edit comment buttons.*/
    count: (index) => {

        return index + 1;
    }
}