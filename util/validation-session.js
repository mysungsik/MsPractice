
function getSessionErrorData(req, data){
    let sessionInputData = req.session.inputData;

    if (!sessionInputData) {
        sessionInputData = {...data}
    }
    
    req.session.inputData = null;

    return sessionInputData
}

function flashSession(req,data,action){
    req.session.inputData = {
        ...data
      };

    req.session.save(action)
}

function validation(title,content){
    return !title ||
    !content ||
    title.trim() === '' ||
    content.trim() === ''
}


// ...은 객체 안에나 쓸 수 있다. 해당 객체의 속성을 전부 가져와, 키:쌍으로 바꿔주는 것이기 때문에

module.exports = {
    getSessionErrorData : getSessionErrorData,
    flashSession:flashSession,
    validation:validation,

}