class MyPromise {
  constructor(executor) {
    (this.state = "pending"), (this.value = undefined);
    this.reason = undefined;
    this.onFullifilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state !== "pending") return;

      this.state = "fulfilled";
      this.value = value;

      this.onFullifilledCallbacks.forEach((cb) => cb(value));
    };

    const reject = (reason) => {
      if (this.state !== "pending") return;

      this.state = "rejected";
      this.reason = reason;

      this.onRejectedCallbacks.forEach((cb) => cb(reason));
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFullifilled, onRejeceted) {
    if (typeof onFullifilled !== "function") {
      onFullifilled = (value) => value;
    }

    if (typeof onRejeceted !== "function") {
      onRejeceted = (reason) => {
        throw reason;
      };
    }

    if (this.state === "fulfilled") {
      onFullifilled(this.value);
    } else if ((this.state = "rejected")) {
      onRejeceted(this.reason);
    } else {
      this.onFullifilledCallbacks.push(onFullifilled);
      this.onRejectedCallbacks.push(onRejeceted);
    }
  }

  catch(onRejeceted) {
    if (typeof onRejeceted !== "function") {
      onRejeceted = (reason) => {
        throw reason;
      };
    }
  }
}

let p1 = new Promise(function (resolve, reject) {
  // resolve // reject
});

p1.then().catch();
