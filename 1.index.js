const numberPadParent = document.getElementById("number-pad-parent")   // 버튼 총집합
let calculationSectionDisplay = document.querySelector("#calculation-section-display") // 디스플레이

let firstNum = "";  // 오퍼레이터 사용전 저장될 수
let SecondNum = ""; // 오퍼레이터 사용후 저장될 수
let operatorSymbol = "";    // 오퍼레이터 누르면 심볼이 저장될 값
let previousKey ="";    // 직전에 무얼 눌렀는지 알수있게 해주는 값

//클리어함수
function clear(){
    firstNum = "";
    SecondNum = "";
    operatorSymbol = "";
    previousKey ="";
    calculationSectionDisplay.value = 0;
}

// 계산함수
function calculation(n1, operator, n2){
    result = 0
    if(operator == "*"){
        result = n1 * n2
    }
    if(operator == "-"){
        result = Number(n1) - Number(n2)
    }
    if(operator == "+"){
        result = Number(n1) + Number(n2)
    }
    if(operator == "/"){
        result = n1 / n2
    }
    if(operator == "%"){
        result = n1 % n2
    }
    return result

}

// 액티브함수
function active(event){ // 안에 들어갈것 = 숫자누르면 숫자표시, 오퍼레이터 누르면, 오퍼레이터 다음 숫자 계산

    let target = event.target;  //  눌려진 버튼의 엘리먼트
    let targetClass = target.classList[0];   // 눌려진 버튼의 클래스
    let targetText = target.textContent;    // 눌려진 버튼의 텍스트

    if(targetClass == "number"){

        if(calculationSectionDisplay.value == 0 && operatorSymbol == ""){   // 초기 0, 심볼 없을때 첫 숫자 시작
            calculationSectionDisplay.value = targetText;
            
            firstNum = calculationSectionDisplay.value;
        }
        else if(calculationSectionDisplay.value != 0  && operatorSymbol == ""){ // 한 글자 입력후에는 계속 추가
            calculationSectionDisplay.value = calculationSectionDisplay.value + targetText

            firstNum = calculationSectionDisplay.value;
        }
        else if(calculationSectionDisplay.value != 0  && operatorSymbol != ""){ // 글자전부 입력후, 오퍼레이터
            if(operatorSymbol == previousKey){  // 오퍼레이터 방금 누르면 [==> 심볼이 이전키와 같다면]
                calculationSectionDisplay.value = targetText;
                // 만약 오퍼레이터를 누른 이후라면
                // 다시 디스플레이에 새로운 숫자가 표시되어야하고
                // 그 두번째 숫자를, 새로운 변수에 할당한다.
                previousKey = calculationSectionDisplay.value
                // 또한 이전키를, 아무거나로 변경하여, 숫자를 더해나가는 다음 로직으로 이동
                SecondNum = calculationSectionDisplay.value
            }   
            else if (operatorSymbol != previousKey){    // 한글자 입력후에는 계속 추가
                // 두번째 숫자또한, 첫번째 숫자처럼, 숫자를 더해가도록 하여, 새 숫자를 String 형태로 저장한다면
                //  최종적으로 enter를 누르기 전까지 SecondNum에 계속 저장될것이다.
                calculationSectionDisplay.value = calculationSectionDisplay.value + targetText
                SecondNum = calculationSectionDisplay.value
            }
        }
    }
    if(targetClass == "operator"){
        operatorSymbol = target.textContent;    // 오퍼레이터 누르면,  오퍼레이터 심볼에 기호 할당[나중에 계산시 사용할것]
        previousKey = operatorSymbol    // 이전키에 오퍼레이터심볼 할당 [==> 직전에 오퍼레이터를 눌렀다는 것을 명시하는 코드]
    }

    if(targetClass == "back-space"){
        if(calculationSectionDisplay.value != 0  && operatorSymbol == ""){
            calculationSectionDisplay.value = Math.floor(calculationSectionDisplay.value/10)
            
            firstNum = calculationSectionDisplay.value  // 백스페이스는 , value 값을 10으로 나눈후, floor로 소수점을 없애고, 다시 firstNum 에 반환
        }
        else if (calculationSectionDisplay.value != 0  && operatorSymbol != ""){
            calculationSectionDisplay.value = Math.floor(calculationSectionDisplay.value/10)
            
            SecondNum = calculationSectionDisplay.value
        }
        // 만약, 로직에의해, SecondNum에 숫자가 저장되어있을경우에는, SecondNum 을 바꾼다.
        // 오퍼레이터심볼이 활성활되어있다면, 그것은 두번째 숫자를 저장중에 있음을 아는것이다.
    }

    if(targetClass == "hug"){
        calculationSectionDisplay.value = "(" + calculationSectionDisplay.value + ")"
    }

    if(targetClass == "clear-pad"){
        clear()
    }

    if(targetClass == "enter"){
        firstNum = calculation(firstNum, operatorSymbol, SecondNum)
        calculationSectionDisplay.value = firstNum
        operatorSymbol =""
    }

}

