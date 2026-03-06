// 'use strict'

// Node.js Strict

// console.log
// function
// objects method
// function inside  method

//  console.log(this) => returns {}

// function

// function test() {
//   console.log(this);
// }
// test(); => returns undefined

// let obj = {
//     name: "Adam",
//     age: 27,
//     greet: function () {
//       console.log(this);
//     },
//   };

//   obj.greet() => returns Object obj

// //   // let obj2 = {
// //   //   name: "Adam",
// //   //   age: 27,
// //   //   greet: function () {
// //   //      function sayHi() {
// //   //       console.log(this);
// //   //     };
// //   //     sayHi()
// //   //   },
// //   // };

// //   // obj2.greet(); => returns undefined since it is not a part of any object

// function test() {
//   console.log(this);
// }
// test(); => returns undefined

// // Arrow function

// let test2 = () => {
//   console.log(this);
// };

// test2(); => 

// the difference doesn't exist here. both return undefined.



let obj = {
    name: "Adam",
    age: 27,
    greet: function () {
      console.log(this);
    },
  };

  obj.greet() // 1

let obj4 = {
  name: "Adam",

  sayHello: () => {
    console.log(this);
  },
};

obj4.sayHello()// 2
