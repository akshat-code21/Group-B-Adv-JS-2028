function throttleAsync(fn, interval) {
  let timeoutId = null;
  let lastCallTime = 0;
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
            return null;
          }
        });
      } else {
        return new Promise((res, rej) => {
          clearTimeout(timeoutId);

          timeoutId = setTimeout(
            () => {
              lastCallTime = Date.now();
              pendingPromise = fn.apply(lastThis, lastArgs);
              const currentPromise = pendingPromise;

              currentPromise
                .then(resolve)
                .catch(reject)
                .finally(() => {
                  if (currentPromise === pendingPromise) {
                    pendingPromise = null;
                  }
                });
            },
            interval - (now - lastCallTime),
          );
        });
      }
    }
    return pendingPromise;
  };
}

function throttleAsync(fn, interval) {
  let lastCallTime;
  let lastArgs;
  let lastThis;
  let pendingPromise = null;
  let timeoutId = null;

  return (...args) => {
    const now = Date.now();
    lastThis = this;
    lastArgs = args;

    if (!pendingPromise) {
      if (now - lastCallTime >= interval) {
        lastCallTime = now;
        pendingPromise = fn.call(this, args);
        const currentPromise = pendingPromise;

        return currentPromise.finally(() => {
          if (pendingPromise === currentPromise) {
            pendingPromise = null;
          }
        });
      } else {
        return new Promise((res, rej) => {
          clearTimeout(timeoutId);

          timeoutId = setTimeout(
            () => {
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
            },
            interval - (now - lastCallTime),
          );
        });
      }
    }
    return pendingPromise;
  };
}

function throttleAsync(fn, interval) {
  let pendingPromise = null;
  let timeoutId = null;

  let lastThis;
  let lastArgs;
  let lastCallTime;

  return (...args) => {
    const now = Date.now();
    lastThis = this;
    lastArgs = args;

    if (!pendingPromise) {
      if (now - lastCallTime >= interval) {
        lastCallTime = now;
        pendingPromise = fn.call(this, args);
        const currentPromise = pendingPromise;

        currentPromise.finally(() => {
          if (pendingPromise === currentPromise) {
            return null;
          }
        });
      } else {
        return new Promise((res, rej) => {
          clearTimeout(timeoutId);

          timeoutId = setTimeout(
            () => {
              lastCallTime = Date.now();
              pendingPromise = fn.call(lastThis, lastArgs);
              const currentPromise = pendingPromise;

              currentPromise
                .then(res)
                .catch(rej)
                .finally(() => {
                  if (currentPromise === pendingPromise) {
                    pendingPromise = null;
                  }
                });
            },
            interval - (now - lastCallTime),
          );
        });
      }
    }
    return pendingPromise;
  };
}

function throttleAsync(fn, interval) {
  let timeoutId = null;
  let pendingPromise = null;

  let lastCallTime;
  let lastThis;
  let lastArgs;

  return (...args) => {
    let now = Date.now();
    lastThis = this;
    lastArgs = args;

    if (!pendingPromise) {
      if (now - lastCallTime >= interval) {
        lastCallTime = now;
        pendingPromise = fn.call(this, args);

        const currentPromise = pendingPromise;

        currentPromise.finally(() => {
          if (pendingPromise === currentPromise) {
            return null;
          }
        });
      } else {
        return new Promise((res, rej) => {
          clearTimeout(timeoutId);

          timeoutId = setTimeout(
            () => {
              lastCallTime = Date.now();
              pendingPromise = fn.call(lastThis, lastArgs);
              const currentPromise = pendingPromise;

              currentPromise
                .then(res)
                .catch(rej)
                .finally(() => {
                  if (currentPromise === pendingPromise) {
                    currentPromise = null;
                  }
                });
            },
            interval - (now - lastCallTime),
          );
        });
      }
    }
    return pendingPromise;
  };
}
