const jsonwebtoken=require('jsonwebtoken');
const dotenv =require('dotenv')

dotenv.config()

exports.generateToken=(userid,expire)=>{
    const token =jsonwebtoken.sign({userid},process.env.SECRET_TOKEN,{expiresIn:expire})
    return token;

} 


