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

// [ 양식제출 ]

const formElement = document.querySelector("form") // 폼 선택
const textElement = document.getElementById("user-Id") // 인풋텍스트 선택
let errorMessage = document.getElementById("error-message") // 더블체크 에러메시지용 p
let selectedPlayerId = 0

formElement.addEventListener("submit",savePlayerConfig)


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

