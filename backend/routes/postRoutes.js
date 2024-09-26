const express =require('express');
const { createPost } = require('../controller/postController');
const { authUser } = require('../middlwares/userAuth');



const routerPost =express.Router();


//create post
routerPost.post('/createpost' ,authUser, createPost);






module.exports =routerPost;