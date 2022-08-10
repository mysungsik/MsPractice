const inputOperator = document.getElementById("input-operator")
let inputNumberDisplay = document.getElementById("input-number")
let calculatorAnswer = document.getElementById("calculator-answer")
let calculatorAnswerText = document.getElementById("calculator-answer-text")
let currentNumber = 0;

function calculate(){
    if(operator == "+"){
        currentNumber += +inputNumberDisplay.value;
        calculatorAnswer.textContent = currentNumber
        calculatorAnswerText.textContent = `${currentNumber} + ${inputNumberDisplay.value}`
    }
    else if(operator == "-"){
        currentNumber -= +inputNumberDisplay.value;
        calculatorAnswer.textContent = currentNumber
        calculatorAnswerText.textContent = `${currentNumber} - ${inputNumberDisplay.value}`
    }
    else if(operator == "*"){
        currentNumber *= +inputNumberDisplay.value;
        calculatorAnswer.textContent = currentNumber
        calculatorAnswerText.textContent = `${currentNumber} * ${inputNumberDisplay.value}`
    }
    else if(operator == "/"){
        currentNumber /= Number(inputNumberDisplay.value);
        calculatorAnswer.textContent = currentNumber
        calculatorAnswerText.textContent = `${currentNumber} / ${inputNumberDisplay.value}`
    }
    console.log(calculatorAnswerText.textContent)
}

function what(event){
    operator = event.target.textContent;
    calculate()
}

inputOperator.addEventListener("click",what)

//

function add(n1,n2){
    let result = n1 + n2
    return result
}

let result = add(1,2)
console.log(result)

