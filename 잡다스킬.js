//[1] 여러개의 버튼을 querySelectorAll 로 지정하고, [for of 을 이용해 ][한번에 이벤트 리스너 달기]

let editButtons = document.querySelectorAll(".edit-Button")

for(let editButtonss of editButtons){
    function popUpEditWindow(){
        editWindow.classList.add("overlay-up")
    }
    editButtonss.addEventListener("click",popUpEditWindow)
}


