const express = require("express")
const uuid = require("uuid")

const resData = require("../util/restaurantData")        // 상대경로로 [내 파일 요청하기] - [노출시킨 파일만 작동가능] - [잘린 코드들]
const route = express.Router();


route.get("/restaurants", function(req,res){
    const storedRestaurants = resData.bringRestaurantData();
    let queryData = req.query.order;
    let orderLaw = "right"

    if(queryData === "right"){
        orderLaw = "left"
    }

    //배열을 정렬시키는 sort()
    storedRestaurants.sort(function(resA,resB){
        if(orderLaw === "right" && resA.name > resB.name){
            return 1
        }
        else if(orderLaw === "left" && resB.name > resA.name){
            return 1
        }
        return -1
    });
    

    res.render("restaurants", 
    {numberOfRestaurant : storedRestaurants.length, 
    restaurants : storedRestaurants,
    orderLaw : orderLaw
    })
})

// [ /:id를 통한 동적 라우트 (이름은 마음대로 지어도된다. /:rid /:restaurantid 등...)]
route.get("/restaurants/:id" ,function(req,res){
    const retaurantId = req.params.id;                                                   // id인 이유는 "/restaurants/:id" 에서 이름을 id로 정의했기 때문
    
    const storedRestaurants = resData.bringRestaurantData();

    for (const restaurant of storedRestaurants){
        if(restaurant.id == retaurantId){
            return res.render("restaurants-detail", {title : restaurant})
        }
    }
    res.status(404).render("404")
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

route.get("/recommend", function(req,res){
    res.render("recommend")
})

route.post("/recommend", function(req,res){
    const restaurant = req.body;
    restaurant.id = uuid.v4();
    // 자바스크립트는 [객체에서 '없는' '속성'에 접근하려 하면, '새로만들어서' 접근하게해준다] 를 이용함
    //      ==>> 객체에 값을 저장할때, 유니크한 아이디와 함께 저장되도록 만들었다.

    const storedRestaurantData = resData.bringRestaurantData();
    // [위치잡고, json파일읽고, 자바로바꾼 함수] ==> 결과물 : 자바로바뀐.json 데이터

    storedRestaurantData.push(restaurant)
    
    resData.writeRestaturantData(storedRestaurantData)
    // 받은 json 자바 데이터를, 텍스트데이터로 바꿔, 다시파일에 쓰는 함수

    res.redirect("/confirm")
})

module.exports = route
