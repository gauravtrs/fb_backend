

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