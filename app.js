const path = require("path")
const express = require("express")

// 세션 패키지 설치
const session = require("express-session")
const mongodbStore = require("connect-mongodb-session")
const mongoSession = mongodbStore(session)

//세션 저장소 데이터
const app = express();
const sessionStore = new mongoSession({
    uri:"mongodb://127.0.0.1:27017",
    collection : "mssession"
})

const db = require("./data/database")
const route = require("./routes/route")

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))

// 세션 생성
app.use(session({
    secret : "super secret",
    resave : false,
    saveUninitialized : true,
    store : sessionStore
}))

// locals [헤더 동적바꾸기]
app.use(async function(req,res,next){
    
    const isAuth = req.session.isAuthenticated;

    if(!isAuth){
        return next()
    }

    res.locals.isAuth = isAuth;
    next()
})

// 라우트 미들웨어
app.use(route)

db.connectToDatabase().then(function(){
    app.listen("3000")
})
