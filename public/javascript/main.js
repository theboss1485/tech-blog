
//const server = require('../../server.js');

// const updateElementText = require('./helpers/update-element-text.js');

// let currentView = "home";


// let home = document.getElementById("home-link");
// home.addEventListener("click", () => switchViews("home"));

// let dashboard = document.getElementById("dashboard-link");
// dashboard.addEventListener("click", () => switchViews("dashboard"));

// let login = document.getElementById("login-logout-link");
// login.addEventListener("click", () => switchViews("log in"));

// const submitButtonClick = undefined;

// let alternateOption = document.getElementById("alternate-option-button");

// alternateOption.addEventListener("click", () => {

//     if(submitButton.textContent === "Log In!"){

//     updateElementText("link to alternately sign up or log in", "Sign Up Instead");
//     updateElementText("submit button", "Log In!");

//     } else if (submitButton.textContent === "Sign Up!"){

//     updateElementText("link to alternately sign up or log in", "Log In Instead");
//     updateElementText("submit button", "Sign Up!");

//     }
// });


// async function switchViews(page){

//     let response = undefined;

//     let redirectionString = "";

//     if(currentView === "log in"){

//         document.getElementById("log-in-sign-up-button").removeEventListener("click", submitButtonClick)
//     }

//     if(currentView !== page){

//         switch(page){

//             case "home":
//                 break;
//             case "dashboard":
//                 break;
//             case "log in":
//                 await addLogInPageEventListeners();
//                 currentView = page;
//                 break;
//         }

//         window.location.href = "/login"

//         // try{

            
        // } catch (error){

        //     console.log(error);
        // }

        

        // if(!response.ok){

        //     console.log(response.statusText)
        
        // } else {

        //     addLogInPageEventListeners();
        //     currentView = page;
        //     return response.json();
        // }
        
//     }

    
// }

// function addLogInPageEventListeners(){

//     let submitButton = document.getElementById("log-in-sign-up-button");

//         submitButtonClick = function(){
            
//             if(submitButton.textContent === "Log In!"){
        
//                 logIn()
        
//             } else if(submitButton.textContent === "Sign Up"){
        
//                 signUp()
//             }

//         submitButton.addEventListener("click", submitButtonClick)
//     }
// }

// async function logIn(){

//     let username = document.getElementById("username").value;
//     let password = document.getElementById("password").value;

//     let credentials = {username: username, password: password}
//     try {

//         await fetch("/api/login", {

//             method: "POST",
//             headers: {
                
//                 "Content-Type": "application/json",
//             }, 
//             body: JSON.stringify(credentials)
//         })
    
//     } catch (error){

//         console.log(error)
//     }
// }

// async function signUp(){

//     let allUserData = await fetch("/users");

//     let enteredUsername = document.getElementById("username").value;
//     let enteredPassword = document.getElementById("password").value;

//     for(counter = 0; counter < allUserData.length; counter++){

//         if(allUserData[counter] === enteredUsername){

//             updateElementText("error-message", "Error! That username is taken. Try again.")
        
//         } else {

//             let request = {

//                 method: "POST",
//                 headers: {"Content-Type": "application/json"},
//                 body: JSON.stringify({ username: enteredUsername, password: enteredPassword})
//             }
            
//            await fetch("/api/users/", request);
//         }
//     }
// }