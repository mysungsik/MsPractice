const mongodbStore = require('connect-mongodb-session');

function sessionStroage(session){
    const MongoDBStore = mongodbStore(session);
    
    const sessionStore = new MongoDBStore({
        uri: 'mongodb://127.0.0.1:27017',
        databaseName: 'auth-demo',
        collection: 'sessions'
      });

    return sessionStore
}

function sessionCreate(sessionStore){

    return {  secret: 'super-secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000
    }}
}

module.exports = {
    sessionStroage:sessionStroage,
    sessionCreate:sessionCreate
}