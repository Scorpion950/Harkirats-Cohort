const fs = require("fs");

function main(filename) {
  fs.readFile(filename, "utf8", function (err, data) {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }

    let total = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i] === " ") {
        total++;
      }
    }
    console.log(total + 1);
  });
}

main(process.argv[2]);