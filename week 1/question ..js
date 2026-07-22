// create a function that takes an array of objects as input and returns the users whose age >18 and is male

function solved(arr) {
    let arr2 = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].gender === "male" && arr[i].age >= 18) {
            arr2.push(arr[i]);
        }
    }
    return arr2;
}

const users = [
    {
        name: "yash",
        age: 25,
        gender: "male",
    },
    {
        name: "JHK",
        age: 25,
        gender: "female",
    },
    {
        name: "aman",
        age: 15,
        gender: "male"
    }
];

console.log(solved(users));