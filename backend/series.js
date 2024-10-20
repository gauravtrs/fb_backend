
// function fibonacci(n) {
//     let fibSeries = [0,1];

//     for (let i=2 ;i <n ;i++){
//         fibSeries[i] =fibSeries[i-1] + fibSeries[i-2];
//     }
//     console.log(fibSeries);
//     //return fibSeries

// }

// console.log(fibonacci(12));


// let l=[5]
// function cal(l){
//     let result=1
//     for(let i=1;i<=l;i++){
//         result*=i

//     }
//     console.log(result,'');

// }
//  cal(l)

// const input = []; // Initialize an array to store input data

// // Prompt the user for input
// process.stdout.write("Enter your number of test cases followed by each case on a new line:\n");

// // Read input from the user
// process.stdin.on('data', function(chunk) {
//    input.push(chunk.toString()); // Convert chunk to string and store it in the input array
// });

// // When input stream ends
// process.stdin.on('end', function() {
//    console.log("Raw input data received:", input.join(''));  // Debugging output
//    let data = input.join('').split('\n');
//    let t = parseInt(data[0]);
//    console.log("Number of test cases: ", t); // Debugging output

//    for (let i = 1; i <= t; i++) {
//       const N = parseInt(data[i]);
//       console.log("Test case ", i, ": ", N); // Debugging output
//    }
//});

// console.log(parseInt((103 % 100)+ (103/100)));
//let power=Math.pow(2,y)

// console.log(Math.ceil((16/6)));
// console.log(Math.ceil(13/6));

// let friends=12;
// let tvcharges=250;

// console.log(Math.ceil(friends/6) *tvcharges);

// let sch=2;
// stu=10;
// let pass=13;

// if((sch*stu)/2 <pass){
//     console.log('yes')
// }else{
//     console.log('no');
// }


// let weapons=[3,4,6,7];
// let evencount=0;
// let oddcount=0;

// for(let i=1; i <= weapons[0] ;i++){
//     if((weapons[i])%2==0){
//         evencount +=1;
//     }else{
//         oddcount +=1
//     }
// }

// console.log('even:,',evencount);
// console.log('odd:', oddcount);

const numbers = [4, 5, 6, 4]; // Yeh numbers hai jinko hum process karenge

let group = {}; // Ye ek empty object hai jisme hum keys aur values store karenge

numbers.forEach((num) => {
  // Yahan hum har number ko process kar rahe hain
  group[num] =group[num] || [] // Agar group[num] nahi hai to empty array banao
  
  // group[num] yahan dynamically key ban raha hai
  // jaise pehli baar jab num = 4 hai, to group[4] create ho raha hai
  // aur agar pehli baar nahi hai, to usi array ko use kiya ja raha hai
  
  group[num].push(num); // Current number ko us array me add karo
});

console.log(group['4']);









