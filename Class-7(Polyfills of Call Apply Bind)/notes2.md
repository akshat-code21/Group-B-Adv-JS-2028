# Class-7 (Polyfills of call/apply/bind) - Deep Notes (Internals, Edge Cases, Code)

## 1) Why learn polyfills for function methods?

### Definition
A **polyfill** is your custom implementation of standard behavior when native support is missing or to understand internals.

### Interview expectation
You should explain not only code, but:
- how `this` is forced,
- why temporary property is required,
- why cleanup is necessary,
- how edge cases are handled.

---

## 2) Internal trick behind call/apply

If `fn` must run with `this = obj`, do:
1. attach `fn` to `obj` temporarily
2. call it as `obj.temp()`
3. remove temp key

Why this works: method invocation sets `this` to object before dot.

### Real-life analogy
Temporary employee badge:
- give visitor temporary company badge (attach function),
- allow one-time access (invoke),
- collect badge back (delete key).

---

## 3) `myCall` deep implementation

```js
Function.prototype.myCall = function (context, ...args) {
  const ctx = context == null ? globalThis : Object(context);
  const key = Symbol("tempFn");
  ctx[key] = this; // this is original function
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
```

### Step-by-step execution
For `greet.myCall(user, "BLR")`:
1. `this` inside `myCall` = `greet`
2. create safe temp key
3. `user[key] = greet`
4. invoke `user[key]("BLR")` -> now `this` inside greet is `user`
5. cleanup
6. return result

---

## 4) `myApply` deep implementation

Difference from call: takes args array.

```js
Function.prototype.myApply = function (context, argsArray) {
  const ctx = context == null ? globalThis : Object(context);
  const key = Symbol("tempFn");
  ctx[key] = this;

  if (argsArray != null && !Array.isArray(argsArray)) {
    throw new TypeError("CreateListFromArrayLike called on non-object");
  }

  const args = argsArray == null ? [] : argsArray;
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
```

---

## 5) `myBind` deep implementation

```js
Function.prototype.myBind = function (context, ...boundArgs) {
  const originalFn = this;
  return function (...lateArgs) {
    return originalFn.myApply(context, [...boundArgs, ...lateArgs]);
  };
};
```

### Behavior explained
- returns a new function
- stores context + pre-filled args now
- executes later with remaining args

---

## 6) Full runnable test

```js
function greet(city, country) {
  return `Hello ${this.name} from ${city}, ${country}`;
}

const user = { name: "Adam" };

console.log(greet.myCall(user, "Bengaluru", "India"));
console.log(greet.myApply(user, ["Mumbai", "India"]));

const bound = greet.myBind(user, "Delhi");
console.log(bound("India"));
```

### Output
1. `Hello Adam from Bengaluru, India`
2. `Hello Adam from Mumbai, India`
3. `Hello Adam from Delhi, India`

---

## 7) Critical edge cases

1. `context` is null/undefined -> use `globalThis`
2. primitive context -> wrap with `Object(context)`
3. key collision -> use `Symbol`, not `tempFn`
4. `apply` with null args -> treat as `[]`
5. ensure temporary key is deleted even if function throws

Safer cleanup pattern:
```js
try {
  return ctx[key](...args);
} finally {
  delete ctx[key];
}
```

---

## 8) Advanced interview topic: bind with `new`

Native `bind` has constructor behavior:
- if bound function is used with `new`, `this` should be new instance, not bound context.

Basic classroom polyfill generally skips this complexity.  
Mentioning this in interview shows strong understanding.

---

## 9) Real-life use cases

1. Framework internals to preserve context for callbacks
2. Utility library function borrowing between objects
3. Legacy browser support and polyfill strategies
4. Debugging bugs from incorrect `this` behavior

---

## 10) Practice with solutions

### Q1: Why Symbol key?
To avoid overriding existing object keys.

### Q2: call vs apply internal difference?
Only argument input format differs.

### Q3: Why does bind return function?
Because it stores context for future execution (deferred invocation).
