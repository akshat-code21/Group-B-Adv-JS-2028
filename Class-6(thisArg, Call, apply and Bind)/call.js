function greet(city, country) {
  console.log("Hello " + this.name + " " + city + " " + country);
}

const user = {
  name: "Adam",
  greet(city, country) {
    console.log("Hello " + this.name + " " + city + " " + country);
  },
};

const user2 = { name: "Steve" };

// greet()

// call

greet.call(user, "Bengaluru", "India");
user.greet.call(user2, "Bengaluru", "India"); // pass arguements without any additional bracket.
// Also, here we borrowed the fn for user2 from user. The reference of the this keyword changed.
