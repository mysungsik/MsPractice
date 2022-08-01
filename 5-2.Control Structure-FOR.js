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