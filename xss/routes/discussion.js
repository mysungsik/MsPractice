const express = require('express');
const xss = require("xss")  // 사이트의 데이터베이스에 자바스크립트 코드를 삽입, 사이트를 망가뜨리는 것을 방지하는  sanitize

const db = require('../data/database');

const router = express.Router();

router.get('/', function (req, res) {
  res.redirect('/discussion');
});

router.get('/discussion', async function (req, res) {
  const comments = await db.getDb().collection('comments').find().toArray();
  res.render('discussion', { comments: comments });
});

router.post('/discussion/comment', async function (req, res) {
  const comment = {
    text: xss(req.body.comment) // 사용
  };

  await db.getDb().collection('comments').insertOne(comment);

  res.redirect('/discussion');
});

module.exports = router;
