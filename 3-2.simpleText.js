let textSpan = document.getElementById("textLengh") 
let textTarget = document.getElementById("text1") 


/*

function calculationTextLength(event){

    let textT =  event.target.value.length;
    // ==> let textT =  textTarget.value.length; 최대한 전역변수 사용을 금하자
    textSpan.textContent = textT;

    // or 
    // let textT = event.target.value;
    // textSpan.textContent = textT.length;
}

==>> 이렇게되면, HTML에서, maxLength인 60이라는 숫자를 변경할때 마다
        숫자를 변경시켜야한다.

*/

let allowedTextNumber = text1.maxLength;

let SecondS = document.getElementById("secondSpan");

SecondS.textContent = "/ " + text1.maxLength;
textSpan.textContent = text1.maxLength;

function calculationTextLength(event){
    let textT = event.target.value.length;
    
    let caculated_Number = -(textT - text1.maxLength);
    textSpan.textContent = caculated_Number;
}

// 이렇게하면, html 변경시 전부 같이 변경되는 좋은 점!!


textTarget.addEventListener("input",calculationTextLength)


// [상수에 관하여]

/*
 상수는 한번 정해지면 바뀌지 않는 값을 말한다.  그렇다면.,
 
    const textTarget = document.getElementById("text1") 

로 저장한 값을 다룰때에

    textTarget.textContent = "이것"

이라고 쓰면 상수인 값을 변경하는 것이므로 [오류가 날까?]

[정답은 '아니'다]

    textTarget은 상수이지만, 그의 값은 변하지 않고 [속성값 (property)] 만 변경시켰기에
우리는  cons로 textTarget을 지정해도, 그의 textContent 값은 충분히 바꿀 수 있다.

[상수는] [내부에 있는 객체들의 값(value) 만 변하지 않게 만드는 것이다.]


*/