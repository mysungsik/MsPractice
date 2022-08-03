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

/* 
    for(let editButtonss of editButtons){

        function popUpEditWindow(){
            editWindow.classList.add("overlay-up");
            backDrop.classList.add("back-drop-up"); 
        }
        editButtonss.addEventListener("click",popUpEditWindow)
    }
*/ 

// [ 양식제출 함수]

function savePlayerConfig(event){   // event 라고 되어있는 property 는 사용되는 곳에 따라 달라진다.
                                    // 우리는 js의 formElement. 즉, form 에서 사용되므로
                                    // event는 form, event.target은 form의 data가 되겠다.
    event.preventDefault(); // Submit 버튼의 기본동작을 방지하는 코드
                            // 기본동작 = 브라우저 -HTTP 요청을 서버로 - 서버동작
                            // 'event' 라는 property를 반드시 적어주어야 한다.
    const formData = new FormData(event.target) // 폼데이터 라는 메서드를 통해
                                                // 폼 전체에 대한 양식을 제출
                                                // FormData() 는 [object] 형태이기 때문에, new라는 태그를 반드시 사용해야한다.
                                                // new 는 함수 내 사용되는 [모든 object] 형태를 지시할때 사용한다.
    let enteredPlayerName = formData.get("playerId").trim()  // 폼 전체중, input 태그의 [name] 인 playerId을 골라온다.
                                                        // FormData() 는 HTML 태그에서 불러오기 때문에, name을 선택자로 잡은것이다.
                                                        // get은 가져온는 코드
    if(!enteredPlayerName){
        event.target.firstElementChild.classList.add("error") 
        // event.target은 form을 의미하고, 그의 firstElementChild는 첫번째 div를 의미한다.
        //  id 를 추가하여 div를 선택할 수도 있지만, 연습과 실용성 목적으로 이 코드를 넣었다.
        errorMessage.textContent = "이름을 공백없이 입력하세요"
        return;
    }
        // function 에서 return 이후로는 코드의 작동을 금지하므로, 
        // if가 실행되어, 저 말이 보인다면, 더이상 이후코드는 읽지 못한다.

    // [ 검증을 통과하여, 다음 코드가 실행되었다면]
    // [ 이제 중요한 [어떻게 한 화면에서 입력된 양식이 
    //  어떻게 두명의 플레이어게 각각 알맞게 구분하여 들어갈 수 있는가 이다.]]

    // 1. [data- 의 활용]
    //
    //  : HTML코드의 data-식별할이름 = "1" or 2 3 4... 를 통해서, 
    //      [두개의 다른 오버레이를 켜는 버튼]에 [다른 식별자]를 생성한다.
    //  : [하나의 오버레이]일 지라도, [어떤 버튼을 클릭했느냐에 따라 다른 곳으로 연결]되는 것이다.
    //      ex) HTML코드에... data-playerid = "1"

    // 2. [JS의 플레이어의 DATA 식별번호를 가질 변수 생성하기]
    //
    //   :  ex) let SelectedPlayerId = "0"
    //
    //    이 변수는 앞으로, DATA 식별번호를 가질 [동적인 변수]가 될것이다. value는 신경쓸필요 없다.

    // 3. [JS에서, 각 Edit 버튼으로 따로 접근하도록 function 코드 고치기]
    //
    //   : [오버레이를 껏다 켜는 함수에], [event.target 으로], 눌려질 [버튼의 액세스 권한]에 접근한후, 
    //     ***** [event.target.dataset.식별이름];     ******
    //       * 식별이름은 [HTML태그의 data-식별이름과 동일해야한다]
    //          
    //   : [오버레이를 켜는 버튼]을 눌렀을 경우, 단순히 오버레이가 뜨는 것이 아니라, 
    //      [식별자에 의해 선택된 곳의 오버레이가 뜨는 함수]로 변경하는것
    //
    //   ex) SelectedPlayerId = +event.target.dataset.playerid;
    //    우리는 식별자를 playerid ="1" ,  playerid ="2" 로 했으므로 1 or 2의 수를 가질것이다.
    //       * 만약 식별할 이름에 - 가 들어가면 [대괄호]를 써야한다. ex) dataset["player-id"]
    //      *** [중요] : + 를 붙이는 이유는 [문자열]을 [숫자형식] 으로 바꿔주기 위함이다.
    //    
    //   : 그렇다면 이제, [오버레이를 켜는 함수가 실행되는 순간]
    //      함수 자체가 player 버튼을 식별하여 선택할 능력을 가진다.

    // 4. [양식 제출하는 함수에, 각각에 맞는 HTML태그를 선택하기]
    //
    //   : HTML 태그에 적은 [플레이어 식별 번호를 저장하는 변수] SelectedPlayerId 를 2번에서 만들었다.
    //   : [오버레이 팝업 함수를 실행하면] SelectedPlayerId 에 [플레이어 식별번호가 저장되고]
    //   : 그렇다면 그것을 활용해, [동적으로 JS에서 HTML 태그를 선택할것이다! 동적으로!]

    //    : 만약 선택해야할 id 값이 각각, [player-1-data], [player-2-data] 라면
    //        document.getElementById("player-" + SelectedPlayerId + "-data")
    //      로, 동적으로 선택하여 각각의 id값에 접근할 수 있다!

    //
    // 이 4단계를 종합하면, [한 함수에서 시작되는] [한 오버레이]에서 나오는 데이터를 
    //      [각각의 원하는 곳]에 [제출할 수 있다.] 

    let playerChangeName = document.getElementById("player-"+selectedPlayerId+"-data")
    playerChangeName.textContent=enteredPlayerName

    

    const winnerPlayer = player[selectedPlayerId-1].name
    /*
    if (selectedPlayerId === 1){
        player[0].name = winnerPlayer
    } else 
        player[1].name = winnerPlayer
                                         이 것과 저 한줄이 같다! 대단해!
                                    배열의 인덱스를 활용한결과 이다.
                            selectedPlayerId 의 값에 + 기호를 붙여 "숫자"로 만든것도 한몫 한다.
    */

    closeEditWindow();   // 닫히는 함수 다시 불러오자
                        // 닫힐때 input text 안에 값 지워지는 코드도 추가하자
                        // input 타입은 text.value 를 통해 접근한다는 사실을 까먹지말자
}