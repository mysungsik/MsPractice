// [node express 의 사용]
// npm init
// npm install express

const fs  = require("fs")   // 파일 시스템 패키지에 접근
const path = require("path")

const { urlencoded } = require("body-parser")
const express = require("express")


const app = express()

app.use(express.urlencoded({extended : false}))     // 미들웨어, 받은 데이터를 자바스크립트 코드로

app.listen(3000)    // 포트번호 3000

app.get("/currenttime",function (req, res){
    res.send("<h1>"+ new Date().toISOString() +"</h1>")
})

app.get("/",function(req,res){
    res.send("<form action='/user-input' method = 'POST'><label> text your name : </label><input type='text' name='username'> <button type='submit'></button></form>")
})
                                                                         // "/" 에 접근한다면, send 안의 HTML 태그를 화면에 표시하고
                                                                            //  form양식을 제출하면, /uesr-input 이라는 url로 이동, method = POST('대게 줄때 사용 default값')
app.post("/user-input", function(req,res){
    const userName = req.body.username;                             // 받아온 텍스트 데이터 [지만, use에 의해, 자바스크립트데이터]

    const filePath = path.join(__dirname,"data","user.json")         // 적고싶은 파일에 경로

    const fileText = fs.readFileSync(filePath)                       // json의 텍스트데이터
    const fileJava = JSON.parse(fileText)                            // json의 자바스크립트데이터

    fileJava.push(userName)                                         // json의 자바스크립트데이터에 [받아온 데이터를 푸쉬]

    fs.writeFileSync(filePath, JSON.stringify(fileJava))            // 저장한 자바스크립트 데이터를 [텍스트 데이터로 변환하여], filePath 경로에 적고, 씀(저장함)

    res.send('<h1> user name is input</h1>')
})

app.get("/users",function (req, res){
    const filePath = path.join(__dirname,"data","user.json")
    const fileText = fs.readFileSync(filePath)
    const fileJava = JSON.parse(fileText)   // 자바

    let userData = "<ul>"
    for(let user of fileJava){
        userData += "<li>" + user +"</li>"
    }
    userData += "</ul>" //자바

    res.send(fileJava)  //자바

    // 단순히 파일위치를 불러와서, 자바코드로 바꿔서, send()
    // send는 HTML 태그르 그대로 사용하므로! 자바스크립트코드로 적어서 변수에 저장해도 사용가능하다!
    
})




// form 양식이 post로 오니까, + 받을 목적으로 했으니까 ==> app.post
//      /user-input 이라는 url 태그에 접근하면,
//      req.body.username   ==>>  username 이라는 name을 가진 HTML태그의 데이터를 받아와라
//      res.send('<h1> user name is input</h1>')    ==>> 그리고 이것을 화면에 띄워라