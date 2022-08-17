const startBtn = document.getElementById("game-start")
const 바위 = "바위"
const 가위 = "가위"
const 보 = "보"
const 플레이어승 = "플레이어 승리"
const 비김 = "비김"
const 컴퓨터승 = "컴퓨터 승리"



startBtn.addEventListener("click",validate)

//함수를 표현식으로 사용하기 + 컴퓨터선택
const computerChoice = function(){
    const randomValue = Math.random()
    if(randomValue <0.33){
        return 바위
    }
    else if(randomValue>=0.33 && randomValue <0.67){
        return 가위
    }
    else{
        return 보
    }
}

// 승자결정
const getWinner = function(pChoice, CChoice){
    if(pChoice === CChoice){
        return 비김
    }
    else if(pChoice === 바위 && CChoice === 가위 
        || pChoice === 보 && CChoice === 바위
        || pChoice === 가위 && CChoice === 보 ){
        return 플레이어승
    }
    else if(CChoice === 바위 && pChoice === 가위 
        || CChoice === 보 && pChoice === 바위
        || CChoice === 가위 && pChoice === 보 ){
        return 컴퓨터승
    }
}

getWinner(validate,computerChoice())

// 함수를 선언하여 사용하기 + 플레이어선택
function validate(){
    console.log("game is started")

    let playerChoice = prompt("가위, 바위, 보 중 선택하시오","선택")
    let ComputerChoice = computerChoice()
    console.log(ComputerChoice)
    
    if(playerChoice != `${바위}` && playerChoice !=`${가위}` && playerChoice !=`${보}`){
        alert("제대로 된 선택을 부탁드립니다. 당신의 선택은 바위로 변합니다")
        playerChoice = 바위
    }
    else{
        alert(`당신의 선택은 ${playerChoice} 입니다.`)
    }
    let winner = getWinner(playerChoice,ComputerChoice)

    let mesaage;
    mesaage  = `당신은 ${playerChoice}를 선택했습니다, 컴퓨터는 ${ComputerChoice}를 선택했습니다.`

    if(winner === 비김){
        alert(mesaage + winner)
    }
    else if(winner === 플레이어승){
        alert(mesaage + winner)
    }
    else if(winner === 컴퓨터승){
        alert(mesaage + winner)
    }
}

// 섞어쓰니 오히려 복잡해지는 기분이다.
// 차라리 전부 하나로 통일하면 간편해지겠다. 이번에는 공부를 위해 섞어서 써보았다.
