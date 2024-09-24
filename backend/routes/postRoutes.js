const express =require('express');
const { createPost } = require('../controller/postController');


const routerPost =express.Router();


//create post
routerPost.post('/createpost' , createPost);






module.exports =routerPost;