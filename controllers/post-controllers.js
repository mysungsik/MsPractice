const Post = require("../models/post")
const validation = require("../util/validation-session")



function getHome(req, res) {
    res.render('welcome');
}

async function getAdmin(req, res) {

  const posts = await Post.findAll()

  const sessionInputData = validation.getSessionErrorData(req, {
    hasError: false,
    title: '',
    content: '',
    })

  res.render('admin', {
    posts: posts,
    inputData: sessionInputData
  });
}


async function createPost(req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;
  
    if ( validation.validation(enteredTitle,enteredContent)
    ) { validation.flashSession(req,{
        hasError: true,
        message: 'Invalid input - please check your data.',
        title: enteredTitle,
        content: enteredContent     
    }, function(){
        res.redirect('/admin'); // 원래 req.session.save( function(){ ... } ) 사용방법 까먹지말것.
    })
      return;
    }
  
    const post = new Post(enteredTitle,enteredContent)
    await post.save()
  
    res.redirect('/admin');
  }


async function getEditPost(req, res) {

  const post = new Post(null,null,req.params.id)
  // constructor에만 값을 채운 상태!
  
  await post.findOne()
  // 이 함수는 [값을 반환하는게 아니라, constructor에 값을 채우는 함수인것이다.]

  if (!post) {
    return res.render('404'); // 404.ejs is missing at this point - it will be added later!
  }

  const sessionInputData = validation.getSessionErrorData(req, {
    hasError: false,
    title: post.title,
    content: post.content,
    })

  res.render('single-post', {
    post: post,
    inputData: sessionInputData
  });
}

async function editPost(req, res) {
    const enteredTitle = req.body.title;
    const enteredContent = req.body.content;
  
    if (
        validation.validation(enteredTitle,enteredContent)
    ) {
        validation.flashSession(req,{
            hasError: true,
            message: 'Invalid input - please check your data.',
            title: enteredTitle,
            content: enteredContent     
        }, function(){
            res.redirect(`/posts/${req.params.id}/edit`);
        })
      return; 
    }
  
    const post = new Post(enteredTitle,enteredContent,req.params.id)
    await post.save()
  
    res.redirect('/admin');
}

async function deletePost(req, res) {

    const post = new Post(null,null, req.params.id)
    await post.delete()
  
    res.redirect('/admin');
}

module.exports = {
    getHome : getHome,
    getAdmin:getAdmin,
    createPost:createPost,
    getEditPost:getEditPost,
    editPost:editPost,
    deletePost:deletePost,
    
}
