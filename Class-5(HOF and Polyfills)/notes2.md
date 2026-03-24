# Class-5 (HOF and Polyfills) - Deep Notes (Definitions, Analogies, Execution, Code)

## 1) What is a Higher-Order Function (HOF)?

### Definition
A **Higher-Order Function** is any function that:
1. takes one or more functions as arguments, or
2. returns a function.

### Real-life analogy
Think of a washing machine:
- machine = HOF,
- clothes = array data,
- washing mode (quick wash/delicate/heavy) = callback function.

The machine is reusable; only the mode changes.  
Same with `map`, `filter`, and `reduce`: structure stays same, behavior changes via callback.

---

## 2) Why HOFs are important in projects

- reduce repetitive loops
- improve readability ("what" over "how")
- easier testing of callback logic
- composable data pipelines in frontend/backend

Example pipeline in real apps:
`orders -> filter valid -> map DTO -> reduce summary`

---

## 3) `map()` in complete detail

### Definition
`map()` creates a **new array** by transforming every element of an existing array.

### Mental model
"Take each item, apply formula, collect result."

### Signature
`arr.map(callback(currentValue, index, array), thisArg?)`

### Code + execution
```js
const prices = [100, 200, 300];
const withTax = prices.map((price, index) => {
  console.log("index:", index, "price:", price);
  return price * 1.18;
});
console.log(withTax);
```

### Output reasoning
- callback runs 3 times
- returns `118`, `236`, `354`
- final output: `[118, 236, 354]`

### Key properties
- output length = input length
- non-mutating (unless callback mutates item objects)
- best for one-to-one transformation

---

## 4) `filter()` in complete detail

### Definition
`filter()` creates a new array containing only elements for which callback returns truthy.

### Mental model
"Security guard checks each person; only allowed people enter."

### Code + execution
```js
const users = [
  { id: 1, active: true },
  { id: 2, active: false },
  { id: 3, active: true }
];

const activeUsers = users.filter((u) => u.active);
console.log(activeUsers);
```

### Output
`[{ id: 1, active: true }, { id: 3, active: true }]`

### Key properties
- output length can be smaller/zero/equal
- preserves order of passing elements
- ideal for validation/selection rules

---

## 5) `reduce()` in complete detail

### Definition
`reduce()` turns an array into one final value by repeatedly updating an accumulator.

### Mental model
"Piggy bank": every coin goes in, bank grows.

### Signature
`arr.reduce(callback(accumulator, currentValue, index, array), initialValue?)`

### Code + step trace
```js
const nums = [10, 20, 30];
const sum = nums.reduce((acc, curr, idx) => {
  console.log(`step ${idx}: acc=${acc}, curr=${curr}, next=${acc + curr}`);
  return acc + curr;
}, 0);
console.log(sum);
```

### Execution
- step0: acc=0 curr=10 next=10
- step1: acc=10 curr=20 next=30
- step2: acc=30 curr=30 next=60
- final: `60`

### Without initial value
If no initial value:
- first element becomes accumulator
- loop starts from second element

---

## 6) Choosing map vs filter vs reduce

- `map`: transform each item
- `filter`: keep/remove items
- `reduce`: aggregate to one value/object

Interview trick:
- If output is array same length -> map
- If output is subset -> filter
- If output is single thing (number/object/string) -> reduce

---

## 7) Polyfill concept

### Definition
A **polyfill** is custom implementation of a standard feature for environments where that feature does not exist.

In this class, polyfills build internal understanding:
- how callbacks are invoked
- how array traversal works
- how native-style behavior is designed

---

## 8) `myMap` polyfill (production-style baseline)

```js
Array.prototype.myMap = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArg, this[i], i, this));
    }
  }
  return result;
};

console.log([2, 3, 4].myMap((n) => n * n)); // [4, 9, 16]
```

### Why `i in this`?
It skips holes in sparse arrays, closer to native behavior.

---

## 9) `myFilter` polyfill

```js
Array.prototype.myFilter = function (callback, thisArg) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

console.log([1, 2, 3, 4, 5].myFilter((n) => n % 2 === 0)); // [2, 4]
```

---

## 10) `myReduce` polyfill

```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== "function") {
    throw new TypeError("callback must be a function");
  }
  if (this.length === 0 && arguments.length < 2) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let i = 0;
  let acc = initialValue;

  if (arguments.length < 2) {
    acc = this[0];
    i = 1;
  }

  for (; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};

console.log([1, 2, 3, 4].myReduce((a, b) => a + b, 0)); // 10
```

---

## 11) Real-life use cases

1. **E-commerce**
   - filter in-stock products
   - map to UI cards
   - reduce total value
2. **Analytics**
   - filter date range
   - map normalized events
   - reduce counts by type
3. **Banking**
   - filter successful transactions
   - reduce total debit/credit

---

## 12) Common mistakes and fixes

1. Forgetting `return` inside `map` callback -> gives `undefined` array.
2. Using `map` when selection is needed -> should use `filter`.
3. Missing initial value in `reduce` on empty array -> error.
4. Using wrong callback variable names in polyfills.

---

## 13) Practice with solved answers

### Q1: Create lookup by id
```js
const arr = [{ id: 1, n: "A" }, { id: 2, n: "B" }];
const byId = arr.reduce((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
console.log(byId);
```
Output: `{ 1: {id:1,n:"A"}, 2: {id:2,n:"B"} }`

### Q2: Convert sentence to word lengths
```js
const words = "js is powerful".split(" ");
console.log(words.map((w) => w.length)); // [2, 2, 8]
```

### Q3: Keep prime numbers
```js
const nums = [2, 3, 4, 5, 6, 7];
const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
};
console.log(nums.filter(isPrime)); // [2, 3, 5, 7]
```
