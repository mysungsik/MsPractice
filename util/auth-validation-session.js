function signupValidation(email,confirmEmail,password){
    return !email ||
    !confirmEmail ||
    !password ||
    password.trim().length < 6 ||
    email !== confirmEmail ||
    !email.includes('@')
}

function sessionErrorData(req, data,action){

    let sessionInputData = req.session.inputData;

    if (!sessionInputData) {
        sessionInputData = {
          ...data
        };
      }

      req.session.inputData = null;

      req.session.save(action)
      
    return sessionInputData
}

function getUserInputSessionError(req,data,action){

    if (existingUser) {
        req.session.inputData = {...data};
        req.session.save(action);
        return
    }
}

function notgetUserInputSessionError(req,data,action){

    if (existingUser) {
        req.session.inputData = {...data};

        req.session.save(action);
        return
    }
}

module.exports = {
    
    signupValidation:signupValidation,
    sessionErrorData:sessionErrorData,
    getUserInputSessionError:getUserInputSessionError,
    notgetUserInputSessionError:notgetUserInputSessionError

}
