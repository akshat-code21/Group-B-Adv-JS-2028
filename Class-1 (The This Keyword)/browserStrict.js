"use strict";

// Browser Strict
// // console.log
// // function
// // objects method
// // function inside  method

// // console.log(this) => returns Window object

// // function

// function test() {
//   this.name = "Mrinal";
//   console.log(this);
// }

// test(); => returns undefined, because it is not a part of any object, also since it returns undefined we also cannot pollute the Window object (something like window.name = "Mrinal" is not allowed)

// // let obj = {
// //   name: "Adam",
// //   age: 27,
// //   greet: function () {
// //     console.log(this);
// //   },
// // };

// // let obj2 = {
// //   name: "Adam",
// //   age: 27,
// //   greet: function () {
// //      function sayHi() {
// //       console.log(this);
// //     };
// //     sayHi()
// //   },
// // };

// // obj2.greet(); returns undefined since it is not a part of any object

let obj = {
  name: "Adam",
  age: 27,
  greet: function () {
    console.log(this);
  },
};

obj.greet(); // returns Object obj

let obj4 = {
  name: "Adam",

  sayHello: () => {
    console.log(this);
  },
};

obj4.sayHello(); // 2
