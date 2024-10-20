const express =require('express');
const { authUser } = require('../middlwares/userAuth');
const { reactPost, getReact } = require('../controller/reactController');



const routerReact =express.Router();


//create reacts
routerReact.put('/reactpost' ,authUser ,reactPost);

//get reacts by active user's id
routerReact.get('/getreact/:id' ,authUser ,getReact);












module.exports =routerReact;