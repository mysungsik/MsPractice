
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

    if (caculated_Number === 0){
        textTarget.classList.add("error")       // 남은숫자 1 ==> 0 가 되면 error 코드 추가, warning 이 있더라도 error의 CSS코드가 뒤에있으므로 상관없음
    }

    else if(caculated_Number <= 40) {
        textTarget.classList.add("warning")     // 남은숫자가 40이하, 41  ==> 40 이 된다면, warning 추가
        textTarget.classList.remove("error")    // 남은숫자가 0 ==> 1이 될경우 조건에 만족하므로, 이미 있던 error를 지워줘야한다.
    }
    else{
        textTarget.classList.remove("warning")      // 남은숫자 40  ==> 41 밖에 없으므로, 이미 error는 지워져있는 상태이므로, warning만 제거해도 된다.
        // or textTarget.classList.remove("warning", "error")
    }

};

// function 안에 if문을 넣어서, function 안에 있는 변수들이 굳이 밖으로 나오지 않아도 사용가능하게 합시다.
// 와이런 미친!! ClassList로 추가했으면 뭐하나!! [ CSS 규칙에 의하여 , .warning:focus 라고 적은 css는 .nemo input 이라고 쓴 것에 의해 묻혀서 쓸 수 없었다.]
//                                             [ 그래서 더 강력한 input.warning:focus 라고 적으니 작동이 아주 잘된다!!!!]

//  [고려할 것 1.]
// if 문은 칠 때마다 [새로이 검증한다]
// 한 글자를 칠 때마다, [남은 글자 수가 0인가요? -NO ==> 그럼 글자수가 40 이하인가요? - YES 를 반복하며 순서대로 검증하는것이다.]
// 그러므로, [둘의 위치를 바꾼다면, 글자수가 0 가 되어도, 첫 조건인 40이하도 0 를 포함시키기에 실행되지 않는다.]
//  [검증 순서를 잘 생각하며, IF 코드를 작성하도록 하자]

// [고려할것 2.]
// CSS코드를 추가, 제거하며 문자의 스타일을 변경시키는 것이므로, [CSS 코드의 우선순위를 잘 파악하도록 하자!]

textTarget.addEventListener("input",calculationTextLength);



// if문의 시작

const myName = "ms";
const notMyName = "not ms"

if (myName === "ms"){
    console.log("hello")
}

let x = 1;
let y = 2;

if (x == y) {   // true
    console.log(myName);
}    
else {  // false
    console.log(notMyName)
}    

/* 
if ( 조건[반드시 boolean ] ) {
    코드
}    
*/ 


//1. compararison operators
//    ==>  ==  (같음ex) 5 == "5" true 
//        === ( 완벽히 같음[타입까지] ex) 5 === "5" false, 
//          > (영문도 가능 a < b true), <, >=, <=
//          ![반전] ex) !(4>4) true
//  값들은 하드코딩 하지않고, 대게, 변수값이나, 웹사이트에 있는 값을 가져온다.

//2. Logical operators
//   ==>  && [모두 참이여야 참] , || [하나만 참이여도 참] 

// 2===2 || 2 === 2  && 5 === 6
//      ==>> 자바스크립트는 and 연산자를 먼저 처리하고, or 연산자를 나중에 처리하기 때문에
//      ==>> && 쪽은 false 일지라도,  || 쪽은  true 이므로  ture 값이 나온다.
//  (2 === 2 || 2 === 2 ) && 5===6 
//      ==>> 이처럼 괄호를 활요하면, false 가 나온다.





// [플래그] - true or false가 이미 저장되어 있는 변수

// [1] 값이 저장되어 있는 변수

let isLoggedIn = true;

if (!isLoggedIn){
    console.log(" User is not logged in! ")
}
else if (isLoggedIn){
    console.log(" User is logged in! ")
}
else{
    console.log("nothing")
}

// [2] 비어있는 문자열 or 0 == False 로 처리

let isMyName = "ms!"

if (""){    // 여기서 비어두도록 ()안의 공간에 아무것도 적지 않는다면 [if문 자체가 실행되지 않는다!]
    console.log("user name is empty")
}

// [3] 1 을 적으면  true 처리

if (1){
    console.log(" 1 is true!")
}

// [4] 글자수를 활용한 로그인 이름 처리

if (isMyName.length >0) {
    console.log("User Name is Valid")
}
