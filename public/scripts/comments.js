const loadBtn = document.getElementById("load-comments")
const commentsSection = document.getElementById("comments");
const commentsDataForm = document.getElementById("comments-data-form")
const commentsText = document.getElementById("text")
const commentsTitle = document.getElementById("title")



// 다시 복습하는 [자바스크립트로 HTML 태그 만들어 집어넣기] 함수 만들기
function createListFunction(comments){
    const commentsList = document.createElement("ol")       // ol 만들고

    for(const comment of comments){
        const commentsListItem = document.createElement("li")   // li 만들어서 [파라미터 comments 로 가져올 데이터로 li 채워넣고]
        commentsListItem.innerHTML =`
        <article class="comment-item">
            <h2> ${comment.title} </h2>
            <p> ${comment.text} </p>
        </article>
        `
        commentsList.append(commentsListItem)               // 만들어진 li 는 ol에 차곡차곡 append
    }
    return commentsList                                     // 전부 집어넣은 ol 을 return
}

// 집어넣은 리스트 안에, [데이터베이스에서 받아온 값들을 집어넣기]
async function loadComments(){
    const postId = loadBtn.dataset.postid;
    const response =  await fetch(`/posts/${postId}/comments`)  // [서버에서 데이터 요청과 받는 것을 동시에]
    const responseData = await response.json()

    const commentsLists = createListFunction(responseData)        // ol 안에 서버에서 받은 data로 만든 li가 잔뜩 담긴, OL 완성
    commentsSection.innerHTML =""                               // 부모요소 한번 초기화하고
    commentsSection.append(commentsLists)                        // 만든거 집어넣기


    console.log(responseData)
}


// Ajax를 사용해 [데이터 보내기] 

//  1. Ajax의 POST 요청 방법 (fetch는 기본적으로 get임을 기억)
//  2. [자바스크립트와 서버 사이에 [요청이 아닌] [데이터의 이동방식]은 [항상 JSON 파일로 이루어져야 한다] ]
//  3. [HTML에서 Form을 통해, [서버로 정보를 보낼때에는] [모든 정보가 자동으로 서버로 이동했지만]]
//          [javascript의 ajax를 사용하여 보낼때에는, [수동으로 보낼 데이터들을 지정해야한다.] ]
//  4. [서버에서 json 데이터를 자동으로 javascript 코드로 분석해주는 [미들웨어]를 추가해야한다.] - app.use(express.json())
//          * 기존에는 form 의 데이터를 자동으로  javascript 코드로 분석해주는 [미들웨어인] - app.use(express.urlencoded()) 를 사용하였다.
//  5. [미들웨어의 활성화조건 확인]
//          : 미들웨어는 [들어오는 meta-data의 형태에 따라 urlencoded면 urlencoded() 미들웨어가, ]
//                  [meta-data가 json형태이면 json() 미들웨어가 활성화되는것이다.]
//            [기존에 form 으로 작업할때에는 [브라우저가 알아서 metadate 를 만들어 보냈지만]]
//            [지금은 수동으로 데이터를 보내고 있기 때문에, mata-data를 적어서 보내야한다.]
//             [그러므로 서버에 데이터를 보낼때, [헤더에 메타데이터를 추가해서 보내야한다.]]


function sendCommentsData(event){
    event.preventDefault()

    const pageId = commentsDataForm.dataset.postid;
    const commentsTextValue = commentsText.value;
    const commentsTitleValue = commentsTitle.value;

    const commentsData = {
        title : commentsTitleValue,
        text : commentsTextValue
    }

    fetch(`/posts/${pageId}/comments`,{
        method: "POST",
        body : JSON.stringify(commentsData),        // 이러면 전송은 body.text , body.title 로 들어간다. [form 형태는 name을 따라갔겠지만, 여기는 수동으로 보내니] commentsData의 [키와 밸류를 따라간다.]
        headers : {
            "Content-Type" : "application/json"
        }
        
    })
}

commentsDataForm.addEventListener("submit",sendCommentsData)
loadBtn.addEventListener("click",loadComments)