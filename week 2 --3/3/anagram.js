// anagrams => aabbcc - ccabab

// to convert any string into an array of characters => .split("")

//delimeter => splits the string from the from the word you gave =>ccabab.split("a") => ["cc", "b", "b"]

// for joining any array we use split/join("") =  let arr = ["cc", "b", "b"]; arr.split/join("") => "ccbb"

//then we use we sort the array using sort() => ["b", "b", "cc"].sort() => ["b", "b", "cc"]  

function isAnagram(str1, str2) {
    //or str11 = str1.toLowerCase() => used in string 2 
    const arr1 = str1.toLowerCase().split(""); // => ["c", "a", "b", "b", "c"]
    arr1.sort(); // => ["a", "b", "b", "c", "c"]
    const sortedstring1 = arr1.join(""); // => "aabbcc"

    str2.toLowerCase(); //if any word is capital it will ake it to lower case
    const arr2 = str2.split("");
    arr2.sort();
    const sortedstring2 = arr2.join("");

    //we can chain everything in just one line => const sortedstring1 = str1.toLowerCase().split("").sort().join("");
    
    if(sortedstring1 == sortedstring2 ){
        return true;
    }else{
        return false;
    }
}
module.exports = isAnagram;