/* This function logs the user out when the user clicks the Logout button. */
async function logOut(){

    let request = {

        method: "GET",
        headers: {"Content-Type": "application/json"}
    }

    await fetch("api/users/logout", request);
    
    document.location.replace('/login')
}