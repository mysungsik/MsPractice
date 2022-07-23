//1,2

let courseName = "mscourse";
let coursePrice = 50000;
let courseGoal = ["html", "css" ,"js"];

console.log(courseName);
alert(coursePrice);
console.log(courseGoal);
alert(courseGoal[1]);


//3,4

let course = {Name : courseName, Price : coursePrice, Goal : courseGoal};

// ==>  let course = {Name : "mscourse", Price : 50000, Goal : ["html", "css" ,"js"]} 
// 굳이 이런식으로 다시 적을 필요가 없다. 변수선언을 하고 값을 넣어놨으니까

console.log(course.Name);
console.log(course.Price);
alert(course.Goal);
alert(course.Goal[1]);



//5,6  == 동적이도록, return값과 parameter를 이용하여, 코스의 골을 알려주는 function 만들기

function getListItem(array, arrayIndex){
    return array[arrayIndex];
}

let mainGoal = getListItem(course.Goal,0);
alert(mainGoal);
mainGoal = getListItem(course.Goal,1)
console.log(mainGoal);

// 혹은 이런 방법도 가능

/*

function getListItem(array, arrayIndex){
    let arrayElement = array[arrayIndex];
    return arrayElement;                    // 차이점은 아래 것은 [let을 통해 함수안에서만 사용 가능한 output을 만든 후], [그 값을 리턴한 것]이고
                                            // 위에 한 것은 [함수에 직접 리턴 값을 만든 것이고]
}

let mainGoal = getListItem(course.Goal,0);

alert(mainGoal)

*/


let mcoursetitle = "1번";
let mcourseprice = "2번";
let mcourseGoal = ["3번", "4번", "5번", "6번"]
let mcourse = { mName : mcoursetitle, mPrice : mcourseprice, mGoal : mcourseGoal}

function mcoursePick(array,arrayIndex){
    let pickN = array[arrayIndex]
    return pickN                    // or return array[arrayIndex] 해도 됌
}

let pickUp = mcoursePick(mcourseGoal,0)
alert(pickUp)
pickUp = mcoursePick(mcourseGoal,1)
alert(pickUp)

function mcoursePick2(array, arrayIndex){
    let pickN = array[arrayIndex]
    return pickN                  // or return array[arrayIndex] 해도 됌
}

let pickUp2 = mcoursePick2(mcourse.mGoal,0)
alert(pickUp2)

pickUp2 = mcoursePick2(mcourse.mGoal,2)
alert(pickUp2)

//====================================================================================

let person = {
    name : "max", // property
    greet(){      // method
        alert("hello")
    }
};

// Object(객체) 안에 함수(function)을 넣을 수 있다.
// 객체 안의 함수는 [method] 라고 부른다
// 객체 안의 함수를 넣을 때에는 function 이라던가, let 이라던가 하는 코드를 집어넣지 않고
//          단순하게 [    함수이름() { 함수 코드 }   ]로 적는다.

// Method의 실행!
// person.greet()

person.greet();