
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

const input = []; // Initialize an array to store input data

// Prompt the user for input
process.stdout.write("Enter your number of test cases followed by each case on a new line:\n");

// Read input from the user
process.stdin.on('data', function(chunk) {
   input.push(chunk.toString()); // Convert chunk to string and store it in the input array
});

// When input stream ends
process.stdin.on('end', function() {
   console.log("Raw input data received:", input.join(''));  // Debugging output
   let data = input.join('').split('\n');
   let t = parseInt(data[0]);
   console.log("Number of test cases: ", t); // Debugging output

   for (let i = 1; i <= t; i++) {
      const N = parseInt(data[i]);
      console.log("Test case ", i, ": ", N); // Debugging output
   }
});


