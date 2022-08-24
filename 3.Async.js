const fs = require("fs")

function readFile(){
    const data = fs.readFileSync("3.AsyncData.txt")
    console.log(data.toString()) 
}
readFile();

// 문자열을 string 으로 변환 => toString
//  [데이터 파일이 아님을 알것.]

