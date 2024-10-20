const express =require('express');
const { createPost, getAllPost, comment } = require('../controller/postController');
const { authUser } = require('../middlwares/userAuth');



const routerPost =express.Router();


//create post
routerPost.post('/createpost' ,authUser, createPost);
//get all post 
routerPost.get('/getallpost', getAllPost);
//comments
routerPost.put('/comment' , authUser ,comment)






module.exports =routerPost;