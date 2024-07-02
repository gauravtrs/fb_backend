function fibonacci(n) {
    let fibSeries = [0,1];

    for (let i=2 ;i <n ;i++){
        fibSeries[i] =fibSeries[i-1] + fibSeries[i-2];
    }
    console.log(fibSeries);
    //return fibSeries

}

console.log(fibonacci(12));


let l=[5]
function cal(l){
    let result=1
    for(let i=1;i<=l;i++){
        result*=i

    }
    console.log(result,'');

}
 cal(l)
