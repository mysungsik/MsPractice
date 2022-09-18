async function auth(req, res, next) {
    const user = req.session.user;
    const isAuth = req.session.isAuthenticated;
  
    if (!user || !isAuth) {
      return next();
    }
  
    res.locals.isAuth = isAuth;
  
    next()
}

module.exports = auth




// 사용하는 형태의 함수가 아니다. 지나가는 미들웨일 뿐이다.
//  리턴되는 값도, 리턴해서 쓰는 것도 아니다. 거쳐가면 생성되는것

// 즉, {x : x, y:y} 처럼 내보내지 않고 , 그저 함수 이름으로 내보낸다.

// 또한 그렇게, 이 함수를 내보냈다면,
//  받아 쓰는 쪽에서도, 그저 이 미들웨어 파일을 한번 거쳐가는 것일 뿐이므로

//      const x = require(...) 
//      app.use(x) 
//      이렇게 간단히 끝난다.