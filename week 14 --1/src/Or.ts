// A type alias that can store either a string or a number.
type StringOrNumber = string | number;


// A type alias that can store a string, number, or boolean.
type SumInput = string | number | boolean;


// Defining an object type using an interface.
interface Manager {
    name: string,
    age: number
}


// Defining another object type using an interface.
interface Employee {
    name: string,
    department: string
}


// Combining Manager and Employee using the intersection (&) operator.
// A TeamLead must have all the properties of both Manager and Employee.
type TeamLead = Manager & Employee;


// Creating an object using the TeamLead type.
let teamLead: TeamLead = {
    name: "yash",
    age: 21,
    department: "IT"
};


// Using the StringOrNumber type.
// This variable can contain either a string or a number.
let value: StringOrNumber = "yash";

value = 21;


// Using the SumInput type.
// This variable can contain a string, number, or boolean.
let input: SumInput = 10;

input = "yash";
input = true;


// A function that accepts a TeamLead object.
function greetTeamLead(user: TeamLead) {
    console.log(
        "Hello " + user.name +
        ", Age: " + user.age +
        ", Department: " + user.department
    );
}


// Calling the function with a TeamLead object.
greetTeamLead(teamLead);