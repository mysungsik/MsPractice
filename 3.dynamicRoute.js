const fs = require("fs")
const path = require("path")
const uuid = require("uuid")

const express = require("express")
const app = express()


app.use(express.urlencoded({extended:false}))
app.use(express.static("public"))

app.set("veiws", path.join(__dirname,"views"))
app.set("view engine","ejs")

app.get("/", function(req, res){
    res.send("<h1> Hello World ! HI! </h1>")

})

app.get("/restaurants", function(req,res){
    const filePath = path.join(__dirname,"data","restaurant.json")

    const fileText = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileText)

    res.render("restaurants", {numberOfRestaurant : storedRestaurants.length, restaurants : storedRestaurants})
})


// [ /:id를 통한 동적 라우트 (이름은 마음대로 지어도된다. /:rid /:restaurantid 등...)]
app.get("/restaurants/:id" ,function(req,res){
    const retaurantId = req.params.id;                                                   // id인 이유는 "/restaurants/:id" 에서 이름을 id로 정의했기 때문
    
    const filePath = path.join(__dirname,"data","restaurant.json")
    const fileText = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileText)

    for (const restaurant of storedRestaurants){
        if(restaurant.id == retaurantId){
            return res.render("restaurants-detail", {title : restaurant})
            
        }
    }
    // id가 같은 것을 찾았으면 [루프를 멈추기 위해 return 을 사용]
    // 같은 id를 찾았다면, [어떤 한 배열의 객체가 선택된 것이고,] [storedRestaurants 안의 값들이 restaurant로 받아와지고 ]
    // "restaurants-detail" 에서, [title 이라는 ejs 구문을 가진 코드를], [for 루프의 restaurant, 즉, storedRestaurants로 바꿔준다.]
})



// [/:id 라는 것은] [restaurants에서 구체적인 id 값에 액세스 할 수 있다는 것이다.]
//      ex) domain/retaurants/r1   ==>  retaurants의 r1값에 접근
//          domain/retaurants/r2   ==>  retaurants의 r2값에 접근
// 동적으로 작동하는 라우트를 만든다, 그리고 detail.ejs 와 연결한다.
// 그렇게 하지않으면, 
// app.get("/restaurant1")
// app.get("/restaurant2")  ... 수백, 수천개의 라우트를 만들어야한다.

app.get("/recommend", function(req,res){
    res.render("recommend")
})

app.post("/recommend", function(req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    // 자바스크립트는 [객체에서 '없는' '속성'에 접근하려 하면, '새로만들어서' 접근하게해준다] 를 이용함
    //      ==>> 객체에 값을 저장할때, 유니크한 아이디와 함께 저장되도록 만들었다.
    const filePath = path.join(__dirname,"data","restaurant.json")
    const fileText = fs.readFileSync(filePath)
    const fileJava = JSON.parse(fileText)

    fileJava.push(restaurant)
    fs.writeFileSync(filePath, JSON.stringify(fileJava))

    res.redirect("/confirm")
})


app.get("/index", function(req,res){
    res.render("index")
})

app.get("/confirm", function(req,res){
    res.render("confirm")
})

app.get("/about", function(req,res){
    res.render("about")
})

app.listen(3000)