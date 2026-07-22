//map --

const input = [1,2,3,4,5];

function transform(i){
    return i*2;
}
//without using the loop this is the map function...
const ans = input.map(transform);
console.log(ans);

//filtering -- given an array give me back only the even values 

const arr = [1,2,3,4,5];

const ans1 = arr.filter(function(n){
if (n % 2 === 0) {
    return true;
} else {
    return false;
}
});

console.log(ans1);
