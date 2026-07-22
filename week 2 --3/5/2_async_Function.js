function setTimeoutPromisified(duration){
    return new Promise(function(resolve){
    setTimeout(resolve,duration)
});
}

async function solve(){
    await setTimeoutPromisified(1000);
    console.log("HI 1");
    await setTimeoutPromisified(3000);
    console.log("HI 2");
    await setTimeoutPromisified(5000);
    console.log("HI 3");
}

solve();