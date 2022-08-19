const { urlencoded } = require("body-parser")
const express = require("express")

const app = express()

app.use(express.urlencoded({extended : false}))     // 미들웨어, 받은 데이터를 자바스크립트 코드로

app.listen(3000)    // 포트번호 3000

app.get("/currenttime",function (req, res){
    res.send("<h1>"+ new Date().toISOString() +"</h1>")
})

app.get("/",function(req,res){
    res.send("<form action='/user-input' method = 'POST'><label> text your name </label><input type='text' name='username'> <button type='submit'></button></form>")
})
// "/" 에 접근한다면, send 안의 HTML 태그를 화면에 표시하고
//  form양식을 제출하면, /uesr-input 이라는 url로 이동, method = POST('대게 줄때 사용 default값')

app.post("/user-input", function(req,res){
    const userName = req.body.username
    console.log(userName)
    res.send('<h1> user name is input</h1>')
})

// form 양식이 post로 오니까, + 받을 목적으로 했으니까 ==> app.post
//      /user-input 이라는 url 태그에 접근하면,
//      req.body.username   ==>>  username 이라는 name을 가진 HTML태그의 데이터를 받아와라
//      res.send('<h1> user name is input</h1>')    ==>> 그리고 이것을 화면에 띄워라