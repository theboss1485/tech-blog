let submitButton = document.getElementById("log-in-sign-up-button");
let logInLogOutLink = document.getElementById("login-logout-link");

submitButton.addEventListener("click", (event) => {

    if(submitButton.textContent === "Log In!"){

        logIn(event);

    } else if(submitButton.textContent === "Sign Up!"){

        signUp(event);
    }
})

/* When the user clicks the Sign Up button on the Sign Up page, this function sends
a POST request to create a user and then redirects the user to the appropriate page. */
async function signUp(event){

    event.preventDefault()

    let enteredUsername = document.getElementById("username").value;
    let enteredPassword = document.getElementById("password").value;

        let request = {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ username: enteredUsername, password: enteredPassword})
        }
        
        let response = await fetch("/api/users/", request);

        if(response.url.slice(-9) === 'dashboard'){

            window.location.replace('./dashboard');
        }

        if(response.url.slice(-4) === 'true' && response.redirected === true){

        window.location.replace('/signup?taken=true');
    }
}

/* When the user clicks the Log In button on the Log In page, this function sends
a POST request to log the user in and then redirects the user to the appropriate page. */
async function logIn(event){

    event.preventDefault()

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let credentials = {username: username, password: password}

    try {

        let response = await fetch("/api/users/login", {

            method: "POST",
            headers: {
                
                "Content-Type": "application/json",
            }, 
            body: JSON.stringify(credentials)
        })

        if(response.url.slice(-9) === 'dashboard'){

            if(submitButton.dataset.databasePostId){

                document.location.href = `/single-blog-post-and-comments/?id=${submitButton.dataset.databasePostId}&cudComment=false`;
            
            } else {

                document.location.href = './dashboard';
            }
        }

        if(response.url.slice(-5) === 'false' && response.redirected === true){

            document.location.href = '/login?valid=false';
        }
    
    } catch (error){

        console.log(error)
    }
}