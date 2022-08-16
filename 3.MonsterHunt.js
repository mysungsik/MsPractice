// [버튼 눌렀을때, 데이터 뽑는 방법]
// 1. UL에 버튼 연결 후, event.target.dataset.date이름 으로 뽑기
// 2. 각각 버튼의 id를 만들어 연결하기
// 3. UL에 버튼 연결 후, event.target.textContent 값을 뽑아내, 뽑기

const monsterHealth = document.getElementById("monster-health-bar")
const playerHealth = document.getElementById("palyer-health-bar")
const playerMoveList = document.getElementById("player-move-lists")
let Winner = document.getElementById("winner")
const winnerDiv = document.querySelector(".winner-div")
const drawDiv = document.getElementById("draw-div")

const damage = monsterHealth.offsetWidth*0.1
const Strongdamage = monsterHealth.offsetWidth*0.3


const initialHealthBar = playerHealth.offsetWidth
const initialHealthBarPlayer = playerHealth.offsetWidth
const healing = playerHealth.offsetWidth*0.2
const monsterDamage = playerHealth.offsetWidth*0.2
let number = 3


function attack(){
    let bar = monsterHealth.offsetWidth
    monsterHealth.style.width = `${bar - damage}px`
    console.log(monsterHealth.offsetWidth)
    bar = [monsterHealth.offsetWidth, damage]
 
    return bar
}

function strongAttack(){
    let percentage = Math.random()
    let bar = monsterHealth.offsetWidth

    if(bar < Strongdamage){
        if(percentage <= 0.3){
            monsterHealth.style.width = "0px"
            bar = monsterHealth.offsetWidth
        }
    }
    else{
        if(percentage <= 0.3){
            monsterHealth.style.width = `${bar - Strongdamage}px`
            bar = monsterHealth.offsetWidth
        }
    }
  
}
function heal(){
    let playerHealthbar = playerHealth.offsetWidth
    
    if(playerHealthbar > initialHealthBar*0.8){
        playerHealth.style.width = `${initialHealthBar}px`
    }
    else{
        playerHealth.style.width = `${playerHealthbar + healing}px`
    }
    let attackLog = 
    {playerAttack : 0,
    playerHealth : 0,
    monsterAttack : 0,
    monsterHealth : 0,
    }   
}


function active(event){
    let act = event.target.textContent;
    let attackLog =    
        {playerAttack : 0,
        playerHealth : 0,
        monsterAttack : 0,
        monsterHealth : 0
        }   

    let percentage = Math.random()

    if(act == "Attack"){
       let monsterhealth = attack()
       attackLog.monsterHealth = monsterhealth[0];
       attackLog.playerAttack = monsterhealth[1];
       console.log(attackLog)
    }
    else if(act == "StrongAttack"){
        strongAttack()
    }
    else if(act == "Heal"){
        heal()
        
    }
    if(act == "ShowLog"){
    }


    if(percentage<=0.7){
        let playerHealthbar = playerHealth.offsetWidth
        playerHealth.style.width = `${playerHealthbar - monsterDamage}px`
        playerHealthbar = playerHealth.style.width
    }
    else{
        console.log("miss")
    }

    if(playerHealth.offsetWidth == 0 && monsterHealth.offsetWidth !=0 ){
        winnerDiv.classList.add("show")
        Winner.textContent = "monster"
    }
    else if(playerHealth.offsetWidth != 0 && monsterHealth.offsetWidth ==0){
        winnerDiv.classList.add("show")
        Winner.textContent = "player"
    }
    else if(playerHealth.offsetWidth == 0 && monsterHealth.offsetWidth ==0){
        winnerDiv.classList.add("show")
        drawDiv.innerHTML = "Draw"
    }
    
}

playerMoveList.addEventListener("click",active)

// 이게 되는 이유는 function 안에서 작동하여,
//   monsterHealth.style.width가 변하여 저장되기 때문이다.

// 받아올 값 = attake = 준데미지 , bar = 몬스터 체력
//              strong attakc = 준데미지, bar 몬스터 체력
//  
//          
// 어떤식으로 값을 받아오고, 어떤식으로 표현하는가