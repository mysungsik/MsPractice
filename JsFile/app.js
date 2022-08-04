// [오버레이 켰다 끄기]

const editButton1 = document.getElementById("edit-Button1") // 버튼 셀렉트1
const editButton2 = document.getElementById("edit-Button2") // 버튼 셀렉트2

const editWindow = document.querySelector(".overlay") // 오버레이 셀렉트
const backDrop = document.querySelector(".back-drop") // 검은 화면 셀렉트
const editWindowCancelButton = document.querySelector(".overlay #cancel") // 오버레이 안의 캔슬버튼

editButton1.addEventListener("click",popUpEditWindow)   // 팝업버튼
editButton2.addEventListener("click",popUpEditWindow)   // 팝업버튼2

editWindowCancelButton.addEventListener("click",closeEditWindow) // 종료버튼
backDrop. addEventListener("click",closeEditWindow) // 검은화면 눌러도 종료되게

// 중요한 점은 [HTML과 CSS 순서를 잘 정리하여, 검은 화면 위에 오버레이가 뜨게 만들었다는 것이다.]
//  1. 검은화면인 backDrop은 [CSS 순서에서, 오버레이보다 위쪽에 적음으로, 오버레이가 위로 덮어지게 만든것이다.] 
//   ==>> 둘다 fixed 지만, overlay가 더 나중에 적혀짐


// [ 양식제출 ]

const formElement = document.querySelector("form") // 폼 선택
const textElement = document.getElementById("user-Id") // 인풋텍스트 선택
let errorMessage = document.getElementById("error-message") // 더블체크 에러메시지용 p
let selectedPlayerId = 0

formElement.addEventListener("submit",savePlayerConfig)

// 중요한점 : [sumbit button] 에 리스너를 다는것이 아니라
//              [폼 전체에] 리스너를 달았다는 점이다.
//             [form 자체에 리스너를 달아버림으로써] [추후 양식제출함수에]
//             [event.target] 으로 [new FormData(event.target)]에 접근이 가능하고,
//              [event.preventDefault() 으로 막을 수도 있고]
//              근데 굳이 그렇게 안해도 될거같기도 하다...
//              전부 아이디로 지정해도 될것같다 아마도. [연습이라 생각하자]

// 중요한점2 : [입력버튼을 만들어서 실행해도] [순간적으로 바뀔뿐 다시 원래 화면으로 돌아온다]
//             이유는 [Submit Button의 기본 동작] 때문이다.
//             [Submmit Button의 기본 동작]은  
//          [브라우저가 HTTP 요청을 서버에게 보내려 시도 => 서버에서 받아도 딱히 할일 없음]
//          ==> [ 다시 똑같은 화면 반환]    우리는 백엔드서버가 없기때문에
//                      [서버가 아닌 자바스크립트에서 동작을 처리해야한다.]
//    그러므로: 우리는  [Button의 기본동작을 억제] 하고 난 후, 함수를 가동해야한다.

// [승자 플레이어 정하기]

let activePlayerSymbol = 0; //플레이어 턴 알려주는 값
let gameRound = 1;  // 라운드 알려주는 값
let gameisovered = false



let player = [
    {name : "", symbol : "X"} , 
    {name : "", symbol : "O"}
]

// [게임판 ]

const startGameButton = document.getElementById("start-game") // 게임스타트버튼
const gameField = document.getElementById("active-game") // 게임필드
const gameFieldElement = document.querySelectorAll("#active-game li") //게임필드 버튼들
const activePlayerName= document.getElementById("active-player-name") //플레이어네임
const gameOverDiv = document.getElementById("choose-winner-div") // 게임끝날시 div
const wonPlayer = document.getElementById("won-player") // 승리자 이름 뜰 스팬
const msmsms = document.getElementById("msmsms")




startGameButton.addEventListener("click",gameStart) // 게임스타트

for(const gameFieldElements of gameFieldElement){
    gameFieldElements.addEventListener("click",clicked)
}

// [필드 버튼 추적하여 승자 정하는 논리]

let gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
