//let n=153;
// const checkArmstrong =(n)=>{

//   const strNum=n.toString();
// console.log(typeof( strNum))

// let len =strNum.length;
// let num =0;;
// for(let i =0 ;i < len ;i++){
//   let digit=parseInt(strNum[i])
//   num+=Math.pow(digit ,len)
//   console.log(num)
// }
// if(num === n){
//   console.log('number is armstrong')
// }else{
//   console.log('No')
// }

// }

// checkArmstrong(153)



// let num =153;
// const strNum =num.toString()
// let len =strNum.length;
// let numPower=1;
// for(let i =0; i <=len ;i++){
// let digit=parseInt(strNum[i])
// console.log(digit)
//   numPower+=Math.pow(digit ,len)

// }
// console.log(numPower)

// const str = "153"; // Length = 5

// for (let i = 0; i <str.length; i++) {
//     console.log(str[i]);
// }

// const calculatePower =(base ,len) =>{
// let ans =1;
//   for(let i=1; i <=len; i++){

//     ans*=base

//   }

//   return ans;
// }

// const checkArmstrong=(n) =>{

//   let x =n;
//   let digit =[];
// let sum=0
//   while(n>0){
//     let val= n % 10;
//     digit.push(val);

//     n=Math.floor(n / 10)
//   }

// let lenDigit=digit.length

// for (i  of digit) {
//   sum+=calculatePower(i ,lenDigit)
// }
// return x===sum

// }

// if(checkArmstrong(153)){
//   console.log('yes')
// }else{
//   console.log('no')
// }

