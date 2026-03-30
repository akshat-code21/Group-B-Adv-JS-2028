const fs = require("fs");

console.log("Start");

fs.readFile("f1.txt", (err, data) => {
  if (err) {
    console.log("cannot read file", err);
    return;
  }

  console.log("Data1 " + data);
});

fs.readFile("f2.txt", (err, data) => {
  if (err) {
    console.error("Cannot read File ", err);
    return;
  }

  console.log("Data2  " + data);
});

fs.readFile("f3.txt", (err, data) => {
  if (err) {
    console.error("Cannot read File ", err);
    return;
  }

  console.log("Data3 " + data);
});

fs.readFile("f4.txt", (err, data) => {
    if (err) {
      console.error("Cannot read File ", err);
      return;
    }
  
    console.log("Data4 " + data);
  });


  fs.readFile("f5.txt", (err, data) => {
    if (err) {
      console.error("Cannot read File ", err);
      return;
    }
  
    console.log("Data5 " + data);
  });

console.log("End");
