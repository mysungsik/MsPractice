const { render } = require("ejs")
const express = require("express")
const router = express.Router()
// 데이터베이스사용
const db = require("../data/database")

router.get("/",function(req,res){
    res.redirect("/posts")
})



// ALL POST 페이지에, [집어넣은 데이터베이스의 값을 꺼내, <li> 만들기]
// INNER JOIN을 활용한, 연관된 데이터베이스 값 가져오기 + 선택해서 가져오기
router.get("/posts", async function(req,res){
    const query = `SELECT post.*, authors.name AS author_name FROM post 
    INNER JOIN authors ON (authors.id = post.author_id)
    `
    const [posts] = await db.query(query)       // 단순히 가독성을 늘리기 위한 `` 임

    res.render("posts-list", {posts : posts})
})



// post는 [준 데이터를 받아올때 쓰는거다. [action으로 인해 이동하는 곳이 X면 post.("/X") 안에서 처리하는 것이다. ]]

// author_id 는 어찌하여 스스로 채워지는가?
//  : [데이터베이스에 연결된 값으로], [드롭다운메뉴를 채웠기 때문 (option value = <%= author.id %>)] 드롭다운 메뉴로 author.id를 선택한 꼴이니까.]

// [자리선택자 ?]
//   : 자리선택자 ? 는 [query의 두번째 파라미터에 ?를 대신할 값을 넣음으로써 완성된다.]

router.post("/posts", async function(req,res){
    const data = [req.body.title,
    req.body.summary,
    req.body.content,
    req.body.author]

    await db.query("INSERT INTO post (title,summary,body,author_id) VALUES (?)",[data])
    res.redirect("/posts")
})

// 데이터베이스에서 [ 동작 라우트 URL ID 와 동일한 ID의 항목만 빼오기 ]

// [ AS의 활용 ]
//  [ authors.name AS author_name ] 이라고 하면 단순히 불러올때 [name 이 author_name 으로 변하는것이다.]

// [특정 id에 맞는 값을 불러왔음을 가정하면 [분명히 값은 하나지만, 컴퓨터는 하나임을 정확히 알지 못한다. (검사 후에 아니까)]    ]
//      [그러므로 render로 데이터를 내보낼때, 배열의 첫번째 항목이란 뜻으로 [0]를 반드시 적어 내보내도록 한다.]

router.get("/posts/:id", async function(req,res){
    const pageId = req.params.id
    const query = `
    SELECT post.*, authors.name AS author_name, authors.email AS author_email FROM post
    INNER JOIN authors ON (post.author_id = authors.id)
    WHERE post.id = ?
    `
    const [datas] = await db.query(query, [pageId])

    const dataData = {
        ...datas[0],
        date : datas[0].date.toISOString(),
        humanReadalbeDate : datas[0].date.toLocaleDateString("ko-KR",{
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        })
    }
    // datas[0] = 객체이므로, dataData 객체로 받는다
    // js toLocaleDateString [구글검색 - 사용법나옴]

    if(!datas || datas.length ===0){
        return res.status(404).render("404")
    }
    res.render("post-detail", {data : dataData})
})



router.get("/posts/:id/edit", async function(req,res){

    const pageId = req.params.id
    const [data] = await db.query("SELECT * FROM post WHERE id = ?",[pageId])
    if(!data || data.length ===0){
        return res.status(404).render("404")
    }
    res.render("update-post",{data: data[0]})
})


// [이미 쓴 블로그포스트, 수정하기]
// [수정하는 SQL 코드] : UPDATE [데이터테이블] SET [테이블값 = 변경값]

router.post("/posts/:id/edit", async function(req,res){

    await db.query("UPDATE post SET title = ?, summary =? , body = ? WHERE id =? "
    ,[req.body.title,
    req.body.summary,
    req.body.content,
    req.params.id])
        // [ejs의 값을 받는] req.body.content 에서 [content 는 ejs의 name 임을 명심]
    res.redirect("/posts")
})



// 비동기식 query를 처리하기위한, async, await, promise

router.get("/new-post", async function(req,res){
    const [authors] = await db.query("SELECT * FROM blog.authors")
    res.render("create-post", {authors:authors}); // {ejs키 : 데이터}
})



module.exports = router;