function changeColor(event){
    
    let numberpad = event.target.textContent;

    if(numberpad ==0){
        numberpad = Number(numberpad) + 16;
    }
    else if(numberpad <=3){
        numberpad = Number(numberpad) +Number(3);
    }
    else if(numberpad >=4 && numberpad <=6){
        numberpad = Number(numberpad) +4;
    }
    else if(numberpad >=7 && numberpad <=9){
        numberpad = Number(numberpad) +5;
    }
    else if(numberpad == "()"){
        numberpad =2
    }
    else if(numberpad == "%"){
        numberpad =3
    }
    else if(numberpad == "*"){
        numberpad =7
    }
    else if(numberpad == "-"){
        numberpad =11
    }
    else if(numberpad == "+"){
        numberpad =15
    }
    else if(numberpad == "/"){
        numberpad =18
    }

    for(i=0; i<=19; i++){
        if(i == numberpad){
            numberPadParent.children[i].classList.add("changeColor")
        }
    }
}

function removeColor(event){
    
    let numberpad = event.target.textContent;

    if(numberpad ==0){
        numberpad = Number(numberpad) + 16;
    }
    else if(numberpad <=3){
        numberpad = Number(numberpad) +Number(3);
    }
    else if(numberpad >=4 && numberpad <=6){
        numberpad = Number(numberpad) +4;
    }
    else if(numberpad >=7 && numberpad <=9){
        numberpad = Number(numberpad) +5;
    }
    else if(numberpad == "()"){
        numberpad =2
    }
    else if(numberpad == "%"){
        numberpad =3
    }
    else if(numberpad == "*"){
        numberpad =7
    }
    else if(numberpad == "-"){
        numberpad =11
    }
    else if(numberpad == "+"){
        numberpad =15
    }
    else if(numberpad == "/"){
        numberpad =18
    }

    for(i=0; i<=19; i++){
        if(i == numberpad){
            numberPadParent.children[i].classList.remove("changeColor")
        }
    }
}

numberPadParent.addEventListener("click",active)    // 연결은 OL로 했지만, 사실 클릭되는건 LI
numberPadParent.addEventListener("mousedown",changeColor)
numberPadParent.addEventListener("mouseup",removeColor)


// 최종:
/* 

1. 버튼을 누르면, [클래스 선택자 .classList[0] 에 의해 1차 분류된다. 숫자, 오퍼레이터, 백스페이스, 클리어]

2. 숫자의 경우 [문자열로 생각] 추가적으로 눌리는 숫자를 [문자열로 정리],
    정리된 최종 숫자는 [FirstNum] 이라는 [변수에 저장]
    * 최종 숫자의 판단 기준은 [오퍼레이터] 사용 유무

3. [오퍼레이터 사용 유무의 판단]은
    [클래스 선택자에 의해 분류된] 오퍼레이터를 눌렀을때, [눌려진 텍스트의 문자를 operatorSymbol]에 값을 저장하고,
    [초기 ""으로 잡아둔 operatorSymbol이 ""가 아니게 되면 누른것이다.]
    
4. [오퍼레이터를 누른 이후]
    새로운 숫자가 정의되어야한다. [그렇다면 display.value 값도 != 0, 오퍼레이터도 !=0 라는 조건을 넣어서 새 값을 저장한다.]
    [이미 첫 숫자는 firstNum] 에 저장되어있다. 그러므로 value 값이 바뀌어도 상관없다.

    if(value !=0 && symnbol !=0 )일땐
        display.value =  textContent
        
        secondNum = display.value

5. [문제는] 새로운 값 또한, 문자열처럼 쭉쭉 눌려야되는데 기준이없다.
    [새 기준을 잡아준다.],  [symbol은 이후 계산시 사용해야하므로, 새 변수를 생성해 심볼을 그 안에 넣고, 첫 숫자를 누름과 동시에 새 변수안의 값을 바꾸자.]
    [그렇게 하려면, 오페레이터를 눌렀을 경우, 오퍼레이터심볼안에 textContent를 넣을 뿐 아니라, 새 변수를 만들어 오퍼레이터 심볼을 넣자.]

        if(targetClass == "operator"){
            operatorSymbol = target.textContent;
            previousKey = operatorSymbol 
        }

    이렇게 하면, 오퍼레이터 이후, 첫 숫자는 한단위로 눌리지만, 그 이후 숫자는 조건을 변경할 수 있다.

        if(value !=0 && symnbol !=0 )
            if(previousKey == operatorSymbol){
                display.value =  textContent
                secondNum = display.value
            }
            else if (previousKey != operatorSymbol){
                display.value = display.value + textContent
                secondNum = display.value
            }



** 이것은 전부, 
        HTML의 클래스를 받아오는 값 .classList[0] 의 활용
        숫자를 문자처럼 취급후, 저장할때는 숫자를 사용한것의 활용
        함수와, if문의 활용 덕분이다.

*/


