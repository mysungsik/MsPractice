// [1. 요소의 추가] ===================================================================================

// 1. 새로운 element를 만든다.
// 2. 새로운 element를 집어넣을 부모 요소에 접근한다.
// 3. 부모 요소에 새로 만든 element를 집어넣는다.


// [실습]

//1. HTML을 조작하지 않고 새로운 요소 만들기 (createElement)
let NewAnchorElement = document.createElement("a");

//2. 새로 만든 요소를 넣고싶은 부모위치 선택하기
//      : 내 경우에는 body의 3번째 children인 3번째 p태그
let ThirdP = document.querySelector(".pTag")

//3. 선택한 부모의 위치에, 새로운 요소 삽입하기 (append or appendChild)
ThirdP.append(NewAnchorElement)

// 야호! 아무것도 없는 빈, 새로운 앵커태그가 3번째 P태그 글 뒤에 삽입되었다.

NewAnchorElement.textContent = "this is new anchor"
NewAnchorElement.href = "https://google.com"

// 야호! 빈 앵커태그에 텍스트를 적고, 방향을 부여해 보았다.



// [2. 요소의 제거] ===================================================================================

//1. 제거하고 싶은 요소의 선택
let RemoveH1Tag = document.getElementById("h1Tag")

//2. 제거!
RemoveH1Tag.remove();



// [3. 기존 요소의 이동]===================================================================================
//  : [ 2번째 P ]를  [3번째 P]의 [뒤 위치로 이동] 시켜보자

//1. [2번째 P] 선택
let SecondP = document.getElementById("PTag2")

//2. [2번째 p] 의 부모요소를 선택한 후 [append()] 를 사용해서, 그 부모요소의 마지막 부분에 붙여넣어주기
SecondP.parentElement.append(SecondP);
// ==> 조금 이상하게 보일지 모르나, append를 사용하면 그 부모요소의 끝부분에 붙기때문에, 
//              사용하게 되면, HTML은 기존에 있던 것은 중복되므로 자동으로 삭제하고, 끝부분에 붙여버린다. == 두번째 단락이 부모요소의 끝부분으로 가 붙는다.



// [4. JS 에서, 어느 한 ELEMENT에 관한, 모든 HTML 요소 확인 후, 변경] ****
//1. console.log 를 통해,  [innerHTML] Property를 통해 요소 확인    ==>  * [필수는 아님]

console.log(SecondP.innerHTML);     // text와 함께 [html 태그]까지 전부 표시해줌
console.log(SecondP.textContent);   // text만 표시해줌

//2. innerHTML 을 통해, 요소 변경
SecondP.innerHTML = "This is innerHTML parameter. This is <strong> Important! </strong>"
    // innerHTML 은 TextContent와는 다르게, html 태그까지 표시해주며, [html 태그]까지 [사용 가능하다!]
    //  같은 글을 .textContent ="" 를 통해 사용하면, <strong> 태그의 능력은 무시되어 그저 <strong> 이라는 text로 쭉 표시될것이다



// ** 복잡한 InnerHTML 사용
    // 1) 너무나 긴 줄로 인해 [라인을 바꾸고 싶을 때]
SecondP.innerHTML = "This is innerHTML parameter. This is <strong> Important! </strong>" +
    "This is the way of Linebreak" +
    "Just add a plus";
    // 물론 HTML에서 줄이 바뀌는 것은 아니고 그저 가독성을 위한

    //2. InnerHTML은 HTML 처럼 쓸 수 있따는 사실을 명심하고, <태그> 안에 id 혹은 name을 추가 할 수 있음을 기억하자
    SecondP.innerHTML = "This is innerHTML parameter. This is <strong id='storng1'> Important! </strong>" +
    "This is the way of <storng name=\"strong2\"> Linebreak </strong>" +
    "Just add a plus";
    // 나는 "" 안에 text를 썼기에, 내부에 "" 표시를 하려면 \" 를 써야 함을 명심하자, 아니면 ' 을 쓰던가