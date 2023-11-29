// const Handlebars = require('handlebars');

// function updateElementText(elementId, variableText){

//     let compiledTemplateWithOldText = Handlebars.compile(document.getElementById(elementId).innerHTML);
//     let alternateOption = undefined;

//     switch (variableName){

//         case"submit button":
//             alternateOption = compiledTemplateWithOldText({ loginOrSignUp: variableText });
//             break;
//         case "link to alternately sign up or log in":
//             alternateOption = compiledTemplateWithOldText({ loginOrSignUpInstead: variableText });
//             break;
//         case "username taken message":
//             alternateOption = compiledTemplateWithOldText({ usernameAlreadyTaken: variableText });
//             break;
//     }


//     document.getElementById(elementId).innerHTML = alternateOption;
// }

// module.exports = updateElementText