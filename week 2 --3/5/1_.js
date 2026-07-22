// recap of promises

function setTimeoutPromisified(duration){
    return new Promise(function(resolve){
        setTimeout(resolve,duration);
    });
}

// function callback(){
//     console.log("1 sec has passed");
// }

// setTimeoutPromisified(1000).then(callback);

// Promise chaining -- 

setTimeoutPromisified(1000).then(function(){
    console.log("HI 0");
    return setTimeoutPromisified(3000)
    }).then(function(){
        console.log("HI 1")
        return setTimeoutPromisified(5000)
    }).then(function(){
        console.log("HI 2")
    });

    console.log("This is outside the promises")