// Polyfill of Promise.allSettled

function fetchUserData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ userId: 1, username: "JohnDoe" }), 2000);
  });
}

function fetchUserPosts() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(["Post 1", "Post 2", "Post 3"]), 1000);
  });
}

function fetchUserComments() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = Math.random() > 1; // 50% chance of failure
      if (success) {
        resolve(["Nice!", "Interesting post", "Subscribed!"]);
      } else {
        reject("Failed to fetch comments ❌");
      }
    }, 800);
  });
}

function myPromiseAllSettled(items) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(items)) {
      return reject(new TypeError("Input must be an Array of Promises"));
    }

    if (items.length == 0) {
      resolve([]);
    }

    const results = new Array(items.length);
    let countCompleted = 0;

    items.forEach((item, index) => {
      Promise.resolve(item)
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "Rejected", reason };
        })
        .finally(() => {
          countCompleted++;
          if (items.length === countCompleted) {
            resolve(results);
          }
        });
    });
  });
}

// check if the items is an array
// loop through and resolve promises (items)
// store the result in an Array as well
// count of Promises Resolved and rejected if they are = items.length
let finalResults = myPromiseAllSettled([
  fetchUserData(),
  fetchUserPosts(),
  fetchUserComments(),
]).then((results)=>{
    console.log(results)
});

console.log(finalResults)
