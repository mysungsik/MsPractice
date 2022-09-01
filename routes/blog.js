const { render } = require('ejs');
const express = require('express');

// ObjectId 를 쓰기위한 require
const mongodb = require("mongodb")

const router = express.Router();
const db = require("../data/database")

// 몽고db에서 쓰는 [특수한 성격의 id 값으로, 반환해주는 코드]
const ObjectId = mongodb.ObjectId


router.get('/', function(req, res) {
  res.redirect('/posts');
});



router.get('/posts', async function(req, res) {

  //  중첩된 객체의 표현은  [""] 을 사용하여 표시하는 것을 잊지 말자 
  //  [필요한 데이터만을 불러와서, 서버에 무리가 없게 하자!]
  const fromDatabase = await db.getDb().collection("posts").find({},{title:1 , summary:1, "author.name" :1}).toArray()

  res.render('posts-list',{fromDatabase:fromDatabase});
});



router.post("/posts", async function(req,res){
  
  // create-post의 [form]에는 [author.name 에 넣을 값이 없다].
  // 그러므로, ejs에서 받아온 objectid(= author.id) 로, [데이터베이스에서 찾아서, 따로 데이터를 넣어줄것이다.]

  const authorId =  new ObjectId(req.body.author)
  const author = await db.getDb().collection("authors").findOne({_id: authorId})
  //                                                    findOne() 은 .toArray()를 쓰지 않아!!!
  
  const newPost = {title: req.body.title,
  summary : req.body.summary,
  body : req.body.content,
  date : new Date(),
  author : 
  {id: authorId , 
  name: author.name,
  email: author.email } 
  }

  const result = await db.getDb().collection("posts").insertOne(newPost)
  console.log(result)
  res.redirect("/posts")

  // 결론 ==> 다른 컬렉션을 가져오고싶으면, [병합]이 아니라 [다른컬렉션을 한번 더 쿼리해라]
})

router.get("/posts/:id", async function(req,res){
  
  let pageId = ObjectId(req.params.id) 
  // [받아온 아이디를 데이터베이스로 보낼때에는] [반드시 ObjectId를 사용하여 변환시킬것]

  const fromDatabase = await db.getDb().collection("posts").findOne({_id: pageId})
  res.render("post-detail", {fromDatabase:fromDatabase})
})

router.get('/new-post', async function(req, res) {
  const authors = await db.getDb().collection("authors").find().toArray()
  res.render('create-post', {authors:authors});
});



module.exports = router;