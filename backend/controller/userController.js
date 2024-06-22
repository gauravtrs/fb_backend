const user = require("../models/user");
const bcrypt =require('bcrypt');
const { emailValidation, validationLength } = require("../hellpers/validation");






exports.register=async(req ,res) =>{


  try {
    
    //  get data input from data
    const {  first_name ,
             last_name,
             username ,
             email ,
             password ,
             gender,
             bYear,
             bMonth ,
             bDay } =req.body;

   // Email validation
   if(!emailValidation(email)){
    return res.status(400).json({message:"Please enter valid email address"})
   }

   //check email unique
   const checkEmail=await user.findOne({email});
   if(checkEmail){
    return res.status(400).json({message:"This email address already exists,try with a different email address",})
   }


   //check first_name length
   if(!validationLength(first_name,3,30)){
    return res.status(400).json({message: "first name must between 3 and 30 characters.",
    })
   }


    //check last_name length
   if(!validationLength(last_name ,3 ,30)){
    return res.status(400).json({message: "last name must between 3 and 30 characters.",
    })

   }

   //check password length
   if(!validationLength(password , 6,30)){
    return res.status(400).json({message:'password must be atleast 6 characters'})
   }

   // Password bcrypt or hash
   const hashPassword =await bcrypt.hash(password ,12);

   const createUser = new user({first_name,last_name ,username,email,password:hashPassword,gender,bYear,bMonth,bDay});

   const saveUser =await createUser.save();

          res.status(200).json({saveUser})




  } catch (error) {

    res.status(500).json({'message':error.message})
    
  }



        


}
