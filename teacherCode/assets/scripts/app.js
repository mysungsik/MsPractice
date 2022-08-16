const Attack_Value = 10;
let randomnumbers = []


attackBtn.addEventListener("click",Attack)
let ms = []
let finish = false;



while(!finish){
    let randomnumber = Math.random();
    randomnumbers.push(randomnumber)

    if(randomnumber > 0.6){
        finish = true;
        console.log(randomnumbers)
        
    }
}

console.log(randomnumbers)

