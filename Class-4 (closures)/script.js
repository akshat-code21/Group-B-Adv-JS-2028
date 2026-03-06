// Closures

// Lexical Scope? => the scope of a variable is determined by where the code is written in the source.

// function outer() {
//   let a = 10
//   let b = 30

//     function inner2(){
//         console.log(a)
//     }

//    return function inner1(){
//       console.log(a)
//       inner2()

//    }

// }

// let in1 = outer();

// in1()

function outer() {
  let a = 10;
  return function inner1() {
    return function inner2() {
      return function inner3() {
        console.log(a);
      };
    };
  };
}

let in1 = outer();

let in2 = in1();

let in3 = in2();

in3();
