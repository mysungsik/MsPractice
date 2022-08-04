function reSetGame(){
    // 리셋하려면, 게임데이터, 플레이어이름데이터, 필드데이터, 전부 리셋
    gameRound = 1;
    activePlayerSymbol = 0; // 플레이어 턴 알려주는 값
    msmsms.innerHTML = '<span id="won-player"> Player! </span> You Win!' // 승자 알려주는 div 리셋
    gameOverDiv.style.display = "none"  //승리 div 없애기

    let gameBoardIndex =0;
    gameisovered = false

// [for 두번 돌려서, gameData 전부 리셋시키기] + [심볼 다 없애기] + [CSS 다없애기] 동시!!!

    for(let i=0; i <3; i++){
        for(let j=0; j <3; j++){
            gameData[i][j] = 0;
            let gameBoardElement = gameFieldElement[0].parentElement.children[gameBoardIndex];
            gameBoardElement.textContent = "";
            gameBoardElement.classList.remove("disabled");
            gameBoardIndex++
        }
    }
    // for(i=0; i<9; i++){
    //     gameFieldElement.parentElement[i].textContent =""
    // }
    // 이렇게 X표와 O표를 전부 없앨 수도 있지만 !! 위에 방법이 아주 깨알같다!!!

    // F0R 루프가 3번씩 3번, 총 9번 돌아가므로! 거기 낑겨서 없애면 아주 좋다!
}


function gameStart(){
    
    if (player[0].name === "" || player[1].name ===""){
        alert("please Check your Id");
        return;
    }   // 리턴이 되면, 멈춘다를 꼭 기억하자

    

    reSetGame() // 위치 아주 중요! 이름은 리셋되지 않기에 여기가 딱 맞음! + 게임판 보여야 하니까!
    activePlayerName.textContent = player[0].name
    gameField.style.display = "block"
    
}

function switchPlayer(){
    if (activePlayerSymbol === 1){
        activePlayerSymbol = 0
        activePlayerName.textContent = player[0].name
    }else {
        activePlayerSymbol = 1
        activePlayerName.textContent = player[1].name
    }
    gameRound++

    // 혹은 activePlayerName.textContent = player[activePlayerSymbol].name
    // 으로 두줄을 전부 제거하고, 깔끔하게 정리해도 된다.
}
// 스위치 성공!



// [필드 버튼 추적하여 승자 정하는 논리]=======================================

// function checkForGameOver(){
//     if (gameData[0][0]>0 && gameData[0][0] === gameData[0][1] &&  gameData[0][1]=== gameData[0][2])
//     alert("winner is" + player[gameData[0][0] -1].name)
// }
//  ==> 이것을 기본 논리로 하여, for문으로 가로쫙 세로 쫙 해서 한번에 논리를 정해보자

function checkForGameOver(){

    for(i=0; i<3; i++){
        if (gameData[i][0]>0 && gameData[i][0] === gameData[i][1] &&  gameData[i][1]=== gameData[i][2]){
            return gameData[i][0]
        }   
    }
    // 가로

    for(i=0; i<3; i++){

        if (gameData[0][i]>0 && gameData[0][i] === gameData[1][i] &&  gameData[1][i]=== gameData[2][i]){
            return gameData[0][i]
        }
        
    }   
    //세로

    //좌상 우하 대각선
    if (gameData[0][0]>0 && gameData[0][0] === gameData[1][1] &&  gameData[1][1]=== gameData[2][2]){
        return gameData[0][0]
    }
    
    //좌하 우상 대각선
    if (gameData[0][2]>0 && gameData[0][2] === gameData[1][1] &&  gameData[1][1]=== gameData[2][0]){
        return gameData[0][2]
    }
    
    if (gameRound == 9){
        return -1;
    }
    return 0
}



// [클릭하면, li의 데이터를 추적해서, 내 gameData 안에 넣고, 심볼넣고, 스위치, 최종까지 하는 논리=======================================
// [리스트 안에 달아놓을 버튼용이므로, event.target은 li이다.]

function clicked(event){
    let dataCol = +event.target.dataset.col -1; //HTML의 Li의 data넘버를 dataset으로 가져옴
    let datarow = +event.target.dataset.row -1; //HTML의 Li의 data넘버를 dataset으로 가져옴

    if (gameData[datarow][dataCol] >0 || gameisovered){ // 이미 유저가 눌러 할당되었다면! 이라는 간단한논리!  // + 게임이 끝나면 gameisovered=ture 로 할당하여, 모든 곳에 클릭 금지!
        return;                         //  이미 눌린곳은 1이상이므로, gameData[datarow][dataCol] >0 가 ture ==> return 작동금지!
                                        //
    }                                 
    // 순서가 중요하다! 이것을 만약,  이 아랫줄로 내린다면 무언가 꼬인다!
    
    event.target.classList.add("disabled")
    event.target.textContent = player[activePlayerSymbol].symbol

    gameData[datarow][dataCol] = activePlayerSymbol +1


    // 클릭되었다 --> 초기 activePlayerSymbol=0 --> gameData의 row,col 에 맞춰 gameData의 숫자를 업데이트 하는데
    //      그 숫자는 activePlayerSymbol +1 이 되고,  switchPlayer() 에 의해 activePlayerSymbol=1 이 되며, 두번째 플레이어로 넘어간다.
    //      activePlayerSymbol=1 이되고, 다시 누르면, 다시 gameData의 row,col 에 맞춰 gameData의 숫자를 업데이트하는데 숫자는 2
    //      반복!
    
    const winnerPlayer =  checkForGameOver();

    if (winnerPlayer !== 0){
        gameOver(winnerPlayer);
        
    }
    switchPlayer()
}


// [게임 종료 및 재시작 로직]=======================================

function gameOver(winnerPlayer){
    gameOverDiv.style.display = "block"
    gameisovered = true

    if (winnerPlayer >0){
        const winnnerName = player[winnerPlayer-1].name;
        wonPlayer.textContent = winnnerName;
    }
    else {
        wonPlayer.parentElement.textContent = "It's Draw"
        gameOverDiv.style.display = "block"
    }

}




//=============================================================================================================

// 결론:
// 이런것에는 [데이터 추적이 매우매우매우매우 필수적이다!!!!]

// 데이터!! 추적!!
// data-name 와 dataset.name 을 활용한 추적!!
// 그리고 그것의 활용!!!

// event.target 의 활용!
// event.target이 어디에서 쓰였는지 그게 정확히 무엇인지 잘 아는 것이 필요!!

