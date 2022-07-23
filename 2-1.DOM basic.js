// DOM이 무엇인가!

// Document Object 
//  ex) window [기본적으로 제공되는 모든 method, property를 가지고 있는 object = docoument object]

// DOM = Documnet Object model

// 웹개발시 작성되뉴 html코드를 해석해, 웹사이트가 불러오면 분석하여, 화면에 표시할 것이 무엇인지 알 수 있게 하는...
// 1. HTML 코드  ==>> 브라우저가 HTML 코드 분석 ==> 화면에 표시할 내용이 무엇인가 알려줌

//      * HTML코드를 분석할 때 브라우저는 [ 자바스크립트 객체 묶음 (Object)으로 해석하고 저장]
//      * 그러므로, 자바스크립트 코드는 DOM과 상호작용 할 수 있디.

//      * 기본적으로 HTML은 Documnet Object 를 통해 코드를 해석하고 저장하므로
//      * 자바스크립트 코드는 DOM과 상호작용 할 수 있고, 그것은 DOM 이라고 부른다.

//      ==>>> 결국!! [자바스크립트 코드]를 [HTML과 상호작용 하기 위한 것]이 바로 [DOM] 이라고 볼 수 있는것이다.(정확히는 아닐지라도)

console.log(window);    // 전역변수 Window 에 관하여 무엇이 있는지 전부 들여다 볼 수 있다.
                        // 전역변수 window 는 기본적으로 내장되어있는  method와 property들을 가지고 있다.
                        // 전역변수 window 는 기본적인 모든 method를 가지고 있는데 
                        // windwow.alert() 를 줄여서 우리는 alert() 라고 쓰고 있는 것이다.

//console.log(window.document)\

console.dir(document)


// 앵커태그에 직접적으로 링크된 주소를 적지 않았다.
// 자바스크립트 코드를 이용해서 링크된 주소를 만들어보자
// 물론 HTML에 직접 적을 수도 있지만, 연습하기위해 -->

// 
// 자바스크립트에서 앵커태그의 접근을 위해 우선, 확인작업을 거친다.
// js에서 html과 script로 연결한 후
// js에서 console.dir(document) 로 html 코드의 자바스크립트코드 해석본을 확인한 후
// 개발자도구에서 [document] [body] -[children] -[p] - [children] - [a] - [href 주소 확인]
//  

//  주소를 확인했으니, js에 가서 직접 연결을 해보자
// 물론, 이 방법은 옳으나, 전혀 편하지 않으며, 더 쉬운 방법이 있다.
// 우리는 연습을 위해 이것을 하는 것이다.

// document.body.children[1].children[0]

// 개발자 도구에서 body에 접근한 후, children을 통하여 a에 접근하면, 마우스를 가만히 a 위에 올려둘 경우, 
// 상세한 a의 주소 (  children[1].children[0]   ) 가 나온다. 그것을 적은 것이다.  
// 물론 a에 접근하고 href 까지 접근해서 href에 마우스를 올려두면  ( body.children[1].children[0].href  ) 까지 전부 상세하게 알려준다.
// 그저 이것은 접근하는 연습일 뿐이다.

// 그리고 나서 .href를 적어도 자동완성이 되지 않는다. 그 이유는 html은 body의 children[1].children[0]이 앵커태그인지 모르기 때문이다.
// 우리는 알고 있으므로 자동완성은 무시하고 . href를 적어준다

// document.body.children[1].children[0].href = "연결할 주소"
//

document.body.children[1].children[0].href="https://google.com"

// 왜 안돼!
// 이유는 순서에 있다.
// 우리는 HTML에 자바스크립트 코드를 어디서 연결햇는가? <HEAD> 섹션
//  그럼 우리의 자바스크립트 코드는 <BODY> 섹션보다 위에 있으므로, 자바스크립트 코드가 먼저 실행된다.
// 앵커도 없는데 자바스크립트 코드에 입력되는 주소가 먼저 실행되는 것이다.


 
//     이것을 해결하는 방법은 2가지!

//     1. 자바스크립트 코드 연결을 코드 아래로 내리거나 [절대 비추]

//     2. 연결되는 코드에 defer 속성을 추가하거나  [이것이 최고!]**********************************
//     *defer = 전체 문서가 전부해석될때까지, 작동을 미뤄라 라는 코드

//     ==>> <script src="/2-1.DOM.js" defer > </script>  ******************


    
// 
//     여기까지가 우리가 DOM에 접근하고,
//                      요소의 정확한 위치(주소)를 찾아내 접근하고,
//                      그 요소를 선택하여,
//                      DOM을 직접 수정해보았다.

