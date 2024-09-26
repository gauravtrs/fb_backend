const express =require('express');
const { uploadImages } = require('../controller/uploads');
const { imageMiddileware } = require('../middlwares/imageMiddileware');
const { authUser } = require('../middlwares/userAuth');


const routerUpload =express.Router()


routerUpload.post('/uploadimage', authUser,imageMiddileware ,uploadImages)





module.exports =routerUpload;