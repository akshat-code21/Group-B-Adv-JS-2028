// ============================================
// SOLUTIONS 1-10: Async Control Flow & Event Loop
// ============================================

// Problem 1: Implement a Promise Pool (Concurrency Limiter)
function promisePool(tasks, limit) {
  if (limit <= 0) {
    return Promise.reject(new Error('Limit must be greater than 0'));
  }

  return new Promise((resolve, reject) => {
    const results = [];
    let nextIndex = 0;
    let activeCount = 0;
    let completed = 0;

    function runNext() {
      if (nextIndex >= tasks.length && activeCount === 0) {
        resolve(results);
        return;
      }

      while (activeCount < limit && nextIndex < tasks.length) {
        const currentIndex = nextIndex++;
        activeCount++;

        tasks[currentIndex]()
          .then(result => {
            results[currentIndex] = result;
            completed++;
            activeCount--;
            runNext();
          })
          .catch(error => {
            reject(error);
          });
      }
    }

    runNext();
  });
}

// Problem 2: Retry with Exponential Backoff
async function retryWithBackoff(fn, retries, delay) {
  let lastError;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        const waitTime = delay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }
  }
  
  throw lastError;
}

// Problem 3: Promise.all with Concurrency Control
function limitedPromiseAll(taskFns, limit) {
  if (limit <= 0) {
    return Promise.reject(new Error('Limit must be greater than 0'));
  }

  return new Promise((resolve, reject) => {
    const results = [];
    let nextIndex = 0;
    let activeCount = 0;
    let hasRejected = false;

    if (taskFns.length === 0) {
      resolve([]);
      return;
    }

    function runNext() {
      if (hasRejected) return;

      if (nextIndex >= taskFns.length && activeCount === 0) {
        resolve(results);
        return;
      }

      while (activeCount < limit && nextIndex < taskFns.length && !hasRejected) {
        const currentIndex = nextIndex++;
        activeCount++;

        taskFns[currentIndex]()
          .then(result => {
            if (hasRejected) return;
            results[currentIndex] = result;
            activeCount--;
            runNext();
          })
          .catch(error => {
            if (!hasRejected) {
              hasRejected = true;
              reject(error);
            }
          });
      }
    }

    runNext();
  });
}

// Problem 4: Event Loop Output Prediction #1
/*
Answer:
1. Output: A, D, C, B
2. Why:
   - "A" and "D" are synchronous console.log calls, executed immediately
   - Promise.then callback (C) is a microtask, queued in microtask queue
   - setTimeout callback (B) is a macrotask, queued in macrotask queue
   - After synchronous code completes, microtask queue is drained before next macrotask
   - Order: Synchronous → Microtasks → Macrotasks

3. If promise chain is nested:
   - Each .then() creates a new microtask
   - All nested microtasks will still execute before setTimeout
*/

// Problem 5: Implement async/await Using Generators
function run(generatorFn) {
  const iterator = generatorFn();

  function handle(result) {
    if (result.done) {
      return Promise.resolve(result.value);
    }

    return Promise.resolve(result.value)
      .then(value => handle(iterator.next(value)))
      .catch(error => handle(iterator.throw(error)));
  }

  try {
    return handle(iterator.next());
  } catch (error) {
    return Promise.reject(error);
  }
}

// Problem 6: Sequential Async Task Queue
function createSequentialQueue() {
  let tail = Promise.resolve();

  return {
    add(taskFn) {
      const currentTask = tail.then(
        () => taskFn(),
        () => taskFn() // Continue queue even if previous task failed
      );
      
      tail = currentTask.catch(() => {}); // Prevent unhandled rejection in chain
      
      return currentTask;
    }
  };
}

// Problem 7: Manual Promise Chaining
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      const handleFulfilled = (value) => {
        try {
          if (typeof onFulfilled === 'function') {
            const result = onFulfilled(value);
            resolve(result);
          } else {
            resolve(value);
          }
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === 'function') {
            const result = onRejected(reason);
            resolve(result);
          } else {
            reject(reason);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (this.state === 'fulfilled') {
        setTimeout(() => handleFulfilled(this.value), 0);
      } else if (this.state === 'rejected') {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        this.onFulfilledCallbacks.push(handleFulfilled);
        this.onRejectedCallbacks.push(handleRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}

// Problem 8: Promise Timeout Wrapper
function withTimeout(promise, ms) {
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Operation timed out after ${ms}ms`));
    }, ms);
  });

  return Promise.race([promise, timeoutPromise]);
}

// Problem 9: Debounced Async Function
function debounceAsync(fn, delay) {
  let timeoutId;
  let pendingReject;

  return function (...args) {
    return new Promise((resolve, reject) => {
      // Cancel previous pending call
      if (pendingReject) {
        pendingReject(new Error('Debounced - newer call received'));
      }

      clearTimeout(timeoutId);
      pendingReject = reject;

      timeoutId = setTimeout(async () => {
        pendingReject = null;
        try {
          const result = await fn.apply(this, args);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      }, delay);
    });
  };
}

// Problem 10: Throttled Async Function
function throttleAsync(fn, interval) {
  let lastCallTime = 0;
  let timeoutId;
  let lastThis;
  let lastArgs;
  let pendingPromise = null;

  return function (...args) {
    const now = Date.now();
    lastThis = this;
    lastArgs = args;

    if (!pendingPromise) {
      if (now - lastCallTime >= interval) {
        lastCallTime = now;
        pendingPromise = fn.apply(this, args);
        const currentPromise = pendingPromise;
        
        return currentPromise.finally(() => {
          if (pendingPromise === currentPromise) {
            pendingPromise = null;
          }
        });
      } else {
        // Queue the last call
        return new Promise((resolve, reject) => {
          clearTimeout(timeoutId);
          
          timeoutId = setTimeout(() => {
            lastCallTime = Date.now();
            pendingPromise = fn.apply(lastThis, lastArgs);
            const currentPromise = pendingPromise;
            
            currentPromise
              .then(resolve)
              .catch(reject)
              .finally(() => {
                if (pendingPromise === currentPromise) {
                  pendingPromise = null;
                }
              });
          }, interval - (now - lastCallTime));
        });
      }
    }

    return pendingPromise;
  };
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    promisePool,
    retryWithBackoff,
    limitedPromiseAll,
    run,
    createSequentialQueue,
    MyPromise,
    withTimeout,
    debounceAsync,
    throttleAsync
  };
}
