// sum of 2 numbers 

function sum(a, b) {
    return a + b;
}
let ans = sum(200,10);
console.log(ans);

// sum of n numbers

function sum(n){
    let ans = 0;
    for(let i=0;i<=n;i++){
        ans = ans+i;
    }
    return ans;
}
let ans1 = sum(100);
console.log(ans1);

// example -- 

function sum(n){
    return n*(n+1);
}
let ans2 = sum(100);
console.log(ans2);
let ans3 = sum(1000);
console.log(ans3);
let ans4 = sum(10000);
console.log(ans4);