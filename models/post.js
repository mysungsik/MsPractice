// 데이터베이스에 접근하는 insert, find, delete, update 로직을 저장

// 로직의 저장은 [사용자 함수(객체)] 를 사용하여!

// 데이터베이스에 저장하고, 불러오고, 업데이트하고, 삭제하는 것에 필요한 모든 파라미터는
//  id, title, content가 전부 (이 파일에서는)


const db = require("../data/database")
const mongodb = require("mongodb")

const ObjectId = mongodb.ObjectId;

class Post {
    constructor(title,content,id){
        this.title = title;
        this.content = content;
        if(id){
            this.id = new ObjectId(id) 
        }
        
    }
    // [id 는 필요에 따라 있을수도, 없을수도 있다.] [this.title은 후에 Post를 인스턴스한 변수의 사용에 관하여 변수.title 로 사용가능하다]. [나머지도 전부 동일]



    async save(){
        if(this.id){
            await db.getDb().collection("posts").updateOne(
                { _id:this.id},
                { $set: { title: this.title, content: this.content }})

        } else {
            await db.getDb().collection('posts').insertOne({
                title : this.title,
                content : this.content
            })
        }     
    }
    // [저장방법은 updata와 insert인데], [만약, id값이 이미 존재한다면 그것은 update 임을 알고] 짜는 로직



    async delete(){
        await db.getDb().collection('posts').deleteOne({ _id: this.id });
    }
    // 사용시 파라미터에 const post = new Post(null,null,아이디값)



    static async findAll(){
        const posts = await db.getDb().collection('posts').find().toArray();
        
        return posts
    }
    // 파라미터가 없으므로, static 써서, 객체 자체로 사용가능하게

    // 객체 자체로 사용하므로, [constructor의 값이 직접적으로 바뀌므로],
    //  각각 this. 를 사용하여 객체의 값을 뽑을 필요가 없음



    async findOne(){

        if(!this.id){
            return
        }
        const post = await db.getDb().collection('posts').findOne({ _id: this.id });
        this.title = post.title;
        this.content = post.content;

        return post
        // 이 함수는 [값을 반환하는게 아니라, constructor에 값을 채우는 함수인것이다.]
    }

    
    // 사용할 파라미터가 있으니, 다시 인스턴스화
    // 필요한건 post.title, 객체에 담긴 post.title을 쓰려면, 
    // 객체의 constructor 안에 값이 들어가있어야 post.title을 쓰는데, 넣는 방법은 this. 가 반드시 필요하다

    // 현 라우트의 상황에서는 contructor에 id값만 넣어서 찾을 수 밖에 없다.
    // 그러므로, 객체.id는 존재할지라도, 객체.title과, 객체.content 는 존재 할 수 없다.

    // 그래서 함수 안에 넣어, id값으로 찾아 부르는 즉시, constructor에 값을 넣어주는 것이다.

    // 따로 객체안에 값을 넣기 싫다면
    // this.title 등을 지우고, const post = ... 만 남긴 후에
    // 사용할 때에, 변수에 뽑아서 사용하면 된다.



    
    //  ==>> 결론, find는 static으로 객체가 직접 출동 ==> this를 쓰나안쓰나, constructor의 값이 직접 바뀜
    //            findOne은 인스턴스해서 출동 ==> this 를 사용하여,  constructor의 값을 직접 타겟해야 바뀜
}



module.exports = Post;
