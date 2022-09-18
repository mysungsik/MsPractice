const Auth = require("../models/auth")
const validation = require("../util/auth-validation-session")

function getSignup(req, res) {
    let sessionInputData = req.session.inputData;
  
    if (!sessionInputData) {
      sessionInputData = {
        hasError: false,
        email: '',
        confirmEmail: '',
        password: '',
      };
    }
  
    req.session.inputData = null;
    
    res.render('signup', {inputData: sessionInputData});
}


async function getLogin(req, res) {

  const sessionInputData = await validation.sessionErrorData(req,{
    hasError: false,
    email: '',
    password: ''}
    ,function(){
      res.render('login', {inputData: sessionInputData});
  })
}

       


async function createAccount(req, res) {
    const userData = req.body;
    const enteredEmail = userData.email; // userData['email']
    const enteredConfirmEmail = userData['confirm-email'];
    const enteredPassword = userData.password;
  
    if (
      !enteredEmail ||
      !enteredConfirmEmail ||
      !enteredPassword ||
      enteredPassword.trim().length < 6 ||
      enteredEmail !== enteredConfirmEmail ||
      !enteredEmail.includes('@')
    ) {
      req.session.inputData = {
        hasError: true,
        message: 'Invalid input - please check your data.',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      };
  
      req.session.save(function () {
        res.redirect('/signup');
      });
      return;
    }
  
    const existingUser = new Auth(enteredEmail)
    const userExistsAlready = await existingUser.exsistAlready()

    if (userExistsAlready) {
      req.session.inputData = {
        hasError: true,
        message: 'User exists already!',
        email: enteredEmail,
        confirmEmail: enteredConfirmEmail,
        password: enteredPassword,
      };
      req.session.save(function () {
        res.redirect('/signup');
      });
      return;
    }
  
    const hashedPassword = new Auth(enteredEmail,enteredPassword)
    await hashedPassword.signUp()
    
    res.redirect('/login');
}

async function login(req, res) {
    const userData = req.body;
    const enteredEmail = userData.email;
    const enteredPassword = userData.password;
  
    const newUser = new Auth(enteredEmail,enteredPassword)
    const existingUser = await newUser.getUserWithSameEmail()
  
    if (!existingUser) {
      req.session.inputData = {
        hasError: true,
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      };
      req.session.save(function () {
        res.redirect('/login');
      });
      return;
    }

    const passwordsAreEqual = await newUser.login(existingUser.password)
 
  
    if (!passwordsAreEqual) {
      req.session.inputData = {
        hasError: true,
        message: 'Could not log you in - please check your credentials!',
        email: enteredEmail,
        password: enteredPassword,
      };
      req.session.save(function () {
        res.redirect('/login');
      });
      return;
    }
  
    req.session.user = { id: existingUser._id, email: existingUser.email };
    req.session.isAuthenticated = true;
    req.session.save(function () {
      res.redirect('/admin');
    });
}

function logout(req, res) {
    req.session.user = null;
    req.session.isAuthenticated = false;
    res.redirect('/');
}

function get401(req,res){
  res.render("401")
}


module.exports = {
    getSignup:getSignup,
    getLogin:getLogin,
    createAccount:createAccount,
    login:login,
    logout:logout,
    get401:get401


}
