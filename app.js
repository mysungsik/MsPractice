const path = require('path');
const express = require('express');
const session = require('express-session');
const csrf = require('csurf')

const db = require('./data/database');
const blogRoutes = require('./routes/blog');
const authRoutes = require("./routes/auth")
const sessionConfig = require("./config/session")

const userAuthentication = require("./middleware/auth-middleware")
const csrfMiddleware = require("./middleware/csrf-token-middleware")

const sessionStore = sessionConfig.sessionStroage(session)

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session(sessionConfig.sessionCreate(sessionStore)));

app.use(csrf());

app.use(userAuthentication);
app.use(csrfMiddleware)

app.use(authRoutes);
app.use(blogRoutes);


app.use(function(error, req, res, next) {
  res.render('500');
})

db.connectToDatabase().then(function () {
  app.listen(3000);
});
