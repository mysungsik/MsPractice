// 비동기식 작동

const fs = require("fs/promises")

function readFiles(){
    let fileData;
    fs.readFile("3.AsyncData.txt", function(error,fileData){
        console.log(fileData.toString())
    })
}

// 비동기식 작동 - 콜백함수지옥 탈출하기 [ pormise, .then(funtion)]

function readFilesToPromise(){

    fs.readFile("3.AsyncData.txt").then(function(fileData){
        console.log(fileData.toString())
        console.log("file sync done!")
    }).catch(function(error){
        console.log(error)
    })
       
    
    console.log("hi there!")
}

// .then을 무한히 연결하여 [콜백함수의 지옥에서 탈출하여, 깔끔한 코드를 만들 수 있다.]

readFilesToPromise()

// 프로미스 안에서 사용할 await

async function readFileAsync(){
    try{
        const readFileData = await fs.readFile("3.AsyncData.txt")
        console.log(readFileData.toString())
    }catch{
        console.log("we got error!")
    }
}

readFileAsync();