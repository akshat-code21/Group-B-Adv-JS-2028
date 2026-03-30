// function greet(city, country) {
//   console.log("Hello " + this.name + " " + city + " " + country);
// }

// const user2 = { name: "Steve" };

// greet.apply(user2, ["Mumbai", "India"]);

//--XX--//


let numbers = [10 ,30 ,40 ,50]

 let max1 = Math.max(numbers) // why this does not work?

let max2 = Math.max(...numbers)

let max3 = Math.max.apply(null, numbers)



console.log(max1)
console.log(max2)
console.log(max3)
