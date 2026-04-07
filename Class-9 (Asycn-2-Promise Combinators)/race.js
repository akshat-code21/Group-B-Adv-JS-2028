// race , any

function fetchFromOpenWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve("25 C in Bangalore"), 1000),
  );
}

function fetchFromWeatherAPI() {
  return new Promise((resolve, reject) =>
    setTimeout(() => reject("No Data"), 700),
  );
}

function fetchFromAccuWeather() {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve("24 C in Bengaluru"), 1200),
  );
}

// Promise.race([
//   fetchFromAccuWeather(),
//   fetchFromOpenWeather(),
//   fetchFromWeatherAPI(),
// ]).then((result)=>{
//     console.log(result)
// }).catch((err)=>{
//     console.log(err)
// });

Promise.any([
  fetchFromAccuWeather(),
  fetchFromOpenWeather(),
  fetchFromWeatherAPI(),
])
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });

// Write all the polyfills for all Combinators
// COnstruct your Own Promise

function all(promises) {
  //write your code here ===============================================
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Input must be an array"));
    }

    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve([]);
    }

    promises.forEach((promise, index) => {
      // Handle non-promise values also
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // reject immediately
    });
  });
}

function myPromiseAll(promises) {}
