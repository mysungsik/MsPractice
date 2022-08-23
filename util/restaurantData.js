const fs = require("fs")
const path = require("path")

const filePath = path.join(__dirname,"..","data","restaurant.json")

function bringRestaurantData(){
    const fileText = fs.readFileSync(filePath)
    const storedRestaurants = JSON.parse(fileText)

    return storedRestaurants                                                            // 값을 되돌려받아야하니 return
}

function writeRestaturantData(storedRestaurants){
    fs.writeFileSync(filePath, JSON.stringify(storedRestaurants))
}

module.exports = { bringRestaurantData : bringRestaurantData, writeRestaturantData : writeRestaturantData}              // bringRestaurantData 라는 키를 바깥 파일에서 사용하면, bringRestaurantData 이라는 함수가 실행될것이다.
// [내 파일 노출시키기]                                                           ejs와 같은 느낌이다. 항상. 대부분 같은 이름을 키와 값으로 사용한다.


// const filePath 를 전역변수로 올린 이유
//      : 두 함수에서 전부 써야하니까

// 두가지의 함수를 [다른 function에 저장한 이유] + [이 파일에 전부 저장한 이유]

//      1. app.get() 안에서 하나만 사용될수도, 두 함수를 전부 사용될수도 있으므로, 함께 이 파일에 들어있어야 한다.
//      2. 중간단계를 거쳐 두 함수가 사용되기에, 한번에 묶지는 않았다.