// function greet(city, country) {
//   console.log("Hello " + this.name + " " + city + " " + country);
// }

// const user2 = { name: "Steve" };

// greet.apply(user2, ["Mumbai", "India"]);

//--XX--//

let numbers = [10, 30, 40, 50];

let max1 = Math.max(numbers); // why this does not work? => does not work because Math.max() does not accept an array — it expects individual numbers as arguments, not a single array.

let max2 = Math.max(...numbers);

let max3 = Math.max.apply(null, numbers); // here the arguements will be the array elements due to the nature of apply and thus does same job as spread operator.

console.log(max1);
console.log(max2);
console.log(max3);
