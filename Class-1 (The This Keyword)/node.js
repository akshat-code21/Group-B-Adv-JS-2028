// Node.js Non-Strict

// console.log
// function
// objects method
// function inside  method

//  console.log(this) => returns {}

// function

// function test() {
//     console.log(this);
//   }
// test(); => returns Node js global object.

// but an arrow function returns {}. This happens because arrow functions don’t have their own this. They lexically capture this from their surrounding scope, while normal functions determine this at call time.

let obj = {
  name: "Adam",
  age: 27,
  greet: function () {
    console.log(this);
  },
};

obj.greet(); // returns Object obj

//   // let obj2 = {
//   //   name: "Adam",
//   //   age: 27,
//   //   greet: function () {
//   //      function sayHi() {
//   //       console.log(this);
//   //     };
//   //     sayHi()
//   //   },
//   // };

//   // obj2.greet(); returns undefined since it is not a part of any object
