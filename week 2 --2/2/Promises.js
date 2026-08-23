const fs = require ("fs");

function readTheFile(sendtheFinalValueHere){
    fs.readFile("a.txt", "utf8", function(err, data){
        sendtheFinalValueHere(data);        
})
}

function readFile(fileName){
    //read the file and return its value
    return new Promise(readTheFile);
}

const p = readFile();

function callback(contents){
    console.log(contents);
}
p.then(callback);