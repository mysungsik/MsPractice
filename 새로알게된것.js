function calculate(n1, operator, n2){
    let result = 0
    if(operator == "+"){
        result = n1 + n2
        return String(result)
    }
    
}

let number1 = calculate(3, "+", 2)

console.log(number1);