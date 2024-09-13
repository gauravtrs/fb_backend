const express =require('express');
const {  register, activateAccount, login , sendVerification} = require('../controller/userController');
const {authUser}= require('../middlwares/userAuth');
const router =express.Router();


//user registration
router.post('/register' , register);

//user activate account
router.post('/activate' , authUser,activateAccount);

//user login
router.post('/login' , login);

//sendVerification mail again..

router.post('/sendverification' ,authUser ,sendVerification)










module.exports=router;