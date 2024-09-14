const mongoose =require('mongoose')

const {ObjectId} =mongoose.Schema ;

const codeSchema= new mongoose.Schema({
    code:{
        type:String,
        required:true,
    },
    user:{
        type:ObjectId,
        ref:'user',
        required:true,
    },



})

const code =mongoose.model('code',codeSchema);
module.exports=code;