// Practice what you learned!

// 1) Select the two <button> elements and store them in two different variables.
//    - Select the first button without adding or using any "id"
//    - Select the second button by using an "id"

console.dir(document)
const fisrt_button = document.body.children[2].children[4]
//or querySelector("button")
const second_button = document.getElementById("Btn2")

console.dir(fisrt_button)
console.log(second_button)

// 2) Add "click" event listener to both buttons (with two different functions).
//    The functions should "console.dir()" the clicked buttons.
//    - Output the first button by using the variable in which it's stored
//    - Output the second button WITHOUT using the variable in which it's stored

function first_dir(event){
    console.dir(event.target)
}

    // 단순히 그것의 이름을 적고싶으면, .target 까지 적으면 된다.
    // ==>>  dir(fisrt_button)  == dir(event.target)


function second_dir(){
    console.dir(second_button)
}

fisrt_button.addEventListener("click",first_dir)
second_button.addEventListener("click",second_dir)


// 3) Now select and store the paragraphs mentioned in the text you see on the page
//    (first and third paragraph)
//    - Select BOTH paragraphs by drilling into the document and "navigating" to the
//      mentioned elements
//    - If you struggle with DOM drilling, use "ids" instead but watch the solution!

let first_Paragraph =  document.body.children[2].children[3]
const second_Paragraph = document.body.children[2].children[5]
const third_Paragraph = document.body.children[2].children[1]


// 4) Change the functions from (2) such that:
//    - The first button removes the third paragraph (i.e. the <p> prior to it)
//    - The second button changes the background color of the first paragraph to blue

function first_dir(event){
    console.dir(event.target)
    first_Paragraph.remove();
}

function second_dir(event){
    console.dir(event.target)
    // third_Paragraph.style.backgroundColor = "blue"
    third_Paragraph.classList.add("blue-background")
    // OR third_Paragraph.className = "blue-background"
}
        // 당장 background를 추가한다면, 자동완성이 쉽사리 되지 않아 불편함을 겪을 수 있다.
        // ==> 클래스를 미리 CSS에 추가하여두고, JS를 통하여, 클래스를 추가시켜주는 방향으로 진행하면 편하다.

        // backgroundColor : 대문자, 소문자 구별 완벽하게 해야한다.
        // 자동완성이 되지 않는다면, 일단 땅바닥에 그냥 적은 후에, 복사하는 방법도 괜찮겠다.


// 5) Solve (4) both by changing the "inline styles" as well as by adding CSS classes
//    Note: You'll have to add those classes to the styles.css file first!
