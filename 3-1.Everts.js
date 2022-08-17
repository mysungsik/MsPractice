// 생성 create()

let newAnchorTag1 = document.createElement("a");

document.body.append(newAnchorTag1);
newAnchorTag1.innerHTML = "this is <strong>NEW ANCHOR TAG! </stong>"
newAnchorTag1.href="https://naver.com"

// 생성2

let newAnchorTag2 = document.createElement("a")
let secondP = document.getElementById("secondParagraph")
secondP.append(newAnchorTag2);
newAnchorTag2.textContent = "this is SECOND NEW ANCHOR TAG!"
newAnchorTag2.href= "https://google.com"

// 삭제( .remove() )

let firstP = document.querySelector(".firstParagraph")
firstP.remove()

//이동 (.append 응용)

let firstH = document.querySelector("#firstHead")
console.dir(firstH)
firstH.parentElement.append(firstH)



// 이벤트(.addEventListener() )
// [     .addEventListener("동작", "동작시 동작할 함수")     ]

let clickP = document.getElementById("clickParapraph")
clickP.parentElement.append(clickP)

function ChangeParagraph(event){
    clickP.textContent = "you were clicked"
    console.log(event)
}
clickP.addEventListener("click",ChangeParagraph);

// eventListener 의 중요사항!! [함수의 ()는 제거하고, 함수 이름만 적는다!]
// 만약 함수() 라고 전부 ()까지 적어버리면
// 브라우저는 listener 의 실행 여부와 관계없이, 함수를 실행에 옮겨버린다.


// 버튼으로 이벤트 연습2

let clickB = document.getElementById("button1")
clickB.addEventListener("click",ChangeParagraph)




// 텍스트파일 읽는 이벤트리스너

let textListen = document.getElementById("text1")

function retrieveUserInput(){                // retreiveUserInput 이라는 함수를 만든다.
    let enteredText = textListen.value;      // 함수 안에서만 쓸 변수를 만들어, 텍스트에 대한 [value] 를 추출한다.
    console.log(enteredText)                 // Log에 [value] 값을 출력한다.
}                                            //  ==>> [텍스트의 값을 가져와, 로그로 출력하는 함수]

//  자바스크립트에서, 입력요소에 대하여, 삽입된 값을 가져오려면, [value] 를 넣어준다.
// 함수 안에서만 사용할 값을 정한 것이므로 let enteredText 라는 변수를 만들어 함수 안에서만 사용한다.

textListen.addEventListener("input",retrieveUserInput)
// ==>> 최종적으로, 텍스트에 [input] 하면, [텍스트의 값을 가져와, 로그로 출력하는 함수] 를 실행시키는 [리스너] 를 만듬

// * keydown : 입력되기 전 발생, keypress : 중간 , keyup : 입력된 후 발생
// * input : 모든 '입력' + 붙여넣은 텍스트, 끌어온 텍스트, 전부 읽음




//[연습2] 텍스트파일 읽는 이벤트리스너 , 이번엔 [로그가 아니라, 라벨에 즉, 눈앞에 바로 표시되게]

let textR = document.getElementById("textReceive")
let textListen2 = document.getElementById("text2")

console.dir(textListen2)

function receiveTextToLabel(event){
    // let visibleT = textListen2.value;
    let visibleT = event.target.value;
    // let visibleT = event.data;
    textR.textContent = visibleT;
    // console.log(event);     // console.log()라는 코드를 추가하고, 파라미터를 입력해주면, 함수를 실행할때 자동으로 로그가뜬다.
}

// 1. console.log 를 통해 값에 접근하면 [target] 이라는 항목이 보인다.
// 2. [target] 이라는 항목은 [data]에 접근하는 항목이다.
// 3. [event] 라는 파라미터를 만들어, 값에 접근하려면, 
//      위와 같이 [target] 안에 있는 [value] 값에 접근해야한다.
//      ==> 그냥 event.value 가 아니라 event.target.value 에 접근해야만, 되는 것이다.

// 1. 또한 [파라미터.data]에 접근 할 수 있는데.
// 2. [data]는 역시나 [log 값]을 보면 알 수 있듯, [한글자, 한글자만 저장된다.]
// 3. 그러므로 [파라미터.data] 값을 쓰게되면, [한글자, 한글자씩만 표시된다.]


textListen2.addEventListener("input",receiveTextToLabel)

/*   결론 ==> [밸류 값의 저장후 표기]
                1. 직접저장한 변수.value  
                2. 파라미터를 사용후/ 파라미터.target.value
                3. 한글자 한글자 저장 = 파라미터.data
                    * 직접저장한변수.data는 안된다. [한단계를 건너뛴 것이므로]

          ==> [event 가 발생했을 때 값을 저장 하기]
                1. 파라미터에 event 를 적은 후
                2. console.log(event) 를 함수에 적으면, 이벤트가 발생했을 경우, 로그가 표시된다.
*/


// [연습3. 글자갯수 반환하기]

let textR2 = document.getElementById("textReceive2")
let textListen3 = document.getElementById("text3")

function receiveTextToLabel2(event){

    let visibleT = event.target.value.length;
    // let visibleTLength = visibleT.length;
    textR2.textContent = visibleT;
}

textListen3.addEventListener("input",receiveTextToLabel2)

//  ==> [결론] : 따로따로 let 두번씩 쓰지말고, value.length; 로 한번에 글자 수의 값을 저장하자.


// [연습4. 값, 값이 없으면 자신이 원하는 값 표시하는 함수 만들기]
//  간단하게 || 을 사용하여 만들 수 있다.

function showText(){
    let value = textInput.value;
    console.log(value || "nope")
}