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


  // 두가지 옵션을 가진, 정렬을 만들어보았다.

  let authororder = req.query.authororder;
  let titleorder = req.query.titleorder;

  let orderdata = "right"

  if(titleorder == "right" || authororder == "right"){
    orderdata = "left"
  }

  if( !authororder){
    fromDatabase.sort(function(A,B){
      if(orderdata =="right" && A.title > B.title){
        return 1 
      }
      else if(orderdata =="left" && B.title > A.title){
        return 1
      }
      return -1
    })
  }
  else if(!titleorder){
    fromDatabase.sort(function(A,B){
      if(orderdata =="right" && A.author.name > B.author.name){
        return 1 
      }
      else if(orderdata =="left" && B.author.name > A.author.name){
        return 1
      }
      return -1
    })
  }

  res.render('posts-list',{fromDatabase:fromDatabase, orderdata:orderdata});
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

  await db.getDb().collection("posts").insertOne(newPost)

  res.redirect("/posts")

  // 결론 ==> 다른 컬렉션을 가져오고싶으면, [병합]이 아니라 [다른컬렉션을 한번 더 쿼리해라]
})

router.get("/posts/:id", async function(req,res){

  // [받아온 아이디를 데이터베이스로 보낼때에는] [반드시 ObjectId를 사용하여 변환시킬것]
  
  // [오류제어]
  // [try catch]로 [혹시 주소를 잘못입력하여 [데이터베이스에서 해당_id 값으로 데이터를 찾을 수 없는 경우] ]
  //    mySQL 의 경우에는 [ 오류처리 미들웨어로 자연스럽게 넘어가지만] [noSQL]인 [mongoDB 에서는 수동으로 처리해주어야한다.]
  let pageId;

  try{
    pageId = new ObjectId(req.params.id) 
  }
  catch(error){
    res.status(404).render("404")
  }

  const fromDatabase = await db.getDb().collection("posts").findOne({_id: pageId}, {summary:0})

  // [받아온 값을 수정하여, (데이터베이스에는 넣지 말고) [사용하기]]

  const trasnformData = {
    ...fromDatabase,
    date : fromDatabase.date.toISOString(),
    humandate : fromDatabase.date.toLocaleDateString("ko-KR",{
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
  }
 // js toLocaleDateString [구글검색 - 사용법나옴]


  if(!fromDatabase){
    return res.status(404).render("404")
  }
  res.render("post-detail", {fromDatabase:trasnformData})
})

router.get("/posts/:id/Edit", async function(req,res){
  let pageId = new ObjectId(req.params.id)
  const fromDatabase = await db.getDb().collection("posts").findOne({_id:pageId}, {title:1, summary:1, body:1})

  res.render("update-post", {fromDatabase:fromDatabase})
})


router.post("/posts/:id/Edit", async function(req,res){
  let pageId = new ObjectId(req.params.id)

  await db.getDb().collection("posts").updateOne({_id : pageId}, { $set : {title: req.body.title, summary : req.body.summary, body: req.body.content}} )

  res.redirect("/posts")
})

router.get("/posts/:id/Delete", async function(req,res){
  let pageId = new ObjectId(req.params.id)

  await db.getDb().collection("posts").deleteOne({ _id: pageId})

  res.redirect("/posts")
})



router.get('/new-post', async function(req, res) {
  const authors = await db.getDb().collection("authors").find().toArray()
  res.render('create-post', {authors:authors});
});

module.exports = router;