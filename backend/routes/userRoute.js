const express =require('express');
const {  register, activateAccount, login } = require('../controller/userController');
const router =express.Router();


//user registration
router.post('/register' , register);

//user activate account
router.post('/activate' , activateAccount);

//user login
router.post('/login' , login);









module.exports=router;