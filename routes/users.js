const express = require('express');
const mongodb = require("mongodb")

const multer = require("multer")

const db = require("../data/database")

const ObjectId = mongodb.ObjectId;
const router = express.Router();

// 1. multer의 자세한 저장정보 입력 [ 저장위치, 파일 이름 등...]

const storageFile = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null, "images")
  },
  filename :  function(req,file,cb){
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// 2. multer의 자세한 저장정보를 받아, upload 변수를 만듬
const upload = multer({storage: storageFile})



router.get('/', function(req, res) {
  res.render('profiles');
});

router.get('/new-user', function(req, res) {
  res.render('new-user');
});


// 3. multer의 자세한 저장정보를 받아 만든 변수를 사용해 [ejs의 "name" 태그에서 넘어온 값을 받아 파일데이터로 저장]
//    [추가사항] 데이터베이스에 path 저장!
router.post("/profiles", upload.single("image"), async function(req,res){
  const fileData = req.file;
  const userData = req.body;

  await db.getDb().collection("usersfile").insertOne({
    name : userData.username,
    imagePath : fileData.path})

  console.log(fileData)
  res.redirect("/")
})
// : [file-demo] db에 ==> [usersfile] collection에 저장됌 

module.exports = router;
