// [0] 기본값을 가진 파라미터
function greeting(username = "ms"){
    console.log("hi" + username )
}

function greetingNumber(number, username = "ms"){
    console.log("hi" + username + number)
}
    // [기본값이 있는 매개변수]는 [다른 모든 매개 변수 다음에 추가]하는 것이 중요합니다.

greeting("max")
greeting()
greetingNumber(1,2,3,4,5)

// [1] 일반 [Argument에 배열을 넣어서, 값을 처리하는 함수]
function sumUp(numbers){
    let sts = 0
    for(const num of numbers){
        sts += num
    }
    return sts;
}
console.log(sumUp([1,2,3,4,5]))

// [2] 나머지연산자 (rest parameter) [...]을 사용한 [동적 파라미터]를 가지는 함수
function sumUp2(...numbers){
    let sts = 0
    for(const num of numbers){
        sts += num
    }
    return sts;
}
console.log(sumUp2(1,2,3,4,5,6,7))

const arrayNumber = [1,2,3,4,5,12,31]
// [나머지연산자]는 [다른 모든 매개 변수 다음에 추가]하는 것이 중요합니다.


// [3] 배열의 [값]만을 가져오는 [스프레드 연산자] [...]
console.log(sumUp2(...arrayNumber))



// [4] 결국 함수도 [객체이다]
sumUp2.id = "msms"

console.log(sumUp2.id)


// [5] 템플릿 리터럴

let ms = "hi"
let js = "look!"
console.log(`${ms} ${js}`)

// [6] 기본값과 참조값

const hobbies = ["sports", "soccer"]
hobbies.push("baseball")
console.log(hobbies)


const person = {age:32}
function getAge(p){
    p.age -= 18
    return p.age
}
getAge(person)
console.log(person)
//     ==>> 전역변수인 객체안의 값이 바뀌어버린다. [객체는 그저 주소일뿐이라, 값이 변경되어버린것이다.]

function getAgee(p){
    return p.age -18
}
console.log(getAgee(person))
console.log(person)
// 이러면 안바뀌지

console.log(getAge({...person}))
console.log(person)
// 이래도 안바뀌지2
//  ==> function 안에 [완전히 새로운 객체주소로 생성된] [값만을 받아] 작동시킨것

const hobbiess = ['Sports', 'Cooking'];
const newHobbies = hobbiess;
newHobbies.push('Reading');
console.log(hobbies);
// hobbiess와 newHobbies 의 [값 주소가 동일하므로], newHobbies의 값이 변경되면, hobbiess의 값도 변경된다.


//[7] try catch 를 통해 [함수의 오류를 처리하고, 끊기지 않는 함수 만들기]

const fs = require("fs")

function readFile(){
    try{
        const data = fs.readFileSync("data.json")
    }
    catch{
        console.log("not good path, and no file")
    }
    console.log("hi there")
    
}
readFile();

// [8. Block scoping 개념을 꼭 기억하자] + [섀도잉]

function readFiles(){
    let data;                                       // 이 data는    [1번 data]
    try{
        const data = fs.readFileSync("data.json")   // 이것 data는  [2번 data] 전혀 다른 데이터이다.
    }
    catch{
        console.log("not good path, and no file")
    }
    console.log(data)                               // 이 data고    [1번 data]
}
readFiles();
//  [바깥의 변수는 안에서 사용가능하나, 안에 있는 변수는 바깥으로 나갈 수 없다.] ==> 블록 스코핑
//      ==>> 그래서 undefiend 가 나오는 것이다.

//  물론 [2번 data에] const data 가 아니라 그냥 data 를 썻으면 [바깥의 data에 참조되어 사용 가능하겠다]
//   [섀도잉을 안하는 경우다.]