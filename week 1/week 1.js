
//function -- 
function sum(a,b){
    let totalsum = a+b;
    return totalsum;
}

let and = sum(32,25);
let and1 = sum(2,3);

console.log(and);
console.log(and1);

// 2nd example 
function canvote(age) {
   if (age >= 18) {
       return "You can vote";
   }else{
         return "You cannot vote";
   }
}

let ans = canvote(20);
let ans1 = canvote(16);

console.log(ans);
console.log(ans1);

//loop - 

let users = ["yash", "harkirat", "aman", "sahil","jay","vijay"];
let totaluser = users.length;
for (let i = 0;i<totaluser;i++){
    console.log(users[i]);      
}
  

//objects - 

let user = {
    name : "JHK",
    age : 20,   
    city : "pune",
}
console.log(user.name); //OR
console.log(user["city"]);

//assignment - 

function greet(ussr) {
    console.log ("hii, "+ ussr.name + " your age is " + ussr.age);
}

let ussr = {
    name : "yash",
    age : 20,
    gender : "male"
}

greet(user);