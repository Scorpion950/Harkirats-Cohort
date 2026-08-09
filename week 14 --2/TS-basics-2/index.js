let user = {
    name: "yash",
    age: 21,
    address: {
        city: "pune",
        state: "maharashtra",
        pincode: 411057
    }
};
let user2 = {
    name: "rahul",
    age: 17,
    address: {
        city: "mumbai",
        pincode: 400001
    }
};
function isLegal(user) {
    if (user.age >= 18) {
        return true;
    }
    else {
        return false;
    }
}
const ans = isLegal(user);
if (ans) {
    console.log("User is legal");
}
else {
    console.log("User is not legal");
}
export {};
