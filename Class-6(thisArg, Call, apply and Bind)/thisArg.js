// const user = {
//    name : 'Adam',
//    sayHi() {
//       console.log(`Hello ${this.name}`)
//    }
// }

// user.sayHi()

//--xx--//

const user = {
  message: "Hello",
};

const names = ["Adam", "Bob", "Charles"];

names.forEach(function (name) {
  console.log(this.user, name);
}, user);  // Here arrow fns also fail since it is not inside the object and thus takes global object as `this`

//--XX--//

const calculator = {
  multiplier: 2,

  numbers: [1, 2, 3],

  multiply() {
    return this.numbers.map((num) => {
      console.log(num);
      return num * this.multiplier;
    });
  },
};

// console.log(calculator.multiply()); // arrow fns use lexical scoping and so they get reference of `this`. So we don't need to add thisArg.

const calculatorNormal = {
  multiplier: 2,

  numbers: [1, 2, 3],

  multiply() {
    return this.numbers.map(function (num) {
      console.log(num);
      return num * this.multiplier;
    }, this);
  },
};

console.log(calculatorNormal.multiply()); // returns undefined or NaN since it doesn't have reference to `this`. We need to pass it

// Call , Apply and Bind. Used for thisArg / setting the this keyword.
