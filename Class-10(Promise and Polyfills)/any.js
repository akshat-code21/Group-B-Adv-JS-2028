// Promise any Polyfill

function fetchFromOpenWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("No Data"), 1000)
  );
}

function fetchFromWeatherAPI() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("No Data"), 700)
  );
}

function fetchFromAccuWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("No Data"), 1200)
  );
}

function myPromiseAny(items) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(items)) {
      return reject(new TypeError("Input must be an Array of Promises"));
    }

    if (items.length == 0) {
      return reject(new Error("All Promises Rejected"));
    }

    let errors = new Array(items.length);
    let rejectedPromises = 0;

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then(resolve)
        .catch((error) => {
          errors[index] = error;
          rejectedPromises++;

          if (rejectedPromises === items.length) {
            reject(errors);
          }
        });
    });
  });
}

myPromiseAny([
  fetchFromAccuWeather(),
  fetchFromOpenWeather(),
  fetchFromWeatherAPI(),
])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log('Aggregate Error' , err);
  });
