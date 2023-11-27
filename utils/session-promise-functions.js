async function sessionSaveWithPromise(req){

    return new Promise((resolve, reject) => {

        req.session.save((error, result) => {

            if(error){

                reject(error);
            
            } else {

                resolve(result)
            }
        })
    })
}

async function sessionDestroyWithPromise(req){

    return new Promise((resolve, reject) => {

        req.session.destroy((error, result) => {

            if(error){

                reject(error);
            
            } else {

                resolve(result)
            }
        })
    })
}

module.exports  = {sessionSaveWithPromise, sessionDestroyWithPromise}