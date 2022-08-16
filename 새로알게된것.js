let operator = ""
let numberArray = [];
let numberObject = {};

function what(i){
    if(i =1){
        operator ="+"
    }
    return operator

}

function calculate(n1, operator, n2){
    let result = 0
    if(operator == "+"){
        result = n1 + n2
    }
    numberArray.push(result)
    numberArray.push(operator)
    return result
}

let number1 = calculate(3, what(1), 2)

calculate(2, "+" , 3);
calculate(6, "+" , 4);
console.log(numberArray[0])
console.log(number1)
console.log(numberObject)


function iffunction(){
    if(i=1){
        console.log("hi")
        
    }
}

let MSString = "hi"
let MSStringType =  typeof MSString
console.log( MSStringType)

let msobject = {name: "ms",
height : 130}

console.log(msobject)
msobject.age = 30

console.log(msobject)

let ProgressBar = document.getElementById("health-bar")

console.log(ProgressBar.max)
ProgressBar.max = 100;
ProgressBar.value = 20;

function msms(){
    let ms = "msms"
    let js = "jsjs"
    if(ms = "msms"){
        js = "msmsms"
    }

    console.log("hi im"+js)
}
msms()

function miniFunction(){
    let number = 3 + 3;
    return number
}

function FUNCTION2(){
    let newNumber = miniFunction()
    let number = 4 + newNumber;
    return number
}

let lastNumber = FUNCTION2()

console.log(lastNumber)
