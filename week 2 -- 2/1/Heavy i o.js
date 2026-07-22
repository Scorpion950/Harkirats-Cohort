// taking input from another file 
// this function is happening synchronously (when one completes only then the other starts) -- 

const fs = require("fs");

var contents = fs.readFileSync(__dirname + "/a.txt", "utf8");
console.log(contents); 

// asynchronous functions - (all functions start at the same time) -- 

function print(err, data){
    console.log(data);
}

fs.readFile(__dirname + "/a.txt", "utf8", print);
fs.readFile(__dirname + "/b.txt", "utf8", print);        // the done got printed first because it was a small operation and in asynchronous the small operation gets printed first
console.log("done");                       // if we had used synchronous function then done would have printed last

// how error and data works -- 

function print(err, data){
if(err){
    console.log("This file is not found Please input the name correctly");
}else{
    console.log("file is found"); 
    console.log(data);
}
}

fs.readFile(__dirname + "/nngbh ef g.ttt", "utf8", print);
fs.readFile(__dirname + "/a.txt", "utf8", print);
