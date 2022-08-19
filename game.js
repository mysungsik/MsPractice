function reSetGame(){

    gameRound = 1;
    activePlayerSymbol = 0; // 플레이어 턴 알려주는 값
    gameOverDiv.style.display = "none"  //승리 div 없애기
    
    let gameBoardIndex =0;
    gameisovered = false
    for(let i=0; i <3; i++){
        for(let j=0; j <3; j++){
            gameData[i][j] = 0;
            let gameBoardElement = gameFieldElement[0].parentElement.children[gameBoardIndex];
            gameBoardElement.textContent = "";
            gameBoardElement.classList.remove("disabled");
            gameBoardIndex++
        }
    }
}


function gameStart(){
    
    if (player[0].name === "" || player[1].name ===""){
        alert("please Check your Id");
        return;
    }   // 리턴이 되면, 멈춘다를 꼭 기억하자
    activePlayerName.textContent = player[0].name
    reSetGame() // 위치 아주 중요! 이름은 리셋되지 않기에 여기가 딱 맞음! + 게임판 보여야 하니까!
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

}

// [필드 버튼 추적하여 승자 정하는 논리]=======================================

function checkForGameOver(){

    for(i=0; i<3; i++){
        if (gameData[i][0]>0 && gameData[i][0] === gameData[i][1] &&  gameData[i][1]=== gameData[i][2]){
            return gameData[i][0]
        }   
    }

    for(i=0; i<3; i++){

        if (gameData[0][i]>0 && gameData[0][i] === gameData[1][i] &&  gameData[1][i]=== gameData[2][i]){
            return gameData[0][i]
        }
        
    }   

    if (gameData[0][0]>0 && gameData[0][0] === gameData[1][1] &&  gameData[1][1]=== gameData[2][2]){
        return gameData[0][0]
    }

    if (gameData[0][2]>0 && gameData[0][2] === gameData[1][1] &&  gameData[1][1]=== gameData[2][0]){
        return gameData[0][2]
    }
    
    if (gameRound == 9){
        return -1;
    }
    return 0
}

function clicked(event){
    let dataCol = +event.target.dataset.col -1; //HTML의 Li의 data넘버를 dataset으로 가져옴
    let datarow = +event.target.dataset.row -1; //HTML의 Li의 data넘버를 dataset으로 가져옴

    if (gameData[datarow][dataCol] >0 || gameisovered){ // 이미 유저가 눌러 할당되었다면! 이라는 간단한논리!  // + 게임이 끝나면 gameisovered=ture 로 할당하여, 모든 곳에 클릭 금지!
        return;                         //  이미 눌린곳은 1이상이므로, gameData[datarow][dataCol] >0 가 ture ==> return 작동금지!
                                        //
    }                                 
    event.target.classList.add("disabled")
    event.target.textContent = player[activePlayerSymbol].symbol

    gameData[datarow][dataCol] = activePlayerSymbol +1
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