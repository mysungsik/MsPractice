// [오버레이 켰다 끄기 함수]
function popUpEditWindow(event){
    selectedPlayerId = +event.target.dataset.playerid;
    editWindow.classList.add("overlay-up");
    backDrop.classList.add("back-drop-up");
}

function closeEditWindow(){
    editWindow.classList.remove("overlay-up");
    backDrop.classList.remove("back-drop-up");
    formElement.firstElementChild.classList.remove("error")
    errorMessage.innerHTML = ""
    textElement.value = ""
}
// [여러개의 버튼을 querySelectorAll 로 지정하고, [한번에 이벤트 리스너 달기]]

// [ 양식제출 함수]

function savePlayerConfig(event){   // event 라고 되어있는 property 는 사용되는 곳에 따라 달라진다.

    event.preventDefault(); // Submit 버튼의 기본동작을 방지하는 코드
    const formData = new FormData(event.target) // 폼데이터 라는 메서드를 통해
    let enteredPlayerName = formData.get("playerId").trim()  // 폼 전체중, input 태그의 [name] 인 playerId을 골라온다.
    if(!enteredPlayerName){
        event.target.firstElementChild.classList.add("error") 
        errorMessage.textContent = "이름을 공백없이 입력하세요"
        return;
    }
    const playerChangeName = document.getElementById("player-"+selectedPlayerId+"-data")
    playerChangeName.textContent=enteredPlayerName
    player[selectedPlayerId-1].name = enteredPlayerName

    closeEditWindow();   // 닫히는 함수 다시 불러오자
                        // 닫힐때 input text 안에 값 지워지는 코드도 추가하자
                        // input 타입은 text.value 를 통해 접근한다는 사실을 까먹지말자
}