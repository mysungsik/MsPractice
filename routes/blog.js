const express = require('express');

const blogController = require("../controllers/post-controllers")
const guard = require("../middleware/guardroute-middleware")

const router = express.Router();

router.get('/', blogController.getHome);

router.use(guard)

router.get('/admin', blogController.getAdmin );

router.post('/posts', blogController.createPost);

router.get('/posts/:id/edit', blogController.getEditPost);

router.post('/posts/:id/edit', blogController.editPost);

router.post('/posts/:id/delete', blogController.deletePost );


module.exports = router;
