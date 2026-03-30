
Function.prototype.myApply = function (context, ...args) {
    // Edge Cases
  
    // handle  null or undefined
    context = context || globalThis;
  
    // this - greet
    // person2 -> tempFn -> greet
    // person2.greet(...args)
    // use of symbol - 
    context.tempFn = this;
    const result = context.tempFn(...args);
    delete context.tempFn;
    return result;
  };

  // How you will change this polyfill so that it works for Apply