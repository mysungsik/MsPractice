// 필요한 모든 라우트들에게, 인증을 검사하는 미들웨어
//  [부여는 login의 session],   [배포는 auth-middleware]  [검사는 gaurd-middleware]의 형식

function guardRoute(req,res,next){

    if(!res.locals.isAuth){
        return res.redirect("/401")
    }
    next();
}

module.exports = guardRoute