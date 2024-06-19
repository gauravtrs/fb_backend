const express =require('express');
const { home } = require('../controller/userController');
const router =express.Router();

router.get('/user' , home)

module.exports=router;