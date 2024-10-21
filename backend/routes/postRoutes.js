const express =require('express');
const { createPost, getAllPost, comment, savePost, deletePost } = require('../controller/postController');
const { authUser } = require('../middlwares/userAuth');



const routerPost =express.Router();


//create post
routerPost.post('/createpost' ,authUser, createPost);
//get all post 
routerPost.get('/getallpost', authUser, getAllPost);
//comments
routerPost.put('/comment' , authUser ,comment)
///save post 
routerPost.put('/savepost/:id' , authUser , savePost);
//delete post..
routerPost.delete('/deletepost/:id' , authUser ,deletePost);






module.exports =routerPost;