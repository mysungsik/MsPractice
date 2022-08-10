let operator = ""

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
        return String(result)
    }
}

let number1 = calculate(3, what(1), 2)

console.log(number1);

function iffunction(){
    if(i=1){
        console.log("hi")
        
    }
}
