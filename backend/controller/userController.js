const user = require("../models/user");
const bcrypt =require('bcrypt');
const { emailValidation, validationLength, usernameValidate } = require("../hellpers/validation");
const { generateToken } = require("../hellpers/generateToken");
const { sendVerificationMail, sendPasswordCode } = require("../hellpers/mailder");
const jwt =require('jsonwebtoken');
const {generateNumber} =require('../hellpers/generateNumber');
const Code = require("../models/code");







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

   //validate username create unique username
   const fullName=first_name + last_name;
   const newusername=await usernameValidate(fullName)
 


   const createUser = await new user({first_name,last_name ,username:newusername,email,password:hashPassword,gender,
    bYear,bMonth,bDay});

   const saveUser =await createUser.save();

   const emailValidationToken=generateToken({id:saveUser._id.toString()},'30m')
   console.log(emailValidationToken);


   const url =`${process.env.BASE_URL}/activate/${encodeURIComponent(emailValidationToken)}`

   sendVerificationMail(saveUser.email ,saveUser.first_name ,url)

   const token = generateToken({id:saveUser._id.toString()} ,"7d");

          res.status(200).json({
            id:saveUser._id,
            first_name:saveUser.first_name,
            last_name:saveUser.last_name,
            username:saveUser.username,
            picture:saveUser.picture,
            verified:saveUser.verified,
            token:token,
            message: "Register Success ! please activate your email to start",
          })


  } catch (error) {

    res.status(500).json({'message':error.message})
    
  }
       


}



//activate account
exports.activateAccount =async(req ,res) =>{
  
  try {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    //check authorize user 

    let validUser =req.user.userid.id;
    console.log('validateuser:',validUser)

    // Verify token
    const userVerify = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log(userVerify);
    if (!userVerify) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if(validUser !==userVerify.userid.id){
      
      return res.status(400).json({
        message: "You don't have the authorization to complete this operation.",
      });
    }

    // Find user by ID 
    const check = await user.findById(userVerify.userid.id);
    console.log('check:',check);
    if (!check) {
        return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is already verified
    if (check.verified) {
        return res.status(400).json({ message: "This email is already activated" });
    }

    // Update user verification status
    await user.findByIdAndUpdate(userVerify.userid.id, { verified: true });
    return res.status(200).json({ message: "This email has been activated successfully" });
} catch (error) {
    if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: "Token has expired" });
    } else if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: "Invalid token" });
    } else {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
};




//Login
exports.login =async(req ,res) =>{

  try {

    const {email ,password} =req.body;

    const userEmail = await user.findOne({email});

    if(!userEmail){
      return res.status(400).json({message :"the eamil address you entered is not connected to the account"})
    }

    const check = await bcrypt.compare(password ,userEmail.password);

    if(!check){
      return res.status(400).json({message :"invalid credentials please try again "})
    }

    const token =generateToken({id:userEmail._id.toString()}, "7d")
    res.status(200).json({
      id:userEmail.id,
      first_name:userEmail.first_name,
      last_name:userEmail.last_name,
      username:userEmail.username,
      picture:userEmail.picture,
      verified:userEmail.verified,
      token,
      


    })



    
  } catch (error) {
    res.status(500).json({error:error.name});
    
  }
}


//test auth 

exports.auth= async(req,res) =>{
  console.log(req.user)
  res.status(200).json({message:"user auth sucessfull"});
}



//sendVerification again

exports.sendVerification = async(req , res) =>{
  try {

    const getuserid =req.user.userid.id;
    console.log('userid:', req.user.userid.id);
    console.log('getuser:', getuserid);

    const findUser = await user.findById(getuserid);
    console.log('finduser:', findUser)

    if(findUser.verified === true){

      return res.status(400).json({
        message: "This account is already activated.",
      })
    }

    const mailToken =generateToken({id:findUser._id.toString()},'30m');

    let url=`${process.env.BASE_URL}/activate/${mailToken}`

    sendVerificationMail(findUser.email ,findUser.first_name ,url);

    return res.status(200).json({
      message: "Email verification link has been sent to your email.",
    });



    
  } catch (error) {
    res.status(500).json({ message: error.message });
    
  }
}



exports.findUser = async(req ,res) =>{
  const {email} =req.body ;
  const getUser = await user.findOne({email}).select('-password')

  if(!getUser){
    return res.status(400).json({
      message:"Account does not exists"
    })
  }
  return res.status(200).json({
    email:getUser.email,
    picture:getUser.picture,
  })
}


exports.passwordVerificationCode = async(req , res) =>{

  try {
    const {email} =req.body;

    const findUser = await user.findOne({email}).select("-password");
    await Code.findOneAndDelete({user:findUser._id});
    const codeGenerate =generateNumber(5);

    const newCode = await new Code({code:codeGenerate , user:findUser._id}).save();
    sendPasswordCode(findUser.email , findUser.first_name ,codeGenerate)

    return res.status(200).json({
      message: "Email reset code has been sent to your email",
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


exports.passwordCodeVerify = async(req , res) =>{

  try {

    const {email ,code} =req.body;
    const findUser = await user.findOne({email});

    const dbCode = await Code.findOne({user:findUser._id});

    if(dbCode.code !== code){
      return res.status(400).json({message:"Verification code is wrong.."})
    }
    return res.status(200).json({message:"ok"});
    
  } catch (error) {
    res.status(500).json({ message: error.message });

  }
}


exports.changePassword = async(req , res) =>{
  try {
    const {email , password} = req.body;
    const brcyptPassword = await bcrypt.hash(password , 10)

    await user.findOneAndUpdate({email},{password:brcyptPassword},)

    return res.status(200).json({ message: "ok" });

    
  } catch (error) {
    res.status(500).json({ message: error.message });

    
  }
}