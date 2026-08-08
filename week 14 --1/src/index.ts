function isLegal(age: number): boolean {
    if (age > 18) {
        return true;
    } else {
        return false;
    }
}

console.log(isLegal(2));

function delayedCall(fn: () => void): void {
    setTimeout(fn, 1000);
}

delayedCall(function () {
    console.log("Hello");
});