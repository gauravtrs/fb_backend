
const mongoose =require('mongoose')

const ObjectId =mongoose.Schema.ObjectId;

const userSchema =new mongoose.Schema({
    first_name:{
        type:String,
        required:[true ,'first name is required'],
        trim:true,
        text:true,

    },

    last_name:{
        type:String,
        required:[true ,'last name is required'],
        trim:true,
        text:true,

    },

    username:{
        type:String,
        required:[true ,'user name is required'],
        trim:true,
        text:true,
        unique:true,

    },

    email:{
        type:String,
        required:[true ,'email id is required'],
        trim:true,
        

    },

    password:{
        type:String,
        required:[true ,'password is required'],
        

    },

    picture:{
        type:String,
        default:'',
        trim:true,

    },

    cover:{
        type:String,  
        trim:true,

    },

    gender:{
        type:String,
        required:[true ,'gender is required'],
        trim:true,
    },

    bYear:{
        type:Number,
        required:true,
        trim:true,

    },

    bMonth:{
        type:Number,
        required:true,
        trim:true,

    },

    bDay:{
        type:Number,
        required:true,
        trim:true,

    },

    verified:{
        type:Boolean,
        default:false,
    },

    friends:{
        type:Array,
        default:[],
    },

    following:{
        type:Array,
        default:[],
    },

    followers:{
        type:Array,
        default:[],
    },

    request:{
        type:Array,
        default:[],
    },

    search:[
        {
        user:{
            type:ObjectId,
            ref:'user',

        },
    },
    ],

    details:{

        bio:{
            type:String,
        },

        
        otherName:{
            type:String,
        },

        
        job:{
            type:String,
        },

        
        workplace:{
            type:String,
        },

        
        highSchool:{
            type:String,
        },

        
        college:{
            type:String,
        },

        
        currentCity:{
            type:String,
        },

        
        hometown:{
            type:String,
        },
    },

        
        relationShip:{
            type:String,
            enum:['single', 'in a relationsip' ,'married' ,'divorced' ],
        },

        instagram:{
            type:String,
        },

        savePost:[
            {

          post:{
                type:ObjectId,
                ref:'post',
            },

            saveAt:{
                type:Date,
                default:new Date(),
            },
        },

        ],
    


},{timestamps:true})


const user =mongoose.model('user' ,userSchema);

module.exports=user;