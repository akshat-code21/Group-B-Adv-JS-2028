// ============================================
// SOLUTIONS 11-20: Promise Polyfills & Array/Function Methods
// ============================================

// Problem 11: Polyfill Promise.all
function myPromiseAll(items) {
  return new Promise((resolve, reject) => {
    const array = Array.from(items);

    if (array.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let completedCount = 0;

    array.forEach((item, index) => {
      Promise.resolve(item)
        .then(value => {
          results[index] = value;
          completedCount++;

          if (completedCount === array.length) {
            resolve(results);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  });
}

// Problem 12: Polyfill Promise.any
function myPromiseAny(items) {
  return new Promise((resolve, reject) => {
    const array = Array.from(items);

    if (array.length === 0) {
      reject(new AggregateError([], 'All promises were rejected'));
      return;
    }

    const errors = [];
    let rejectedCount = 0;

    array.forEach((item, index) => {
      Promise.resolve(item)
        .then(value => {
          resolve(value);
        })
        .catch(error => {
          errors[index] = error;
          rejectedCount++;

          if (rejectedCount === array.length) {
            reject(new AggregateError(errors, 'All promises were rejected'));
          }
        });
    });
  });
}

// Problem 13: Polyfill Promise.race
function myPromiseRace(items) {
  return new Promise((resolve, reject) => {
    const array = Array.from(items);

    // Note: Empty array will remain pending (standard behavior)
    array.forEach(item => {
      Promise.resolve(item)
        .then(resolve)
        .catch(reject);
    });
  });
}

// Problem 14: Polyfill Promise.allSettled
function myPromiseAllSettled(items) {
  return new Promise((resolve) => {
    const array = Array.from(items);

    if (array.length === 0) {
      resolve([]);
      return;
    }

    const results = [];
    let settledCount = 0;

    array.forEach((item, index) => {
      Promise.resolve(item)
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          settledCount++;
          if (settledCount === array.length) {
            resolve(results);
          }
        });
    });
  });
}

// Problem 15: Polyfill Function.prototype.call
Function.prototype.myCall = function (context, ...args) {
  // Handle null/undefined context
  if (context == null) {
    context = globalThis;
  } else {
    // Convert primitives to objects
    context = Object(context);
  }

  // Create unique property to avoid collisions
  const uniqueKey = Symbol('fn');
  context[uniqueKey] = this;

  // Execute function and get result
  const result = context[uniqueKey](...args);

  // Clean up
  delete context[uniqueKey];

  return result;
};

// Problem 16: Polyfill Function.prototype.apply
Function.prototype.myApply = function (context, argsArray) {
  // Handle null/undefined context
  if (context == null) {
    context = globalThis;
  } else {
    context = Object(context);
  }

  // Handle missing or invalid args
  const args = argsArray || [];

  // Create unique property
  const uniqueKey = Symbol('fn');
  context[uniqueKey] = this;

  // Execute function
  const result = context[uniqueKey](...args);

  // Clean up
  delete context[uniqueKey];

  return result;
};

// Problem 17: Polyfill Function.prototype.bind
Function.prototype.myBind = function (context, ...presetArgs) {
  const originalFn = this;

  const boundFn = function (...newArgs) {
    // Check if called with 'new'
    if (new.target) {
      // When used as constructor, ignore bound context
      return new originalFn(...presetArgs, ...newArgs);
    }

    // Normal call - use bound context
    return originalFn.apply(context, [...presetArgs, ...newArgs]);
  };

  // Maintain prototype chain for constructor usage
  if (this.prototype) {
    boundFn.prototype = Object.create(this.prototype);
  }

  return boundFn;
};

// Problem 18: Polyfill Array.prototype.reduce
Array.prototype.myReduce = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError('Array.prototype.myReduce called on null or undefined');
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;

  let accumulator;
  let startIndex = 0;

  if (arguments.length >= 2) {
    accumulator = initialValue;
  } else {
    if (length === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }

    // Find first existing element
    let found = false;
    for (let i = 0; i < length; i++) {
      if (i in array) {
        accumulator = array[i];
        startIndex = i + 1;
        found = true;
        break;
      }
    }

    if (!found) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  }

  for (let i = startIndex; i < length; i++) {
    if (i in array) {
      accumulator = callback(accumulator, array[i], i, array);
    }
  }

  return accumulator;
};

// Problem 19: Polyfill Array.prototype.filter
Array.prototype.myFilter = function (callback) {
  if (this == null) {
    throw new TypeError('Array.prototype.myFilter called on null or undefined');
  }

  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const array = Object(this);
  const length = array.length >>> 0;
  const result = [];

  for (let i = 0; i < length; i++) {
    if (i in array) {
      const value = array[i];
      if (callback(value, i, array)) {
        result.push(value);
      }
    }
  }

  return result;
};

// Problem 20: Polyfill Object.create
function myObjectCreate(proto) {
  // Validate prototype
  if (proto !== null && typeof proto !== 'object' && typeof proto !== 'function') {
    throw new TypeError('Object prototype may only be an Object or null: ' + proto);
  }

  // Create temporary constructor
  function F() { }
  F.prototype = proto;

  return new F();
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    myPromiseAll,
    myPromiseAny,
    myPromiseRace,
    myPromiseAllSettled,
    myObjectCreate
  };
}
