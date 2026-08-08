// Defining an object type directly in the function parameter.
// The object must have a name of type string and an age of type number.
function greet(user: {
    name: string,
    age: number
}) {
    console.log("Hello " + user.name);
}

greet({
    name: "yash",
    age: 21
});


// Defining an object without explicitly assigning a type.
// TypeScript automatically infers the type from the values assigned to the object.
let user = {
    name: "yash",
    age: 21
};

greet(user);


// Defining an object type using an interface.
// The interface describes the structure and types of the object.
interface UserType {
    lastname: string,
    firstname: string,
    age: number
}

let user2: UserType = {
    firstname: "yash",
    lastname: "G",
    age: 21
};


// Using the interface as the type of the function parameter.
// The function expects an object that follows the UserType structure.
function greetUser(user: UserType) {
    console.log("Hello " + user.firstname + " " + user.lastname);
}

greetUser(user2);