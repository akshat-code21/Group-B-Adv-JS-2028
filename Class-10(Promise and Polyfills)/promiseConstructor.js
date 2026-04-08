class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;
      this.state = "fulfilled";
      this.value = value;

      this.onFulfilledCallbacks.forEach((cb) => cb());
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;
      this.state = "rejected";
      this.reason = reason;

      this.onRejectedCallbacks.forEach((cb) => cb());
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;

      onRejected =
        typeof onRejected === "function"
          ? onRejected
          : (e) => {
              throw e;
            };

      const handleFulfilled = () => {
        queueMicrotask(() => {
          try {
            const result = onFulfilled(this.value);
            result instanceof MyPromise
              ? result.then(resolve, reject)
              : resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      };

      const handleRejected = () => {
        queueMicrotask(() => {
          try {
            const result = onRejected(this.reason);
            result instanceof MyPromise
              ? result.then(resolve, reject)
              : resolve(result);
          } catch (err) {
            reject(err);
          }
        });
      };

      if (this.state === "fulfilled") {
        handleFulfilled();
      } else if (this.state === "rejected") {
        handleRejected();
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

const p = new MyPromise((resolve, reject) => {
  // resolve(10);
  reject("Error!");
});

p.then((val) => {
  console.log("Resolved:", val);
}).catch(() => {
  console.log("errror");
});
