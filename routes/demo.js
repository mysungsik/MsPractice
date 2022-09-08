const express = require('express');
const bcryptjs = require("bcryptjs")

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.render('welcome');
});

router.get('/signup', function (req, res) {             // 3-3. 전부다 다시쓰기를 방지하기 위한 세션을 소환, ejs 로 보냄

  let userInputData = req.session.userInputData;

  if(!req.session.userInputData){                       // 3-4. 만약 req.session.userInputData 가 없다면 (= 잘못입력한적이 없다면) ejs 로 보낼값은 "" 빈칸
    userInputData = {
      haserror : false,
      message: "",
      email : "",
      confirmemail : "",
      password : ""
    }
  }
        
  req.session.userInputData = null;                     // 3-5  [데이터 세션 초기화], [세션에 데이터가 쌓이는것을 방지하기위해]

  res.render('signup', {userInputData:userInputData});
});

router.get('/login', function (req, res) {

  let inputUserData = req.session.userInputData;

  if(!req.session.userInputData){
    inputUserData ={
      haserror : false,
      message: "",
      email : "",
      password : ""
    }
  }
  req.session.userInputData = null
 


  res.render('login',{inputUserData:inputUserData});
});

router.post('/signup', async function (req, res) {
  const userData = req.body;
  const enteredEmail = userData.email; // userData["email"]
  const enteredCongfirmEmail = userData["confirm-email"] // 간단한팁: '-' 쓸 수 없는 문자를 가진, name 을 받을때 (.)을 사용하지말고 []를 사용하면된다.
                                                  // userData["confirm-email"] =>> userData.confirm-email [하지만 - 를 쓸 수없으니 전자로 대체]
  const enteredPassword = userData.password;   
  const hashedPassword = await bcryptjs.hash(enteredPassword, 12)

  const user = {
    email : enteredEmail,
    password : hashedPassword
  }

  if(enteredEmail !== enteredCongfirmEmail || !enteredPassword || !enteredEmail || !enteredEmail.includes("@") || enteredPassword.length < 6 ){
    console.log("please check your email again")

    req.session.userInputData = {                       // 3-1. 잘못된 양식으로 회원가입을 하려고 했을 경우, 전부다 다시 쓰는것을 방지하기위한 , 데이터 세션 생성
      haserror : true,
      message: "not correct form",
      email : enteredEmail,
      confirmemail : enteredCongfirmEmail,
      password : enteredPassword
    }
    
    req.session.save(function(){
      res.redirect("/signup")                         // 3-2. 다시 회원가입페이지로 돌아가고, 리턴을 통해 다음 코드들 사용을 멈춤
    })
    
    return 
  }

  const existingUsers = await db.getDb().collection("users").findOne({email:enteredEmail}) 

  if(existingUsers){
    req.session.userInputData = {                       // 3-1. 잘못된 양식으로 회원가입을 하려고 했을 경우, 전부다 다시 쓰는것을 방지하기위한 , 데이터 세션 생성
      haserror : true,
      message: "User alrady exist",
      email : enteredEmail,
      confirmemail : enteredCongfirmEmail,
      password : enteredPassword
    }
    req.session.save(function(){
       res.redirect("/signup")
    })
    return                                                // return 을 밖으로 빼지 않으면, if 내부의 문장만 멈추고, 다음 코드로 넘어가버림
  }

  await db.getDb().collection("users").insertOne(user)

  res.redirect("/login")

});



router.post('/login', async function (req, res) {

  const userData = req.body;
  const enteredEmail = userData.email;
  const enteredPassword = userData.password;


  const existingUsers = await db.getDb().collection("users").findOne({email:enteredEmail}) // 1-1. 이메일로, 사용자가 존재하는지 찾기

  if(!existingUsers){
    return res.redirect("/login")
  }

  const passwordIsEqual = await bcryptjs.compare(enteredPassword,existingUsers.password) // 1-2.bcryptjs의 내장 매소드로 [입력한 패스워드, 해싱된 데이터베이스의 패스워드] 를 서로 비교, 결과값은 [불리언]으로 나온다.
  
  if(!passwordIsEqual){
    
    req.session.userInputData = {
      haserror : true,
      message: "incorrect user input",
      email : enteredEmail,
      password : enteredPassword
    }
    req.session.save(function(){
       res.redirect("/login")
    })
    return
  }

  console.log("user is authenticated")

  req.session.user = {    // 2-1. 세션에 [user] 라는 [필드데이터 안에] [로그인한 유저의 데이터id와 email 을 넣음]   ==> [인증을 위하여]
    id : existingUsers._id,       // 2-2. sessions 콜렉션 안에 session 이란 폴더 안에 id와 email
    email : existingUsers.email
  }
  req.session.isAuthenticated = true

  req.session.save(function(){  // 2-3. 세션이 저장되면 admin으로 들어가지게 만듬
    res.redirect("/admin")
  })
});



router.get('/admin', function (req, res) {
  if(!req.session.isAuthenticated){ //    or !req.session.user [세션이 없다면]
    return res.status(401).render("401")     // 2-4. 인증이 false라면 (= or 세션이 없으면), /admin  접근불가
  }

  res.render('admin');
});



router.post('/logout', function (req, res) {
  req.session.user = null   // 2-5. 세션을 전부 지우진 않고, 세션 안의 user 데이터만 지움
  req.session.isAuthenticated = false;

  res.redirect("/login")
});

module.exports = router;