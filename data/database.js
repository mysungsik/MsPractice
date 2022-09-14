const mongodb = require("mongodb")

const mongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase(){
    
    const client = await mongoClient.connect("mongodb://127.0.0.1:27017")
    database = client.db("ms-blog")
}

function getDb(){
    if(!database){
        throw{message: "you must connect first!"}
    }
    return database;
}

module.exports = {connectToDatabase:connectToDatabase, getDb:getDb}
