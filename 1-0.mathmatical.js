// mathmatical logic

console.log(10 + 4); // 더하기
console.log(10 / 4); // 나누기
console.log(10 * 4); // 곱하기
console.log(10 - 4); // 빼기
console.log(15 % 4); // 나머지 (modulus) 연산자
console.log(15*2+(4*2)-(5-3-15));

// integer -  자연수
// float  - 정수(소수) 


// 값을 변수에 집어넣기

let result = 15*2+(4*2)-(5-3-15);

// 변수에 넣은 값을 변경시키기

result = result + 1
console.log(result);

// 변수에 넣은 값을 [간단하게] 변경시키기 ***

result++;
console.log(result);

result--;
console.log(result);

result += 5;  // result = result + 5
console.log(result);

result -= 5;  // result = result - 5
console.log(result);

result /= 5;  // result = result/5
console.log(result);


// [텍스트] 연산하기 

console.log( "max" + "myunsik");  // 문자열 더하기


// [자바스크립트에 기본 METHOD를 사용하여 ] [문자열 다뤄보기]

let userName = "Max"

console.log(userName.length)  // 문자열 길이 계산 (Property 이므로 () 안붙임 - 파란색)
console.log(userName.toUpperCase())  //문자열 대문자로 (Method 이므로 ()붙임 - 노란색 )

let hobbies = ["soccer", "baseball", "basketball"];
console.log(hobbies.length);  // Array이의 개수 계산