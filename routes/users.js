const express = require('express');
const mongodb = require("mongodb")

// 1. multer require
const multer = require("multer")

const db = require("../data/database")

const ObjectId = mongodb.ObjectId;
const router = express.Router();

// 2. 경로, 파일저장이름 정하기
const storageData = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,"images")
  },
  filename : function(req,file,cb){
    cb(null, Date.now() + "-" + file.originalname)
  }
})

// 3. multer로 저장
const upload = multer({storage: storageData})









router.get('/', async function(req, res) {
  const userdatas = await db.getDb().collection("usersfile").find().toArray()   // 프로필만들기

  res.render('profiles', {userdatas:userdatas});
});

router.get("/delete/:id", async function(req,res){
  const pageId = ObjectId(req.params.id) 

  await db.getDb().collection("usersfile").deleteOne({_id: pageId})
  res.redirect("/")
})

router.get('/new-user', function(req, res) {
  res.render('new-user');
});

// 4. 미들웨어처리 + 데이터베이스로 보내기
router.post("/profiles", upload.single("inputImage"), async function(req,res){
  const filedata = req.file;
  const userdata = req.body;

  await db.getDb().collection("usersfile").insertOne({
    filePath : filedata.path,
    username : userdata.username
  })

  res.redirect("/")
})


module.exports = router;
