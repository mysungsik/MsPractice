const db = require("../data/database")
const bcrypt = require("bcryptjs")


// 데이터베이스에 접근하는 것, 그리고, 데이터베이스에 접근하기 위한 준비작업까지 전부 넣은 model
// 사실 util에 넣어서 해도 되지만, 여기에서는 한번에 다 넣었다.

class Auth {
    constructor(email,password){
        this.email = email,
        this.password = password
    }

    async getUserWithSameEmail(){
        const existingUser = await db.getDb().collection('users').findOne({ email: this.email });

        return existingUser
    }
    // post의 findOne 처럼 constructor에 값을 넣을 수 없는 상황이 아니므로,
    // 따로 contructor에 값을 넣지 않고 사용해도 된다.
    // 필요한건 객체.email, 객체.password 인데, controller에서 파라미터를 넣어 넣을 수 있다.

    async exsistAlready(){

        const existingUser = await this.getUserWithSameEmail()
        if(existingUser){
            return true
        }
        else{
            return false
        }
    }
    // 유저가 존재하냐 안하냐


    async signUp(){
        const hashedPassword = await bcrypt.hash(this.password, 12);
  
        const user = {
          email: this.email,
          password: hashedPassword,
        };
      
        await db.getDb().collection('users').insertOne(user);

    }
    async login(comparedPassword){
        const passwordsAreEqual = await bcrypt.compare(this.password ,comparedPassword
        );

        return passwordsAreEqual
    }
}

module.exports = Auth;