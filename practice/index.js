// const user = {
//   name: "Alice",
//   greet: function () {
//     console.log(this.name);
//     const innerGreet = () => {
//       console.log(this.name);
//     }
//     innerGreet();
//   },
// };

// user.greet();

// const timer = {
//     name: "Timer",
//     start: function () {
//       setTimeout( () => {
//         console.log(this.name);
//       }, 100);
//     }
//   };

//   timer.start();

// const calc = {
//   base: 10,
//   add: function (a, b) {
//     return this.base + a + b;
//   },
// };

// function bindBase(base) {
//   // Return a function that takes (a, b) and returns base + a + b
//   return (a,b) => {
//     return base + a + b;
//   }
// }

// const fn = bindBase(10);
// console.log(fn(1, 2));

// "use strict";

// console.log("1",this);

// function showThis() {
//   console.log(this);
// }

// showThis();

// function Book(title, author) {
//     this.title = title;
//     this.author = author;
// }

// Book.prototype.getInfo = function () {
//     return `${this.title} by ${this.author}`;
// };

// const b1 = new Book("Clean Code", "Robert Martin");
// const b2 = new Book("JS Guide", "MDN");
// console.log(b1.getInfo());
// console.log(b2.getInfo());

// function myNew(Constructor, ...args) {
//     let newObj = {};
//     Object.setPrototypeOf(newObj, Constructor.prototype);
//     Constructor.call(newObj,...args);
//     return newObj;
// }

// function Person(name) {
//   this.name = name;
// }

// const person = myNew(Person, "John");
// console.log(person.name);
// console.log(person instanceof Person);

// function Car(make, model) {
//     this.make = make;
//     this.model = model;
// }

// Car.prototype.describe = function () {
//     return `${this.make} - ${this.model}`;
// };

// function createCar(make, model) {
//     return {
//         make : make,
//         model : model,
//         describe : function () {
//             return `${this.make} - ${this.model}`;
//         }
//     }
// }

// const c1 = new Car("Toyota", "Camry");
// const c2 = createCar("Honda", "Civic");
// console.log(c1.describe());
// console.log(c2.describe());
// console.log(c1 instanceof Car);
// console.log(c2 instanceof Car);

// function Student(id, name) {
//     this.id = id;
//     this.name = name;
// }

// Student.prototype.getId = function () {
//     return this.id;
// };

// const students = [new Student(101, "Ali"), new Student(102, "Bina")];

// const ids = students.map(student => student.getId());
// console.log(ids);

// class Order {
//   static count = 0;
//   #id;

//   constructor() {
//     this.#id = Order.count;
//     Order.count++;
//   }

//   getId() {
//     return this.#id
//   }

//   static getCount() {
//     return Order.count;
//   }
// }

// const o1 = new Order();
// const o2 = new Order();
// console.log(o1.getId());
// console.log(o2.getId());
// console.log(Order.getCount());

// class Shape {
//   constructor(name) {
//     this.name = name
//   }

//   describe() {
//     return "Shape: " + this.name
//   }
// }

// class Circle extends Shape {
//   constructor(name, radius) {
//     super(name)
//     this.radius = radius
//   }

//   describe() {
//     return "Circle: " + this.name + ", radius " + this.radius
//   }
// }

// const c = new Circle("Small", 5);
// console.log(c.describe());

// class Validator {
//   #isEmpty(str) {
//     if (str === undefined || str === null || str.length === 0) return true;
//     else return false;
//   }

//   validate(str) {
//     return !this.#isEmpty(str);
//   }
// }

// const v = new Validator();
// console.log(v.validate(""));
// console.log(v.validate("hello"));

// function createCounter(initial, step) {
//   return {
//     increment() {
//         return initial += step
//     },
//     decrement() {
//         return initial -= step
//     },
//     getCount() {
//         return initial
//     },
//   };
// }

// const c1 = createCounter(0, 2);
// c1.increment();
// console.log(c1.getCount());
// c1.increment();
// console.log(c1.getCount());
// const c2 = createCounter(10, 1);
// c2.decrement();
// console.log(c2.getCount());

// function createMemoizedAdd() {
//   let cache = {};
//   return function (n) {
//     if(cache[n])
//         return cache[n];
//     cache[n] = n+n;
//     return cache[n]
//   };
// }

// const add = createMemoizedAdd();
// console.log(add(5));
// console.log(add(5));

// function createBankAccount(initialBalance) {
//   return {
//     deposit(amount) {
//       return (initialBalance += amount);
//     },
//     withdraw(amount) {
//         return initialBalance -= amount
//     },
//     getBalance() {
//         return initialBalance
//     },
//   };
// }

// const acc = createBankAccount(1000);
// console.log(acc.deposit(500));
// console.log(acc.withdraw(200));
// console.log(acc.getBalance());

// function createMultiplier(factor) {
//   let cache = {};
//   return function (n) {
//     if(cache[n] !== undefined) return cache[n];
//     cache[n] = factor * n;
//     return cache[n]
//   };
// }

// const double = createMultiplier(2);
// const triple = createMultiplier(3);
// console.log(double(7));
// console.log(triple(7));

// Array.prototype.myMap = function (callback, thisArg) {
//   let arr = this;
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     newArr.push(callback.call(thisArg, arr[i], i, this));
//   }
//   console.log(newArr);
//   return newArr
// };

// const arr = [1, 2, 3];
// const result = arr.myMap(function (x) {
//   return x * 2;
// });
// console.log(result);

// Array.prototype.myFilter = function (callback, thisArg) {
//   let arr = this;
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (callback.call(thisArg, arr[i], i, this)) newArr.push(arr[i]);
//   }
//   return newArr
// };

// const arr = [1, 2, 3, 4, 5, 6];
// const evens = arr.myFilter(function (x) {
//   return x % 2 === 0;
// });
// console.log(evens);

// Array.prototype.myReduce = function (callback, initialValue) {
//   let acc;
//   let startIdx;
//   if (arguments.length === 1 && initialValue === undefined) {
//     throw new TypeError("Reduce of empty array with no initial value");
//   }
//   if (arguments.length === 1) {
//     acc = this[0];
//     startIdx = 1;
//   } else {
//     acc = initialValue;
//     startIdx = 0;
//   }
//   for (let i = startIdx; i < this.length; i++) {
//     acc = callback(acc, this[i], i, this);
//   }
//   return acc;
// };

// const arr = [1, 2, 3, 4, 5];
// const sum1 = arr.myReduce((acc, curr) => acc + curr, 0);
// const sum2 = arr.myReduce((acc, curr) => acc + curr);
// console.log(sum1);
// console.log(sum2);

// const people = [
//   { name: "Alice", age: 25 },
//   { name: "Bob", age: 17 },
//   { name: "Charlie", age: 30 },
// ];

// let result = people
//   .filter((p) => p.age >= 18)
//   .map((p) => `${p.name} is adult`)
//   .reduce((prev, curr) => `${prev}${prev ? "; " : ""}${curr}`);
// console.log(result);
