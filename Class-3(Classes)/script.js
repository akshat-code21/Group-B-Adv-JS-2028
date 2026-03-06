// why do we need classes when we have constructor functions?
// answer: classes are syntactic sugar over constructor functions. they are more readable and easier to write. they give more control over the code.

class Pizaa {
  static totalPizzaMade = 0;
  size;
  //   #size; // private field

  constructor(size, toppings, preference, crust) {
    this.size = size;
    // this.#size = size;
    this.toppings = toppings;
    this.preference = preference;
    this.crust = crust;
    Pizaa.totalPizzaMade++;
  } // responsible to create the objects

  static showTotalPizza() {
    console.log(`${Pizaa.totalPizzaMade}`);
  } // static methods are called on the class, not the object.

  // Closures - Next Class => best thing for private methods.

  serve() {
    console.log(`This is a ${this.size} Pizza from parent `);
    // console.log(`This is a ${this.#size} Pizza from parent `);
	
  }// automatically copied in each object. equivalent to prototype functions
}

class StuffedCrustPizaa extends Pizaa {
  constructor(size, toppings, preference, crust, stuffing) {
    super(size, toppings, preference, crust);
    this.stuffing = stuffing;
  }

  test() {
    console.log("test");
  }

  describe() {
    super.serve();
  }
}

const order1 = new Pizaa("Medium", ["Tomato , Cheese"], "Veg", "Thin");
console.log(order1.size);
const order3 = new Pizaa("Medium", ["Tomato , Cheese"], "Veg", "Thin");
console.log(order3);
const order4 = new Pizaa("Medium", ["Tomato , Cheese"], "Veg", "Thin");
console.log(order4);
const order5 = new Pizaa("Medium", ["Tomato , Cheese"], "Veg", "Thin");
console.log(order5);

// // const order2 = new StuffedCrustPizaa(
// //   "small",
// //   ["mushrooms", "cheese"],
// //   "Veg",
// //   "Thick",
// //   "Mozarella"
// // );

// console.log(order2);

// order1.serve();
// order2.describe();

Pizaa.showTotalPizza();

// Classcial Inhertance in JS (prototypal)
// Static properties and methods
