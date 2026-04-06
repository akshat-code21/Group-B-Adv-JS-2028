// let button = document.getElementById("showName");
// console.log;




// button.addEventListener("click", greetUser);

// Polyfill of Bind

function greet(city, country) {
  console.log("Hello " + this.name + " " + city + " " + country);
}

const user = {
  name: "steve",
};

const greetUser1 = greet.bind(user, 'Mumbai');
greetUser1('India')

Function.prototype.myBind = function (context, ...boundArgs) {
  // this -> greet
  const originalFn = this;

  return function (...lateArgs) {
    return originalFn.apply(context, [...boundArgs, ...lateArgs]);
  };
};

const greetUser2 = greet.myBind(user , 'Mumbai');

greetUser2('India')
