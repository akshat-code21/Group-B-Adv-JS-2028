// ============================================
// SOLUTIONS 21-30: Closures, Currying & Deep Operations
// ============================================

// Problem 21: Implement once(fn)
function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// Problem 22: Implement memoize(fn)
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    // Simple keying strategy: JSON.stringify
    // Limitation: doesn't handle functions, symbols, or circular references
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Problem 23: Private Variables Using Closures
function createBankAccount(initialBalance) {
  let balance = initialBalance;

  return {
    deposit(amount) {
      if (amount <= 0) {
        throw new Error('Deposit amount must be positive');
      }
      balance += amount;
      return balance;
    },

    withdraw(amount) {
      if (amount <= 0) {
        throw new Error('Withdrawal amount must be positive');
      }
      if (amount > balance) {
        throw new Error('Insufficient funds');
      }
      balance -= amount;
      return balance;
    },

    getBalance() {
      return balance;
    }
  };
}

// Problem 24: Rate Limiter Using Closure
function rateLimit(fn, limit, windowMs) {
  const calls = [];

  return function (...args) {
    const now = Date.now();
    
    // Remove calls outside the window
    while (calls.length > 0 && calls[0] <= now - windowMs) {
      calls.shift();
    }

    if (calls.length < limit) {
      calls.push(now);
      return fn.apply(this, args);
    } else {
      throw new Error('Rate limit exceeded. Try again later.');
    }
  };
}

// Problem 25: Fix the var + setTimeout Bug
/*
Answer:
1. Output: 5, 5, 5, 5, 5 (all print 5)
2. Why: 
   - 'var' has function scope, not block scope
   - All setTimeout callbacks reference the same 'i' variable
   - By the time callbacks execute, the loop has finished and i === 5

3. Fix using let:
*/
function fixWithLet() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => console.log(i), 1000);
  }
  // Prints: 0, 1, 2, 3, 4
  // 'let' creates new binding for each iteration
}

// 4. Fix using IIFE:
function fixWithIIFE() {
  for (var i = 0; i < 5; i++) {
    (function(j) {
      setTimeout(() => console.log(j), 1000);
    })(i);
  }
  // Prints: 0, 1, 2, 3, 4
  // IIFE creates new scope with captured value
}

// 5. Fix using helper function:
function fixWithHelper() {
  function createTimeout(value) {
    setTimeout(() => console.log(value), 1000);
  }
  
  for (var i = 0; i < 5; i++) {
    createTimeout(i);
  }
  // Prints: 0, 1, 2, 3, 4
}

// Problem 26: Implement Currying
function curry(fn) {
  const arity = fn.length;

  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(this, args);
    } else {
      return function (...nextArgs) {
        return curried.apply(this, [...args, ...nextArgs]);
      };
    }
  };
}

// Problem 27: Infinite Currying Sum
function sum(...args) {
  let total = args.reduce((acc, val) => acc + val, 0);

  function next(...nextArgs) {
    if (nextArgs.length === 0) {
      return total;
    }
    total += nextArgs.reduce((acc, val) => acc + val, 0);
    return next;
  }

  return next;
}

// Problem 28: Function Logger Wrapper
function withLogging(fn) {
  return function (...args) {
    const fnName = fn.name || 'anonymous';
    console.log(`[${fnName}] Called with args:`, args);

    try {
      const result = fn.apply(this, args);
      console.log(`[${fnName}] Returned:`, result);
      return result;
    } catch (error) {
      console.log(`[${fnName}] Threw error:`, error);
      throw error;
    }
  };
}

// Problem 29: Deep Clone with Circular Reference Handling
function deepClone(value, seen = new Map()) {
  // Handle primitives and null
  if (value === null || typeof value !== 'object') {
    return value;
  }

  // Check for circular reference
  if (seen.has(value)) {
    return seen.get(value);
  }

  // Handle Date
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // Handle Array
  if (Array.isArray(value)) {
    const arrCopy = [];
    seen.set(value, arrCopy);
    
    for (let i = 0; i < value.length; i++) {
      arrCopy[i] = deepClone(value[i], seen);
    }
    
    return arrCopy;
  }

  // Handle Map
  if (value instanceof Map) {
    const mapCopy = new Map();
    seen.set(value, mapCopy);
    
    value.forEach((val, key) => {
      mapCopy.set(deepClone(key, seen), deepClone(val, seen));
    });
    
    return mapCopy;
  }

  // Handle Set
  if (value instanceof Set) {
    const setCopy = new Set();
    seen.set(value, setCopy);
    
    value.forEach(val => {
      setCopy.add(deepClone(val, seen));
    });
    
    return setCopy;
  }

  // Handle plain objects
  const objCopy = {};
  seen.set(value, objCopy);

  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      objCopy[key] = deepClone(value[key], seen);
    }
  }

  return objCopy;
}

// Problem 30: Deep Equality Check
function isEqual(a, b, seen = new WeakMap()) {
  // Handle same reference
  if (a === b) return true;

  // Handle null and primitives
  if (a === null || b === null) return a === b;
  if (typeof a !== 'object' || typeof b !== 'object') return a === b;

  // Handle different types
  if (a.constructor !== b.constructor) return false;

  // Handle Date
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle Array
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], seen)) return false;
    }
    
    return true;
  }

  // Handle circular references
  if (seen.has(a)) {
    return seen.get(a) === b;
  }
  seen.set(a, b);

  // Handle plain objects
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!isEqual(a[key], b[key], seen)) return false;
  }

  return true;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    once,
    memoize,
    createBankAccount,
    rateLimit,
    fixWithLet,
    fixWithIIFE,
    fixWithHelper,
    curry,
    sum,
    withLogging,
    deepClone,
    isEqual
  };
}
