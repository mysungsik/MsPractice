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

app.use(demoRoutes);

app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
