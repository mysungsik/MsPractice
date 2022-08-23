const fs = require("fs")
const path = require("path")


//상대경로로, [내 파일 요청하기] - [라우터들]
const restaurantData = require("./routes/restaurants")
const dafaultData = require("./routes/default")

const express = require("express")
const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

app.set("veiws", path.join(__dirname,"views"))
app.set("view engine","ejs")

app.use("/", restaurantData)
app.use("/", dafaultData)


// [오류처리 페이지] 404, 500 error Page - [미들웨어를 사용한!]

app.use(function (req,res){
    res.render("404")
})
// [일반적으로 localhost:3000 / 이후에 나타나는 url이 잘못되었을 경우 사용 가능한 오류처리] - ex) 주소 잘못입력

app.use(function(error, req, res, next){
    next.render("500")
})
// [4가지의 파라미터를 가지는 [오류처리도구] ] - [파일이 잘못되었을 경우 사용가능] ex) 읽어야하나는 json 파일이 오류가 났다던가... 

app.listen(3000)