function debounceAsync(fn, delay) {
  let pendingReject = null;
  let timeoutId = null;

  return new Promise((res, rej) => {
    if (pendingReject) {
      rej(new Error("Debounce rejected"));
    }
    pendingReject = rej;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      pendingReject = null;
      try {
        const result = fn.call(this, args);
        res(result);
      } catch (error) {
        rej(error);
      }
    }, delay);
  });
}

function debounceSync(fn, delay) {
  let timeoutId = null;

  return (...args) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(async () => {
      fn.call(this, args);
    }, delay);
  };
}

function debounceAsync(fn, delay) {
  let timeoutId = null;
  let pendingReject = null;
  return (...args) => {
    return new Promise((res, rej) => {
      if (pendingReject) {
        rej(new Error("Debounce rejected"));
      }

      pendingReject = rej;
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        pendingReject = null;
        try {
          const result = fn.apply(this, args);
          res(result);
        } catch (error) {
          rej(error);
        }
      }, delay);
    });
  };
}

function debounceAsync(fn, delay) {
  let timeoutId = null;
  let pendingReject = null;
  return (...args) => {
    return new Promise((res, rej) => {
      if (pendingReject) {
        rej("Debounce reject");
      }

      pendingReject = rej;
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        pendingReject = null;
        try {
          const result = fn.call(this, args);
          res(result);
        } catch (err) {
          rej(err);
        }
      }, delay);
    });
  };
}

function debounceAsync(fn, delay) {
  let timeoutId;
  let pendingReject;
  return (...args) => {
    return new Promise((res, rej) => {
      if (pendingReject) {
        rej("Debounce rejected");
      }
      clearTimeout(timeoutId);
      pendingReject = rej;

      timeoutId = setTimeout(() => {
        pendingReject = null;
        try {
          const result = fn.call(this, args);
          res(result);
        } catch (err) {
          rej(err);
        }
      }, delay);
    });
  };
}
