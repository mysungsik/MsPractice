// DOM 에 접근하여 js를 통해 HTML에 접근하도록 해보자!!

console.dir(document)


// [Basic!]

// firstchild : 빈 칸(text)
// ==> 우리의 HTML 코드를 보면 body 다음에 [엔터] 한번 쳐서 줄을 바꿨다.
//      DOM 에는 [모든 요소]들이 저장된다. firstchild는 [모든 요소 + HTML 태그] 까지 포함한다.
//      그러므로 [엔터, 띄어쓰기, 등등 모든 요소 중 firstchild 는 당연히 가장 처음있는 줄바꿈이다]
//      그래서 firstchild = [엔터 = 빈 칸]

// Children[0] = firstElementChild
//      ==>> children과 Elementchild 는  [HTML 태그에만 반응한다]
//              그러므로, 우리의 태그를 찾기 위해서는 Children 이나 ElementChild 를 사용한다.








// [Practice!]

// [드릴]
document.body.children[1].children[0].href="https://google.com"

// [getElementById("id")]
let jsselect = document.getElementById("Ms_P")
jsselect.href = "https://naver.com"
// getElementBy ...(class name, name, id 등... 다양하게 나온다. 보고 선택하면 된다.)


// [querySelector(" css태그 ")]
jsselect = document.querySelector("a") // == .querySelector("p a")
jsselect.href = "https://google.com"
// 클래스, CSS태그, 복합 선택자, 아이디(# 으로 시작하는)것 전부 가능하다
// CSS에서 '셀렉터'로 쓴 것은 전부 가능하다는 이야기이다.


let jsselectH1 = document.body.children[0];
let jsselectP = document.body.children[1];


// parentElement(부모요소), previousElementSibling(이전 형제요소), nextElementSibling(다음 형제요소)

console.dir(jsselectH1.parentElement); // [dir 로 접근한 개발자 도구] or [ console.dir(jsselectH1.) ] 을 통해 쭉쭉 나오는 여러가지 
//                                                                                              parameter와 method 들 사이에서 선택 가능.
                                        // , h1 태그의 parent 이므로 body 태그가 선택된다.

console.dir(jsselectH1.nextElementSibling); // h1 태그의 다음 형제요소 = p 태그가 되겠다
console.dir(jsselectH1.previousElementSibling); // h1 태그의 이전 형제요소 = 아무것도 없다 == 오류난다(?)
console.dir(jsselectH1.previousSibling);  // h1 태그의 이전 형제 = 처음 말했던 body 다음의 엔터. 즉, text 가 되겠다.


jsselectH1 = document.getElementById("h1Tag")
jsselectP = document.querySelector(".pTag") // 쿼리 셀렉터, 클래스 선택자

jsselectP.textContent = "This is Java!" // [dir 로 접근한 개발자 도구] or [ jsselectP. ] 을 통해 쭉쭉 나오는 여러가지 
//                                                                                              parameter와 method 들 사이에서 선택 가능.


// 이게 진짜 중요하다!! 
// 자바스크립트로 무얼 할 수 있는지 궁금하다고?
// 개발자 도구, 콘솔창에 가서, 그 태그를 선택[여태 배운 방법 3가지]한 후,
//  (.)을 누르고 있을법한 코드를 (ex. text...)  눌러보면 촤작! 나온다!
// 그거 하나하나 눌러보면 대충 뭔지 다 안다!
