const path = require('path');

const express = require('express');
const session = require("express-session")  // 1.세션 패키지
const mongodbStore = require("connect-mongodb-session")  // 2. 세션 저장 패키지 리콰이어

const MongoDBStore = mongodbStore(session)  // 3.정보 뽑고, 세션연결

const SessionStore = new MongoDBStore({   // 4. 세션 저장할곳 타겟
  uri : "mongodb://127.0.0.1:27017",
  databaseName : "auth-demo",
  collection : "sessions"
}) 



const db = require('./data/database');
const demoRoutes = require('./routes/demo');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({                     // 5. 세션을 통과하는 미들웨어 만들기
  secret : "super-secret",
  resave : false,
  saveUninitialized : false,
  store : SessionStore
}))


app.use(async function(req, res, next){             // 4-0 모든 요청에 처리되는 미들웨어를 생성

  const user = req.session.user;                                              // 4-1 세션에 저장된 유저가 있다면(로그인했다면)
  const isAuth = req.session.isAuthenticated;                                  // 4-2 인증서를 주고,

  if(!user || !isAuth){
    return next();                // 4-3 세션에 저장된 유저가 없다면(로그인하지 않았다면), 이 라우터(미들웨어) 를 넘어가라 [여기까지만 실행하고, 다음 라우트를 실행해라]
  }

  
  const userDoc = await db.getDb().collection("users").findOne({_id : user.id})   //  4-4 데이터베이스에서, 인증한 유저와 같은 유저데이터를 찾아 저장
  const isAdmin = userDoc.isAdmin;                                                //  4-4 그 유저가 관리자 인지도 파악  [ 미리 데이터베이스에 업데이트해서 admin = true 넣어둔 아이디가 있음]

  res.locals.isAuth = isAuth;             // 4-5 인증이 되어있는지에 대하여 [ 전역변수처리(모든 라우트, 모든 템플릿까지! )]
  res.locals.isAdmin = isAdmin;           // 4-5 관리자인지 아닌지에 대하여 [ 전역변수처리(모든 라우트, 모든 템플릿까지! )]

  next()                                  // 4-6 다 되엇으면 다음 으로 넘어가게 만들어라! [안그러면 평생 로딩중임]
})

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
