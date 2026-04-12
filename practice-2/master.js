function myPromiseAll(items) {
  return new Promise((res, rej) => {
    if (!Array.isArray(items)) {
      throw new TypeError("Items is not array");
    }

    if (items.length === 0) {
      res([]);
    }

    let results = [];
    let completedCount = 0;

    items.forEach((item) => {
      Promise.resolve(item)
        .then((data) => {
          results.push(data);
          completedCount++;

          if (completedCount === items.length) {
            res(results);
          }
        })
        .catch((error) => {
          rej(error);
        });
    });
  });
}

function myPromiseAny(items) {
  return new Promise((res, rej) => {
    if (!Array.isArray(items)) {
      return rej(new TypeError("Items is not an array"));
    }
    if (items.length === 0) {
      res([]);
    }

    const errors = [];
    const errorCount = 0;

    items.forEach((item) => {
      Promise.resolve(item)
        .then((data) => {
          res(data);
        })
        .catch((error) => {
          errorCount++;
          errors.push(error);
          if (errorCount === array.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
}

function myPromiseRace(items) {
  return new Promise((res, rej) => {
    if (!Array.isArray(items)) {
      return rej(new TypeError("Items is not an array"));
    }

    if (items.length === 0) {
      return;
    }

    items.forEach((item) => {
      Promise.resolve(item)
        .then((value) => {
          res(value);
        })
        .catch((err) => {
          rej(err);
        });
    });
  });
}

function myPromiseAllSettled(items) {
  return new Promise((res, rej) => {
    if (!Array.isArray(items)) {
      return rej(new TypeError("Items is not an array"));
    }

    if (items.length === 0) {
      res([]);
    }

    const results = [];
    const completedCount = 0;

    items.forEach((item) => {
      Promise.resolve(item)
        .then((value) => {
          results.push({ status: "fulfilled", value: value });
        })
        .catch((err) => {
          results.push({ status: "rejected", reason: err });
        })
        .finally(() => {
          completedCount++;
          if (completedCount === items.length) {
            resolve(results);
          }
        });
    });
  });
}

Function.prototype.myCall = function (context, ...args) {
  ctx = context || globalThis;
  const key = Symbol("fn");
  ctx[key] = this;

  const res = ctx[key](...args);
  delete ctx[key];
  return res;
};

Function.prototype.myApply = function (ctx, argsArray) {
  ctx = ctx || globalThis;
  let args = argsArray || [];

  const key = Symbol("fn");
  ctx[key] = this;

  const res = ctx[key](...args);
  delete ctx[key];
  return res;
};

Function.prototype.myBind = function (ctx, ...outerArgs) {
  const originalFn = this;

  return (...innerArgs) => {
    return originalFn.apply(ctx, [...outerArgs, ...innerArgs]);
  };
};

function greet(city, country) {
  return `Hello ${this.name} from ${city}, ${country}`;
}

const user = { name: "Adam" };

console.log(greet.myCall(user, "Bengaluru", "India"));
console.log(greet.myApply(user, ["Mumbai", "India"]));

const bound = greet.myBind(user, "Delhi");
console.log(bound("India"));

Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback != "function") {
    throw new TypeError("Cb not a function");
  }

  let arr = this;

  let res = [];

  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      res.push(cb.call(thisArg, arr[i]), i, arr);
    }
  }

  return res;
};

Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback != "function") {
    throw new TypeError("Cb not a function");
  }

  let arr = this;
  let res = [];

  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback(thisArg, arr[i], i, arr)) {
      res.push(arr[i]);
    }
  }

  return res;
};

Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback != "function") {
    throw new TypeError("Cb not a function");
  }
  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError("Array cannot be empty");
  }
  let i = 0;
  let acc = initialValue;
  let arr = this;

  if (arguments.length < 2) {
    acc = arr[0];
    i = 1;
  }

  for (; i < arr.length; i++) {
    if (i in this) {
      acc = callback(acc, arr[i], i, this);
    }
  }
  return acc;
};
