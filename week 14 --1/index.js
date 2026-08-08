"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isLegal(age) {
    if (age > 18) {
        return true;
    }
    else {
        return false;
    }
}
console.log(isLegal(2));
function delayedCall(fn) {
    setTimeout(fn, 1000);
}
delayedCall(function () {
    console.log("Hello");
});
//# sourceMappingURL=index.js.map