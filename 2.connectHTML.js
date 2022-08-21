const fs = require("fs")
const path = require("path")

const express = require("express")
const app = express()

app.use(express.urlencoded({extended:false}))

app.get("/", function(req, res){
    res.send("<h1> Hello World ! HI! </h1>")

})

// HTML, CSS를 묶어 Views 라고 부른다. 그래서 그 파일들은 대부분 [Views] 폴더에 따로 만들어 집어넣는다.




// [node.js에서 html을 연결하는 방법]
//  : [파일 경로 지정] , [ sendFile 을 통해, 파일 자체를 불러옴]
// 물론 라우터경로는 자기마음대로지만   [대게, html 파일 이름을 기능에 잘맞게 짓기때문에, 그대로 따라가면 좋다.]

// 레스토랑
app.get("/restaurants", function(req,res){
    const htmlFilePath = path.join(__dirname,"views","restaurants.html")
    res.sendFile(htmlFilePath)
})

// 추천
app.get("/recommend", function(req,res){
    const htmlFilePath = path.join(__dirname,"views","recommend.html")
    res.sendFile(htmlFilePath)
})

// 인덱스
app.get("/index", function(req,res){
    const htmlFilePath = path.join(__dirname,"views","index.html")
    res.sendFile(htmlFilePath)
})

//확인
app.get("/confirm", function(req,res){
    const htmlFilePath = path.join(__dirname,"views","confirm.html")
    res.sendFile(htmlFilePath)
})

// 소개
app.get("/about", function(req,res){
    const htmlFilePath = path.join(__dirname,"views","about.html")
    res.sendFile(htmlFilePath)
})

// 문제 1: 기존에 작성했던 HTML 파일에 [앵커태그 주소]에는 [HTML파일명] 으로 저장되어 있어서, [서버에서 사용하기에는 적합하지않다.]
//      해결 : [앵커태그의 주소를] ["/restaurants", "/index" 처럼 도메인 뒤에 올 URL 주소로 변경한다.]

// 문제 2: 이렇게 한다면, CSS는 없는 HTML 파일만이 올것이다.
//      이유 : [서버에서, CSS파일의 경로를 인식하고, 잡지 못했다.] - 생각해보면, node.js에서 파일을 열 때에는, 항상 경로지정했다는 사실을 명심하자
//             [HTML 파일을 서버에서 열면] [브라우저는 HTML 안에 링크되어 있는 CSS, Javascript 파일에 대한 [요청을 서버에 보낼것이고]]
//             [ 서버에서는 그 요청을 처리하고 싶지만, 처리할 경로를 쓰지 않았다.]

//             [ 그렇다고, 수백, 수천개의 이미지파일, css파일, javascript 파일에 전부 경로를 입력할 수는 없다] - 정적파일
//             [ 그렇다면, express() 의 도움을 받아 편하게 처리해보자]
//                      *CSS, JAVASCRIPT 파일은 미리 적어두고 [서버측에서 변경하지 않기 때문에] [정적파일 (static file) 이라고 부른다.]
//                      * html은 정적이지만, 서버에 의해 바뀔것이라, [동적으로 변할 것이다.] 


app.listen(3000)