const user = require("../models/user");


exports.emailValidation = (email) => {
    const regexValidation = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/i;
    return regexValidation.test(email);
};


exports.validationLength= (text ,min ,max) =>{
    
    if(text.length <min || text.length >max){
        return false;
    }
    return true;

} 


exports.usernameValidate=async(username) =>{
    let a =false;
    let randonNum =Math.floor(Math.random() * 10000); 

    do {
        const check =await user.findOne({username})

        if(check){
            username+= randonNum;
            a=true

        }else{
            a=false
        }


        
    } while (a);
    return username
}