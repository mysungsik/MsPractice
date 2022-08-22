const fs = require("fs")
const path = require("path")

const express = require("express")
const app = express()


app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

app.set("veiws", path.join(__dirname,"views"))
app.set("view engine","ejs")

app.get("/", function(req, res){
    res.send("<h1> Hello World ! HI! </h1>")

})

// HTML, CSS를 묶어 Views 라고 부른다. 그래서 그 파일들은 대부분 [Views] 폴더에 따로 만들어 집어넣는다.



// [node.js에서 html을 연결하는 방법]
//  : [파일 경로 지정] , [ sendFile 을 통해, 파일 자체를 불러옴]
// 물론 라우터경로는 자기마음대로지만   [대게, html 파일 이름을 기능에 잘맞게 짓기때문에, 그대로 따라가면 좋다.]

// 레스토랑

app.get("/restaurants", function(req,res){
    const filePath = path.join(__dirname,"data","restaurant.json")

    const fileText = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileText)

    res.render("restaurants", {numberOfRestaurant : storedRestaurants.length, restaurants : storedRestaurants})
    // restaurants.ejs 파일을 랜더해라(실행해라), 그 안에있는 numberOfRestaurant 라는 ejs 구문이 있다면,
    //                                                          그 안에는 storedRestaurants.length 값을 집어넣어라
    
    // [ejs 탬플릿을 사용],  [ejs 엔진을 사용함으로써], res.sendFile() 대신 쓰는,
    //                                           [HTML 을 동적으로 바꿔주는 아주 유용한 기능]

})

// 추천
app.get("/recommend", function(req,res){

    res.render("recommend")
})

app.post("/recommend", function(req,res){
    const restaurant = req.body;
    const filePath = path.join(__dirname,"data","restaurant.json")
    const fileText = fs.readFileSync(filePath)
    const fileJava = JSON.parse(fileText)

    fileJava.push(restaurant)
    fs.writeFileSync(filePath, JSON.stringify(fileJava))

    res.redirect("/confirm")
})
// 1. get과 post를 같은 주소에 대하여 동시에 쓸 수 있다.
// 2. HTML 파일에 form 안의 method를 post로 넣을 것이기 때문에, 역시나 값을 받을 경우 post를 쓸것이다.
// 3. res.send()   를 HTML태그로 할 경우,  [양식을 다시 제출하게 만드는 경고문을 받는다.]
//      ==>> redirect()
// 4. redirect() 란 : [post를 끝내고 나면], [다른 페이지로 넘어가야한다고 브라우저에게 전달하는 코드]

// [헷갈리는점] 
//  * [/recommend 페이지]에서 [form 양식을 제출하면] [action 으로] [다시 본인의 페이지로 돌아온다.]
//  * 이전에 배울때는 form 양식을 제출하면 action 에 의해 [다른페이지로 갔지만], [이번에는 본인 페이지에 머무는 것이다]
//  * [그러므로, get과 post 라우터를 두개 다 자신의 페이지에 걸어두고,]
//  *   [redirect로 confirm 으로 이동하는것이다.]


// 인덱스
app.get("/index", function(req,res){
    res.render("index")
})

//확인
app.get("/confirm", function(req,res){
    res.render("confirm")
})

// 소개
app.get("/about", function(req,res){
    res.render("about")
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

//      해결 : 미들웨어함수 app.use(express.static(" 정적파일이 들어있는 폴더"))

//              ex) app.use(express.static("public"))

//      헷갈리는점:  * [HTML 파일에 링크되어있는] CSS, JAVASCRIPT파일들은 [상대경로] 로 지정되어있어서, [정적파일 경로상]에는 문제가 없다.
//                                                  ex) href="styles/shared.css"    [앞에 / 가 없는, 어디든 style 폴더안에 shared.css 가 있으면되는]
//                  * 또한, [HTML에 링크된 파일을 불러와달라는] [브라우저에서 요청은] [미들웨어함수로 처리] 했으니 완벽하게 작동한다. 




app.listen(3000)