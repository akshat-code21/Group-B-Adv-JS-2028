class MyPromise {
  constructor(executor) {
    this.state = "pending";
    this.reason = undefined;
    this.value = undefined;

    this.fulfilledCallbacks = [];
    this.rejectedCallbacks = [];

    this.resolve = (value) => {
      if (this.state === "pending") {
        this.state = "fulfilled";
        this.value = value;
        this.fulfilledCallbacks.forEach((fn) => fn(value));
      }
    };

    this.reject = (reason) => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.reason = reason;
        this.rejectedCallbacks.forEach((fn) => fn(reason));
      }
    };

    try {
      executor(this.resolve, this.reject);
    } catch (err) {
      this.reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise((res, rej) => {
      const handleFulfilled = (value) => {
        try {
          if (typeof onFulfilled === "function") {
            const result = onFulfilled(value);
            res(result);
          } else {
            res(value);
          }
        } catch (error) {
          rej(error);
        }
      };

      const handleRejected = (reason) => {
        try {
          if (typeof onRejected === "function") {
            const result = onRejected(reason);
            res(result);
          } else {
            res(value);
          }
        } catch (error) {
          rej(error);
        }
      };

      if (this.state === "fulfilled") {
        setTimeout(() => handleFulfilled(this.value), 0);
      } else if (this.state === "rejected") {
        setTimeout(() => handleRejected(this.reason), 0);
      } else {
        this.fulfilledCallbacks.push(onFulfilled);
        this.rejectedCallbacks.push(onRejected);
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}
