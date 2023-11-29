let logInLogOutLink2 = document.getElementById("login-logout-link");

//logInLogOutLink2.addEventListener("click", checkForLogOutCondition)

// logInLogOutLink2.addEventListener("click", async () => {

//     await checkForLogOutCondition();

// });

// async function checkForLogOutCondition(){

//     if(logInLogOutLink2.textContent === "Logout"){
        
//         await logOut();
    
//     } else if (logInLogOutLink2.textContent === "Login"){

//         document.location.replace("/login");
//     }
// }

async function logOut(){

    let request = {

        method: "GET",
        headers: {"Content-Type": "application/json"}
    }

    let response = await fetch("api/users/logout", request);
    
    document.location.replace('/login')
}