# Class-8 (Async-1) - Deep Notes (Callbacks, Event Loop, I/O, Execution Flow)

## 1) Why asynchronous programming exists

JavaScript runs code on a single main execution thread.  
If JS waited synchronously for file/network/timer operations, your app would freeze.

### Real-life analogy
Single chef in kitchen:
- if chef waits at oven for 20 min doing nothing, all orders stop.
- better: put dish in oven (delegate), cook other tasks, serve when timer rings.

This is async JavaScript.

---

## 2) Core building blocks

1. **Call Stack**: where JS functions execute.
2. **Runtime APIs**: browser Web APIs or Node libuv/OS for async tasks.
3. **Queues**: callbacks waiting to run.
4. **Event Loop**: moves queued tasks to stack when stack is free.

---

## 3) Callback fundamentals

### Definition
Callback = function passed to another function to execute later.

```js
console.log("Start");
setTimeout(() => console.log("Timer callback"), 0);
console.log("End");
```

### Execution timeline
1. `Start` logs (sync)
2. timer registered in runtime
3. `End` logs (sync)
4. stack becomes empty
5. callback pulled from queue and executed

Output:
`Start` -> `End` -> `Timer callback`

---

## 4) `setTimeout` and minimum delay

`setTimeout(fn, 0)` means:
- execute after at least 0ms
- not immediate; only after current stack clears.

Delay is minimum, not guaranteed exact millisecond.

---

## 5) Node.js async file read pattern

Your class uses:
`fs.readFile(path, (err, data) => { ... })`

### Error-first callback convention
- first arg: error object or null
- second arg: successful result

```js
const fs = require("fs");
fs.readFile("f1.txt", (err, data) => {
  if (err) {
    console.error("Cannot read file", err);
    return;
  }
  console.log("Data:", data.toString().trim());
});
```

---

## 6) Parallel async execution in callbacks

```js
const fs = require("fs");

console.log("Start");
fs.readFile("f1.txt", (e, d) => console.log("f1:", d?.toString().trim()));
fs.readFile("f2.txt", (e, d) => console.log("f2:", d?.toString().trim()));
fs.readFile("f3.txt", (e, d) => console.log("f3:", d?.toString().trim()));
console.log("End");
```

### Important
- `Start` then `End` first
- file logs later
- completion order may vary

Why? all reads are started quickly and run outside JS stack.

---

## 7) Serial execution with callbacks

If you need strict order `f1 -> f2 -> f3`, nest callbacks:

```js
const fs = require("fs");
fs.readFile("f1.txt", (e1, d1) => {
  if (e1) return console.error(e1);
  console.log("f1:", d1.toString().trim());

  fs.readFile("f2.txt", (e2, d2) => {
    if (e2) return console.error(e2);
    console.log("f2:", d2.toString().trim());

    fs.readFile("f3.txt", (e3, d3) => {
      if (e3) return console.error(e3);
      console.log("f3:", d3.toString().trim());
    });
  });
});
```

Works, but readability drops as nesting grows (callback hell).

---

## 8) Callback hell

### Definition
Deeply nested callbacks for dependent async tasks causing:
- poor readability
- duplicated error handling
- maintenance complexity

This pain is why Promises and async/await are preferred for larger workflows.

---

## 9) Event loop: macro vs micro understanding

For Async-1, focus on callback queue (macrotasks): timers, I/O callbacks.  
Promise callbacks (microtasks) are handled with higher priority (covered more in async-2).

Simple rule:
- run all sync code
- then microtasks
- then macrotasks

---

## 10) Real-life use cases

1. Reading multiple files during server startup.
2. Debouncing user typing with timer callback.
3. Scheduling retries with backoff via `setTimeout`.
4. Running periodic tasks using `setInterval`.

---

## 11) Common mistakes

1. Expecting async output in same order as code.
2. Ignoring `err` argument.
3. Assuming `setTimeout(..., 0)` runs immediately.
4. Over-nesting callbacks without abstraction.

---

## 12) Practice with solved outputs

### Q1
```js
console.log("A");
setTimeout(() => console.log("B"), 0);
console.log("C");
```
Answer: `A C B`

### Q2
Why can `f3` print before `f1` in parallel reads?  
Answer: completion depends on I/O timing, not call order.

### Q3
How to guarantee order with callbacks?  
Answer: nest dependent callbacks or use Promise chain in next class.
