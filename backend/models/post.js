const mongoose =require('mongoose');

const {ObjectId} =mongoose.Schema;

const postSchema = new mongoose.Schema({
    
    type:{
        type:String,
        enum:['profilepicture','cover',null],
        default:null
    },

    text:{
        type:String,
        
    },

    images:{
        type:Array,
    },

    user:{
        type:ObjectId,
        ref:'user',
        required:true,
    },

    background:{
        type:String,
    },

    comments:[
        {
        comment:{
            type:String,
        },

        image:{
            type:String,
        },

        commentedBy:{
            type:ObjectId,
            ref:'user',

        },

        commentedAt:{
            type:Date,
            default:new Date(),
        },

    },

    ],

},{timestamps:true,})


exports.post =mongoose.model('post' , postSchema);