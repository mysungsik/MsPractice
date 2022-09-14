const express = require("express")
const bcrypt = require("bcrypt")
const mongodb = require("mongodb")

const ObjectId = mongodb.ObjectId

const route = express.Router();
const db = require("../data/database")

route.get("/", function(req,res){
    const csrftoken = req.csrfToken()
    res.redirect("home", {csrftoken:csrftoken})
})

route.get("/home", function(req,res){
    const csrftoken = req.csrfToken()
    res.render("home", {csrftoken:csrftoken})
})

route.get("/signup", function(req,res){
    const csrftoken = req.csrfToken()
    res.render("signup", {csrftoken:csrftoken})
})

route.get("/login", function(req,res){
    const csrftoken = req.csrfToken()
    res.render("login", {csrftoken:csrftoken})
})

route.get("/post", function(req,res){
    const csrftoken = req.csrfToken()
    
    if(!req.session.isAuthenticated){
        return res.status(404).render("404")
    }

    const authorname = req.session.user.email

    res.render("post",{authorname:authorname, csrftoken:csrftoken})
})

route.get("/post-list", async function(req,res){
    const csrftoken = req.csrfToken()
    
    if(!req.session.isAuthenticated){
        return res.status(404).render("404")
    }

    const allUserPost = await db.getDb().collection("userPost").find({},{authorPenName:1, text:1}).toArray()

    // 정렬

    let queryOrder = req.query.order
    let arrayOrder = "left"
    console.log(queryOrder)

    if(queryOrder == "left"){
        arrayOrder="right"
    }

    allUserPost.sort( function(A,B){
        if( arrayOrder =="right" && A.authorPenName > B.authorPenName ){
            return 1
        }
        else if(arrayOrder =="left" && B.authorPenName > A.authorPenName ){
            return 1
        }
        return -1
    })
    


    res.render("postlist",{allUserPost:allUserPost, arrayOrder:arrayOrder , csrftoken:csrftoken})
})

route.get("/post-list/:id", async function(req,res){
    const csrftoken = req.csrfToken()

    if(!req.session.isAuthenticated){
        return res.status(404).render("404")
    }
    const postId = ObjectId(req.params.id)

    const post = await db.getDb().collection("userPost").findOne({_id:postId})

    res.render("postlist-detail",{post:post , csrftoken:csrftoken})
})

route.get("/post-list/:id/delete", async function(req,res){
    const csrftoken = req.csrfToken()

    const postId = ObjectId(req.params.id)

    await db.getDb().collection("userPost").deleteOne({_id:postId})

    res.redirect("/post-list", { csrftoken:csrftoken})
})

route.get("/post-list/:id/update", async function(req,res){
    const csrftoken = req.csrfToken()

    const postId = ObjectId(req.params.id)
    const userPostData = await db.getDb().collection("userPost").findOne({_id:postId})

    res.render("post-update",{userPostData:userPostData , csrftoken:csrftoken})
})

route.get("/logout", function(req,res){

 
    // 인증세션
    req.session.user = {
        id : "",
        email :""
    }
    req.session.isAuthenticated = false

    req.session.save(function(){
        res.redirect("/login")
    })
})





route.post("/signup", async function(req,res){

    const userpassword = req.body.signupPassword;

    console.log(userpassword)
    const hashedPassword = await bcrypt.hash(userpassword, 12)
    const userInput = {
        email : req.body.signupEmail,
        password : hashedPassword
    }

    await db.getDb().collection("userData").insertOne(userInput)

    res.redirect("/login")

})

route.post("/login", async function(req,res){

    const userInputEmail = req.body.loginEmail
    const userInputPassword = req.body.loginPassword

    const existUser = await db.getDb().collection("userData").findOne({email:userInputEmail})

    if(!existUser){
        return res.redirect("/login")
    }

    const checkPassword = await bcrypt.compare(userInputPassword,existUser.password)

    if(!checkPassword){
        return res.redirect("/login")
    }

    req.session.user = {
        id : existUser._id,
        email : existUser.email
    }
    req.session.isAuthenticated = true

    req.session.save(function(){
        res.redirect("/post")
    })

    
})

route.post("/post", async function(req,res){

    const authorEmail = req.body.postAuthorEmail;
    const authorPenName = req.body.postAuthorNick;
    const postText = req.body.postText;
    const time = new Date().toISOString();
    console.log(time)
    const post = {
        authorid : req.session.user.id,
        authoremail : authorEmail,
        authorPenName : authorPenName,
        text : postText,
        time : time
    }

    await db.getDb().collection("userPost").insertOne(post)

    res.redirect("/post")
})

route.post("/post-list/:id/update", async function(req,res){

    const postId = ObjectId(req.params.id)

    const authorEmail = req.body.postAuthorEmail;
    const authorPenName = req.body.postAuthorNick;
    const postText = req.body.postText;
    const time = new Date().toISOString();


    await db.getDb().collection("userPost").updateOne({_id:postId}, {$set :{
        authoremail : authorEmail,
        authorPenName :authorPenName,
        text : postText,
        time : time
    }})

    res.redirect("/post-list")
})

module.exports = route