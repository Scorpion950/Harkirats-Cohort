interface User{
    name: string, // we can put it like name: "yash" | "rahul"
    age: number,
    address:{
        city: string,
        state? : string, // if you want that a user can have state or not then we can put it like this (a question mark)
        pincode: number
    }
}

let user: User ={
    name: "yash",
    age: 21,
    address:{
        city: "pune",
        state: "maharashtra",
        pincode: 411057
    }
}

let user2: User ={
    name: "rahul",
    age: 17,
    address:{
        city: "mumbai",
        pincode: 400001
    }
}

function isLegal(user:User): boolean{
    if (user.age >= 18){
        return true;
    }else{
        return false;
    }
}

const ans = isLegal(user);
if(ans){
    console.log("User is legal");
}else{
    console.log("User is not legal");
}

const ans2 = isLegal(user2);
if(ans2){
    console.log("User is legal");
}else{
    console.log("User is not legal");
}