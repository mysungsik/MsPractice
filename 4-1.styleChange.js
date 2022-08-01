let textSpan = document.getElementById("textLengh") 
let textTarget = document.getElementById("text1") 


let allowedTextNumber = text1.maxLength;

let SecondS = document.getElementById("secondSpan");

SecondS.textContent = "/ " + text1.maxLength;
textSpan.textContent = text1.maxLength;

function calculationTextLength(event){
    let textT = event.target.value.length;
    
    let caculated_Number = -(textT - text1.maxLength);
    textSpan.textContent = caculated_Number;

}

textTarget.addEventListener("input",calculationTextLength)








// [클래스 이름의 변경] - className

textTarget.className = "newClassName"
textSpan.className = "warning"
    // 미리 CSS 속성을 적용시켜놓고 class이름을 js로 지정하면
    // 짜잔- 하고 CSS 요소가 적용된다.


// [클래스 이름의 변경2 - 이미 Class가 있는 요소에 class를 변경한다면]

textSpan.className = "notWarning"
    // 기존에 있던 클래스는 삭제되고 새 클래스가 그 클래스를 덮는다.
textSpan.className = "warning"

    // 그렇다면 기존 클래스에, [추가적으로 class 를 넣고싶다면]
textSpan.className = "notWarning warning"
    // 추가할 클래스를 적고, 이렇게 띄어쓰기를 한 후 기존의 class를 한번더 적어주면
    // 기존의 class는 유지시킨채, 새로운 클래스를 추가할 수 있다.

// [이게 다 뭐냐, 너무나 관리하기 귀찮다.]
// [우리는 편하게 관리하기 위해 classList 를 사용하겠다.]


// [classList] - classList
textSpan.classList.add("newClass2")
textSpan.classList.remove("newClass2")
textSpan.classList.replace("notWarning","thisIsWarning")

