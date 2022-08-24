//[1. new 란 무엇인가,  Date 는 왜 저렇게 쓰이는가]

const { title } = require("process")

const job = {
    tilte: "writer",
    location : "incheon",
    salary : 5000
} 

console.log(new Date().toISOString())


// [2.생성자함수 생성]
class Job {
    constructor(Jobtilte,place,salary){
        this.tilte = Jobtilte,
        this.location = place,
        this.salary = salary
    }
    describe(){
        console.log(`my job is ${this.tilte}, job loaction is ${this.location}, i earn ${this.salary}`)
    }
}

const cook = new Job("cook","incheon",5000)
console.log(cook)
cook.describe()

// 1. 이름은 첫글자 대문자로
// 2. constructor(){} 를 통해 자신만의 [메서드]를 만듬 ==> [어차피 함수랑 같음 함수임 그냥]
//      [인스터스를 생성]
// 3. 사용은 new Job()

// 4. this : 생성될 객체를 참조한다.

// ==>> new Job() 으로 실행하면 , 안에는 constructor 메서드 가 실행되는 것이다.


// [3. 배열 비구조화]

const hobbies = ["soccer", "baseball","football"]
const [man, maan, maaan] = hobbies
console.log(man)
console.log(maan)
console.log(maaan)

// 배열을 쪼개서, 각각의 변수에 각 값을 넣음

// [4. 객체 비구조화]

const hobbiess = {a : "soccer", b: "baseball", c: "football"}
const {a} = hobbiess

console.log(a)
// [객체 비구조화는, 변수 이름이, 객체의 속성중 키 값을 그대로 따라오게 되어있는데]
//      [만약 변수이름을 수동으로 바꾸고 싶다면]

const {b :myjob, c:mysecond}  = hobbiess
console.log(myjob)
console.log(mysecond)
// hobbiess 중, [b에 해당하는 값을 꺼내],[myjob이라는 변수에 저장하겠다] 라는 뜻이된다. 
