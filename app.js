const fs = require("fs");
const path = require("path");
const uuid = require("uuid")
const express = require("express")

const app = express()

app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))

app.set("views", path.join(__dirname,"views"))
app.set("view engine","ejs")


app.get("/about", function(req,res){
    res.render("about")
})
app.get("/confirm", function(req,res){
    res.render("confirm")
})
app.get("/index", function(req,res){
    res.render("index")
})
app.get("/recommend", function(req,res){
    res.render("recommend")
})
app.post("/recommend", function(req,res){
    const restaurantsData =  req.body;
    restaurantsData.id = uuid.v4()

    const filePath = path.join(__dirname,"data","restaurants.json")
    const fileText = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileText)

    storedRestaurants.push(restaurantsData)

    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants))

    res.redirect("/confirm")
})

app.get("/restaurants", function(req,res){
    const filePath = path.join(__dirname,"data","restaurants.json")
    const fileText = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileText)

    res.render("restaurants", {restaurantData : storedRestaurants})
})

app.get("/restaurants/:id", function(req,res){
    const URLid =  req.params.id;

    const filePath = path.join(__dirname,"data","restaurants.json")
    const fileText = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileText)
    
    for(const pickData of storedRestaurants){
        if(URLid === pickData.id){
            return res.render("restaurantsDetaile" , {data : pickData})
        }
    }
    
    //  이러면 어떤 배열을 가져올지 어떻게 아니!
    // 배열을 선택해주어야지
})


app.listen(3000)
