# Class-6 (thisArg, call, apply, bind) - Deep Notes (Definitions, Analogies, Execution, Code)

## 1) `this` quick foundation

### Golden rule
`this` is determined by **call-site** (how function is invoked), not where function is written.

### Real-life analogy
Think of a microphone:
- same microphone (function)
- speaker changes depending on who holds it (caller/context).

---

## 2) `thisArg` in array methods

Methods like `forEach`, `map`, `filter` accept optional second parameter `thisArg`.

### Why useful?
When callback uses regular function syntax and you want controlled `this`.

```js
const context = { tag: "Student" };
const names = ["Adam", "Bob"];

names.forEach(function (name, index) {
  console.log(index, this.tag, name);
}, context);
```

### Output
- `0 Student Adam`
- `1 Student Bob`

### Important
If callback is arrow function, `thisArg` does not rebind `this` (arrow has lexical `this`).

---

## 3) `call()` in detail

### Definition
`fn.call(context, arg1, arg2, ...)`  
Calls function immediately with explicit `this`.

### Analogy
Borrowing your friend's bike and riding it now.

```js
function greet(city, country) {
  console.log(`Hello ${this.name} from ${city}, ${country}`);
}
const user = { name: "Steve" };
greet.call(user, "Bengaluru", "India");
```

Output: `Hello Steve from Bengaluru, India`

---

## 4) `apply()` in detail

### Definition
`fn.apply(context, [arg1, arg2, ...])`  
Same as `call`, but arguments are passed as array-like.

### When used
- when arguments already come as array
- forwarding dynamic argument lists

```js
function greet(city, country) {
  console.log(`Hello ${this.name} from ${city}, ${country}`);
}
const user = { name: "Steve" };
greet.apply(user, ["Mumbai", "India"]);
```

Output: `Hello Steve from Mumbai, India`

---

## 5) `bind()` in detail

### Definition
`fn.bind(context, ...preFilledArgs)` returns a **new function** with locked `this`.

### Analogy
Pre-booking a cab: destination fixed now, travel happens later.

```js
function greet(city, country) {
  console.log(`Hello ${this.name} from ${city}, ${country}`);
}
const user = { name: "Steve" };
const greetFromDelhi = greet.bind(user, "Delhi");
greetFromDelhi("India");
```

Output: `Hello Steve from Delhi, India`

---

## 6) call vs apply vs bind (decision table)

- `call`: run now, args separated
- `apply`: run now, args array
- `bind`: run later, returns function

---

## 7) Why `Math.max(numbers)` fails

```js
const numbers = [10, 30, 40, 50];
console.log(Math.max(numbers));         // NaN
console.log(Math.max(...numbers));      // 50
console.log(Math.max.apply(null, numbers)); // 50
```

### Reason
`Math.max` expects `Math.max(10, 30, 40, 50)`, not one array argument.

---

## 8) Lost-`this` bug in callbacks

```js
const user = {
  name: "Adam",
  show() {
    console.log(this.name);
  }
};

setTimeout(user.show, 0); // undefined/global
setTimeout(user.show.bind(user), 0); // Adam
```

### Why first line breaks?
`user.show` is passed as plain function reference; call-site becomes simple function call.

---

## 9) Step-by-step execution (bind example)

```js
function add(a, b) {
  return this.base + a + b;
}
const ctx = { base: 10 };
const boundAdd = add.bind(ctx, 5);
console.log(boundAdd(3));
```

Execution:
1. `bind` creates new function
2. locks `this = ctx`, pre-fills `a = 5`
3. later call with `3` sets `b = 3`
4. computes `10 + 5 + 3 = 18`

Output: `18`

---

## 10) Real project use-cases

1. **UI Event handlers**: preserve class/component context.
2. **Method borrowing**: reuse shared utility method across objects.
3. **Middleware pipeline**: forward dynamic args with apply/spread.
4. **Partial application**: pre-bind common parameters like region/currency.

---

## 11) Edge cases to know

1. `call/apply` with `null` or `undefined` context:
   - non-strict function: defaults to global object
   - strict function: remains null/undefined
2. primitives can be boxed (`Object(1)`, `Object("x")`)
3. bound function can still accept remaining arguments

---

## 12) Practice with solved answers

### Q1
Borrow `print` method from `objA` for `objB`.
```js
objA.print.call(objB);
```

### Q2
You already have args array.
```js
fn.apply(ctx, args);
// or fn.call(ctx, ...args)
```

### Q3
Fix lost `this` in event listener.
```js
button.addEventListener("click", handler.bind(component));
```
