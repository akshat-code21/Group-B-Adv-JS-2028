Function.prototype.myApply = function (context, argsArray) {
  // Edge Cases

  // handle  null or undefined
  context = context || globalThis;
  argsArray = argsArray || [];

  if (!Array.isArray(argsArray)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  // this - greet
  // person2 -> tempFn -> greet
  // person2.greet(...args)
  // use of symbol -
  // Step 3: Use Symbol to avoid collision. What if the object already has that property? So we use Symbol so that it doesn't get overriden
  const fnSymbol = Symbol();

  context[fnSymbol] = this;

  // Step 4: Call function with spread args
  const result = context[fnSymbol](...argsArray);

  // Step 5: Cleanup
  delete context[fnSymbol];

  return result;
};

// How you will change this polyfill so that it works for Apply

// Similar to call, just pass the args after spreading.
