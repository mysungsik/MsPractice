// [1] 서버측에서 javaScript 코드 실행하기 [브라우저 x]

const userName = "msms";
console.log(userName);
// [터미널에] node 파일이름.확장자
//           node index.js







// [2] 나만의 웹 서버를 만들어서 응답하기

/*


const http = require("http")

function handleRequest(request, response){
    response.statusCode = 200;
    response.end("<h1> hi im myunsik! </h1>")
}

const server = http.createServer(handleRequest) 
server.listen(3000)

*/



// [3] node.js 로 만든 로컬서버를 열어, 반응 확인하기

// 터미널에서, [node.js로 파일을 열어] [서버를 생성하고], [브라우저에서 localhost:3000] 입력하여 서버 들어가기
// 종료는 터미널에서 [ctrl + C]




// [4] request 를 사용하여 [해당 포트 안에서, 다른 경로의 url을 들어갔을때, 각각 다른 응답 보내기]

//      : [request.url] 을 사용하면 [포트번호 뒤편의 url 주소를 받아올 수 있다]
//          ex) localhost:3000/currenttime      ==>> request.url = "/currenttime"
//              localhost:3000/                 ==>> request.url = "/"

const http = require("http")

function handleRequest(request, response){
    if (request.url === "/currenttime"){
        response.statusCode = 200;
        response.end('<h1>'+ new Date().toISOString() +'</h1>')
    }
    else if (request.url === "/"){
        response.statusCode = 200;
        response.end("<h1> here! </h1>")
    }
    else{
        response.statusCode = 200;
        response.end("<h1> hi im myunsik! </h1>")
    }

}

const server = http.createServer(handleRequest)

server.listen(3000)

// 다른 REQUEST로 다른 URL을 지정해서, 다른 응답을 보냈다.
//   REQUEST는  [포트번호의 다음 문자] 부터 [주소를 받아올 수 있다.]
//  new Date() 객체는 날짜를 받아온다.
//  .toIsoSting 은 문자열로 변환하여준다.