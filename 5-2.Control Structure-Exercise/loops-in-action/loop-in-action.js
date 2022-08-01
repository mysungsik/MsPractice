//[1] First Example: Sum number
// : for 반복문을 이용해서, 모두 더하는 계산식을 만들자.

let calculateButtom = document.querySelector("#calculator button");


function calculateNumber(){
    const userNumberInputElement = document.getElementById("user-number");
    const enteredNumber = userNumberInputElement.value;

    let sumUptoNumber = 0;
    for (let i = 0; i <=enteredNumber; i++){
        sumUptoNumber = sumUptoNumber + i;      // 1-0.mathmatical 으로 돌아가, 변수에 1을 더해, 새 변수에 저장하는 것을 까먹으면 안된다.
    }
    // i = 0 ==> sumUptoNumber = 0 + 0, 이후 i에 +1
    // i = 1 ==> sumUptoNumber = 0 + 1, 이후 i에 +1
    // i = 2 ==> sumUptoNumber = 1 + 2, 이후 i에 +1
    // ...
    // i = enteredNumber ==> sumUptoNumber = sumUptoNumber + enteredNumber 끝.

    let calculatedSum = document.getElementById("calculated-sum");

    calculatedSum.style.display="block"
    calculatedSum.textContent = sumUptoNumber;
}

calculateButtom.addEventListener("click",calculateNumber)


//===================================================================================================================================

//[2] Second Example : HighLight Link
//       Goal : 섹션 안에 있는 모든 a 를 선택해서, 각각 하이라이트 만들기 

const highLightLinkButton = document.querySelector("#highlight-links button")

function highLightA(){
    let highLightLinkElement = document.querySelectorAll("#highlight-links a")

    for(const nodeList of highLightLinkElement){
        nodeList.classList.add("highlight")
    }
}

highLightLinkButton.addEventListener("click",highLightA)

// 1. querrySelectorAll은 [Array] 형태로 반환된다.   개별적으로 사용하면, array[0], array[1] 으로 반환되는
// 2. Array 형태는 for-of 를 쓰면 좋다.


//===================================================================================================================================

//[3] Third Example : Display user Data
// Goal: 키와 밸류가 합쳐진 [Object]를 만들어서 각각의 값을, 비어있는 ul에 li 형태로 집어넣기

const dummyUserData = {
    firstname : "myungsik",
    lastname : "Choi",
    age : 29,
    hobby : "Programming"
};

 
const userDataInputButton = document.querySelector("#user-data button");

function showDummyData(){

    const userDataList = document.getElementById("output-user-data"); // html의 ul에 접근
    userDataList.innerHTML = "" // 기존에 있는 data를 깔끔하게 지워버림

    for(const key in dummyUserData){
        const newListItem = document.createElement("li") // li 를 만들었다. 다만 삽입은 되지 않은 상태
        newListItem.textContent = key.toUpperCase() + " : " + dummyUserData[key] // 만든 li에 값을 삽입, key는 object의 key값 / dummyUserDate[key]는 value값
        userDataList.append(newListItem)    // li를 ul에 삽입
    }

}

userDataInputButton.addEventListener("click",showDummyData)

// 1. 어떻게 ul 안에 있는 li에 데이터를 넣을 것인가. [createElement, appned]
// 2. for - in 을 통해, object의 값을 반복하여 넣을 수 있는가
// 3. key와 value를 모두 데이터 값에 적을 수 있는가. [key, variable[key]]
// 4. 누를때마다, 같은 데이터가 쌓이는데, 그 데이터를 제거하고 새 데이터를 보이게 할 수 있는가. [innerHTML]

//===================================================================================================================================


// 개빡세다!!

// [4] Roll the Dice
// : 1-6 사이의 숫자를 선택, 버튼을 누르면 1-6 사이로 랜덤의 숫자가 탄생, 서로 맞을때 까지 계속되며, ul 안의 li에 중간값을 반환

const diceButton = document.querySelector("#statistics button")

function randomNumber(){
    return Math.floor( Math.random() * 6) +1;
        // Math.random() 은 0~1 사이의 모든 소숫점 사이의 값을 랜덤으로 만들어주는 기본기능이다.
        // Math.floor() 는 ()안의 값을 내림 처리하여, 정수값으로 만들어주는 기능이다.
        // 그러므로, *6을 하면 0~5까지의 수가 나오기에, 우리는 +1 을 해주어서 1~6의 랜덤 숫자 생성기를 만든다.
}

function rollTheDice(){
    const userNumber = document.getElementById("user-target-number") // 인풋 넘버
    const enteredNumber = userNumber.value; // 입력값 밸류
    
    const numberUnorderdList = document.getElementById("dice-rolls") // ul 태그
    numberUnorderdList.innerHTML = "";  // ul 태그 안에 있는 값 지우기

    let hasRolledNumber = false;    // 변수 안의 값이 true 로 바뀌었다, false로 바뀌었다 할것이므로  let 으로 선언해야한다.
    let numberofRolls= 0;   // 얼마나 굴렸는지 span 에 넣기 위한 값

    while(!hasRolledNumber){        //while ==> 조건이 참이면 다시! 다시!
        const randomNumbers = randomNumber(); // while을 누를때 마다 새로운 값이 다시 생성되므로 const 가능
        
        numberofRolls = numberofRolls +1 
        // numberofRolls++

        let numberList = document.createElement("li") // 리스트 생성
        numberList.textContent = "roll  " + numberofRolls + ": " + randomNumbers // 리스트 안의 값 입력
        numberUnorderdList.append(numberList) // ul안에 li 넣기

        if (randomNumbers == enteredNumber){    // enteredNumber는 input에 입력한 number값에 value를 단 것으로, [String]이다!!! === 를 쓰면 타입이 다를경우, 안맞으므로 == 를 사용한다.
            hasRolledNumber = true;                       // 문자열값에 +를 입력하면 숫자로 변환가능하지만, 굳이 그럴필요는...  ex) +userNumber.value
         
            //  [ if문 자체를 제거 ]하고 [ while 두번째 줄 ]에
            // hasRolledNumber = randomNumbers == enteredNumber; 라고 사용해도 가능하다. *******************************
            // while 안에서 값을 비교한 것 자체를 변수에 boolean 값으로 만들어서 검증하는 것이다.
        
        }
    }

    let totalRolls = document.getElementById("output-total-rolls")  // 얼마나 굴렸는지 span
    let whatNumber = document.getElementById("output-target-number")    // 뭐뭐굴렸는지 span

    whatNumber.textContent = enteredNumber;
    totalRolls.textContent = numberofRolls;

}

diceButton.addEventListener("click",rollTheDice)