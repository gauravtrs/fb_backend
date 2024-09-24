const express =require('express');
const { uploadImages } = require('../controller/uploads');
const { imageMiddileware } = require('../middlwares/imageMiddileware');


const routerUpload =express.Router()


routerUpload.post('/uploadimage',imageMiddileware ,uploadImages)





module.exports =routerUpload;