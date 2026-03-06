// Pizza Shop
// Properties  - Size , Toppings , veg-non-veg , Crust

// const pizza1 = {
//     size : 'medium',
//     toppings : ['chesse' , 'Onions' , 'Capsicum'],
//     preference : 'Veg',
//     crust : 'thin'
// }

// const pizza2 = {
//     size : 'small',
//     toppings : ['chesse' , 'tomato' , 'Capsicum'],
//     preference : 'non-veg',
//     crust : 'thick'
// }

// Constuctor Function

function Pizaa(size, toppings, preference, crust) {
  // this --> {}....inside a function, this refers to the global object, to empty that object we use the new keyword
  this.size = size;
  this.toppings = toppings;
  this.preference = preference;
  this.crust = crust;

 
  this.serve  = function(){
    
  }

}

Pizaa.prototype.serve = function(){
    console.log(
        ` A ${this.size} Pizza with ${this.toppings} is Served (${this.preference})`
      );
}

let order1 = new Pizaa("Medium", ["Tomato , Cheese"], "Veg", "Thin");

let order2 = new Pizaa("Small", ["Onion", "Cheese"], "Non-Veg", "Thick");

console.log(order1);
console.log(order2);

order1.serve();
order2.serve()

//

function create(size, toppings) {
  let obj = {};
  obj.size = size;
  obj.toppings = toppings;
  obj.serve2 = function () {
    console.log(`A ${this.size} Pizza with ${this.toppings} is Served (${this.preference}`);
  };

  return obj;
} // doing this

const pizza1 = create("Medium", ["tomato", "chesse"]);
const pizza2 = create("Small" , ['Onion' , 'Cheese'])

 console.log( pizza1);
 console.log( pizza2)

// pizza1.serve2();
// pizza2.serve2()

// What is the prototype


// const car = {
//     name  : 'Mercedes'

// }

// car.serve()





