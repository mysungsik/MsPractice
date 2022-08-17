const startBtn  = document.getElementById("game-start")

function startGame(){
    console.log("start game...");
}

startBtn.addEventListener("click",startGame)


// 1. 객체 안에 함수 집어넣고 사용해보기
const person = {
    greet : function greet(){
        console.log("hi there")
    },
    name : "ms",
    age : 30
}
person.greet()
person.name;
// person 이라는 객체 안에, function 이 들어있다. ==> greet() 은 메서드다

//다시말해
// startBtn.addEventListener("click",startGame)
// 에서 addEventListener는 startBtn이라는 개체 안에 메서드다



// 2. 함수를 선언하기, 함수를 표현식으로 만들어 변수에 저장하기

function starGame2(){
    console.log("함수를 선언했다.")
}

let start = function (){
    console.log(" 함수를 start 변수안에 넣어 표현식으로 만들었다.")
};

// 둘의차이점 1. 표현식으로 변수 안에 집어넣은 함수는 더이상 전역으로 사용 할 수없다.
//           2. 표현식으로 만든 함수는 더이상 함수이름이 필요없어서 제외할 수 있다.
//              단, 오류가 발생할 수 있기때문에, 오류이름을 정확하게 파악하기 위해서, 함수이름을 집어넣으면 좋다.

// [표현식 함수의 장점]  : 깔끔하게 정리된 코드를 얻을 수 있다.



// 3. 화살표함수 사용해보기
//   : 간단한 함수에 사용하기 적합하다

const msms = (a,b) => { a + b}
const msms2 = function(a,b){
    return a + b
}
// 두 식은 동일하다
// 화살표함수 의 장점 : 코드가 짧아진다.
//              단점 : 가동성이 떨어진다.

const msms3 = a => {a*a}
// 파라미터가 하나일경우

const msms4 = () => {console.log("hi there!!!!!")}
// 파라미터가 없을경우

msms4()


// 4. 삼항자의 사용

const msmsm3 = "가위"
const msmsm4 = "바위"
const msmsm5 = "보"
let winner = msmsm3 === msmsm4 ? "비김": "짐"
console.log(winner)
let winner2 = msmsm3 === msmsm4 ? "비김" : msmsm3 === msmsm5 ? "짐" : msmsm3 !== msmsm4 ? "와우" : "이김"  
console.log(winner2)

// if, else if , else if, else if , else 
// 처럼 계속해서 붙여 사용할 수도 있다.