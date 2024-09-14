const express =require('express');
const {  register, activateAccount, login , sendVerification, findUser, passwordVerificationCode, passwordCodeVerify, changePassword} = require('../controller/userController');
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

//find user..
router.post('/finduser' ,findUser)

//send password code..
router.post('/sendcode' , passwordVerificationCode)

//password code verify..
router.post('/codeverify' , passwordCodeVerify)

//change password ..
router.post('/changepassword' , changePassword)










module.exports=router;