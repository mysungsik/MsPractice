const express = require("express")

const route = express.Router()

route.get("/", function(req, res){
    res.render("index")

})

route.get("/index",function(req,res){
    res.render("index")
})

route.get("/confirm", function(req,res){
    res.render("confirm")
})

route.get("/about", function(req,res){
    res.render("about")
})

module.exports = route
