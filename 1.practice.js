// [1] Var와 Let의 차이점
let name = "ms"
let hobbies = "msms"
if(name === "ms"){
    let hobbies = ["sports", "baseball"]
}
console.log(hobbies)

const addListener = document.getElementById("message-input")
const clickBtn = document.getElementById("click-button")
const textInput = document.getElementById("text1")




// [6] 원시값과 참조값의 차이

// : 원시값 : 값이 간단하여 직접저장    [ String, Number, null, Boolean 등의 간단한 값]
// : 참조값 : 값이 복잡하여 주소만 저장 [객체, 배열 등의 거대한 값들]

// 1) 원시값
let ms = "name";
let newMs = ms;
ms = "NotName"

console.log(newMs)
    // 정답은 "name"
    // 이유 : 원시값은 그 값 자체를 저장한것이기때문에, 
    //          newMs 에서 이미 "name"이 저장되었고, 따로 바꾸지 않았으니 유지된다.

// 2) 참조값 : 참조값에 대한 기본적인 원리
let msArray = ["sports", "baseball"]
let newArray = msArray
msArray.push("msmsms")

console.log(newArray);
    // 이미 newObject에 값을 집어넣었지만, 참조되는 다른 값에 추가적인 값을 넣었을 뿐인데
    //     newObject의 값도 변했다.
    // 이유 : 참조값은 [값 자체가 아니라, 값의 주소를 복사해 온 것이기 때문에 그렇다.]


// 3) 참조값2 : 복사가 된 값을 바꾸면 원값은 어떻게 될까?
let msObject = {age : 32}
let newObject = msObject;
newObject.age = 30

console.log(msObject)
    // 이유 : 역시나 [참조값은 값 자체가 아니라 그저 주소를 가져온 것이기 때문에]
    //         복사된 값을 바꾼 것은, 원값의 주소안의 값이 변경되는 것이므로, 원값도 같이 바뀐다.

// 4)} 참조값3 : 주소가 아닌 실제 데이터의 복사
let mshobbies = ["sports"]
let newMsHobbies = [...mshobbies]
mshobbies.push("baseball")

console.log(newMsHobbies)
    // 이유 : 참조값의 주소가 아닌 실제 데이터를 가져왔으므로, 원시값과 같이 동작한다.\
    // [...] 전개연산자는 실제 키와 값을 가져오는 역할을 한다.


// 5) 참조값4 : 참조값 끼리의 비교

let person1 = {age:30}
let person2 = {age:30}
let ms2 = person1 === person2
console.log(ms2)
    // 정답 : false
    // 이유 : 참조값은 [주소로 저장한다.]
    //          이들의 주소가 같냐고 물어보는 상황이 된 것이고, 당연히 주소는 다르다.

// 6) 참조값5 : 참조값에 대한 push

const realNewArray = ["sports", "cooking"]
realNewArray.push("soccer")
    // 정답 : 잘 된다, 오류 X
    // 이유 : 참조값은 [주소로 저장] ==> [그저 데이터만 집어넣었을뿐 const의 의미는 [주소를 변경했냐고 묻는것] 주소 안바뀌었으니 ok]
realNewArray = ["sports"]
    // 정답 : 오류
    // 이유 : const이므로 변하면 안되는데, 그것은 바로 [주소]. 하지만 새 주소를 할당하였기에 [불가능]

