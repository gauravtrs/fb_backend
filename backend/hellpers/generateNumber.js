let number = '0123456789';

exports.generateNumber = (length) => {
    let code = ""; 
    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * number.length);
        code += number[randomNumber];
    }
    return code; 
}
