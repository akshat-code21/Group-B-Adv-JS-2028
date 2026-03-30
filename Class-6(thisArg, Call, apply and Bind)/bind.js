// let button = document.getElementById("showName");
// console.log;

// const greetUser = greet.bind(user, 'Mumbai');


// button.addEventListener("click", greetUser);

// Polyfill of Bind

function greet(city, country) {
  console.log("Hello " + this.name + " " + city + " " + country);
}

const user = {
  name: "steve",
};

Function.prototype.myBind = function (context, ...boundArgs) {
  // this -> greet
  const originalFn = this;

  return function (...lateArgs) {
    return originalFn.apply(context, [...boundArgs, ...lateArgs]);
  };
};

const greetUser = greet.myBind(user , 'Mumbai');

greetUser('India')
