let textSpan = document.getElementById("textLengh") 
let textTarget = document.getElementById("text1") 


let allowedTextNumber = text1.maxLength;

let SecondS = document.getElementById("secondSpan");

SecondS.textContent = "/ " + text1.maxLength;
textSpan.textContent = text1.maxLength;

function calculationTextLength(event){
    let textT = event.target.value.length;
    
    let caculated_Number = -(textT - allowedTextNumber);
    textSpan.textContent = caculated_Number;

}

textTarget.addEventListener("input",calculationTextLength)



// For 반복문 시작

/* [1] for 반복문

    for (초기값; 조건값[값이 참이면 반복해라]; 변하는값;){
        }

*/ 

for (let i=0; i<=10; i++){
    console.log(i);
}
// 내부에서 지정한 i 는 반복문 내부에서만 쓸 수 있음을 명심하자!

// [2] for - of 반복문
//  : 배열변수 (array) 에 사용할 수 있는 반복문

const msArrays = ["hi","my","is", "myungsik"]

for (const msArray of msArrays){ // for 반복문과는 달리, 하나하나 다른 것이 지정되므로, const 를 사용가능하고, 선호함을 알자. let이 불가능한건아니다.
    console.log(msArray);
}

// [3] for - in 반복문
// : 객체(object)에 사용할 수 있는 반복문

const loggedInUsers = {
    name : "ms",
    age : 29,
    isAdmin: true
};


for (const propertyName in loggedInUsers){  // 역시나, 하나하나 다른것이 지정되어 있으므로, const 사용가능, 선호.
    console.log(propertyName)   // 이렇게되면 key만 표시된다.
    console.log(loggedInUsers[propertyName]) // 일반적으로 object는 loggedInUsers.name, loggedInUsers.age 처럼 (.)을 사용하여 표기한다. 
}                                            // 그렇지만 for - in 반복문에서는 loggedInUsers[대괄호] 으로 값을 표기하며
                                             // 그러므로, loggedInUsers[propertyName]을 사용하면, 모든 object 값에, 동적으로 접근한다.

// [4] while 반복문
//  : 우리가 선택한 조건이 참이라면, 계속해서 반복한다.  반복 on / off 스위치 라고 보면됌 

let isFinished = false

while (!isFinished) {
    isFinished = confirm("do you wnat to quit?")       // confirm 은 alert의 대안으로, 다른점은 yes or no 를 선택할 수 있다.
}
alert("Done!")

//[5] do while 반복문
//  : 일단 조건을 생각하지 않고 실행한 후, 조건을 확인한다.

let j =3;
do {
    console.log(j)
} while(j >4)

let i =3;
while(i >3){
    console.log(i)
}

let msAraay = [
    {name : "msms",
    age : 35
    },
    {hobby : "soccer",
    hobby2 : "soccer2"}
]

for(let msa of msAraay){
    for(let msaa in msa){
        console.log(msaa)
        console.log(msa[msaa])
    }
}

// break와 continue 를 통하여, 반복문 제어하기

//break ==> 정지하기
for(i=0; i <6 ; i++){
    if(i ===3 ){
        break
    }
    console.log("hi", i)
}
// log 안에 (,)를 쓰면 두가지 모두에 대해 적용




//continue ==> 넘기기
for(i=0; i <6 ; i++){
    if(i ===3 ){
        continue
    }
    console.log("hi" + i)
    if( i===5){
        throw{ message: "숫자가 5다"};
        // 오류를 나타내는 코드, throw
    }
}
// log 안에 (+)를 쓰면 두가지가 하나의 문자로 합쳐져서 적용




// 오류가 발생했을때, throw 라는 오류메시지를 출력하며, 강제로 default 값을 주는 코드 [   try{} catch(){}   ]
let ms;
function msms(){
    ms = "hithere"
    if( ms !=3){
        throw {message: "this is not 3"};
    }
}

try{msms()}
catch(error){
    console.log(error);
    ms = 3;
    console.log(ms)
}

