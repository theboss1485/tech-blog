let logInLogOutLink2 = document.getElementById("login-logout-link");

//logInLogOutLink2.addEventListener("click", checkForLogOutCondition)

logInLogOutLink2.addEventListener("click", async () => {

    console.log("inside test");
    await checkForLogOutCondition();

});

async function checkForLogOutCondition(){

    console.log("Test!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log(logInLogOutLink2.textContent);

    if(logInLogOutLink2.textContent === "Logout"){
        console.log("Test!!!");
        
        await logOut();
    
    } else if (logInLogOutLink2.textContent === "Login"){

        console.log("Login");
        document.location.replace("/login");
    }
}

async function logOut(){

    console.log("TEST @@@@@");

    let request = {

        method: "GET",
        headers: {"Content-Type": "application/json"}
    }

    console.log("request set!!!");

    let response = await fetch("api/users/logout", request);

    console.log("Response", response);
    
    document.location.replace('/login')
}