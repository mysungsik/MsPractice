const path = require('path');

const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: false }));

// 유저에게 전체공개 [필터 없이 전부 처리하고] [public 폴더에 있는것 공개]
app.use(express.static('public'));

// 유저에게 전체공개 [/images 폴더 안에 있는 처리하고] [ images 폴더에 있는 것만 미들웨어처리]
app.use("/images",express.static("images"))

app.use(userRoutes);

db.connectToDatabase().then(function () {
  app.listen(3000);
});
