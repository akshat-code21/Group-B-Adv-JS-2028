// // Browser Non-Strict
// console.log
// function
// objects method
// function inside  method

// console.log(this) => returns Window object

// function

// function test(){
//      console.log(this)
// }

// test() => returns Window object

let obj = {
  name: "Adam",
  age: 27,
  greet: function () {
    console.log(this);
  },
};

obj.greet(); // returns Object obj

//   let obj2 = {
//     name: "Adam",
//     age: 27,
//     greet: function () {
//        function sayHi() {
//         console.log(this);
//       };
//       sayHi()
//     },
//   };

//   obj2.greet(); => returns Window object since it is not a part of the object, it returns a function.
