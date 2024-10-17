const express =require('express');
const { uploadImages, listImages } = require('../controller/uploads');
const { imageMiddileware } = require('../middlwares/imageMiddileware');
const { authUser } = require('../middlwares/userAuth');


const routerUpload =express.Router()


routerUpload.post('/uploadimage', authUser,imageMiddileware ,uploadImages)

//list images
routerUpload.post('/listimage' ,authUser,listImages);





module.exports =routerUpload;