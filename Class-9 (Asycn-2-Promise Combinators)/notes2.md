# Class-9 (Async-2: Promise Combinators) - Deep Notes (State, Chains, Combinators, Scenarios)

## 1) Promise fundamentals

### Definition
A **Promise** is an object representing eventual completion/failure of an async operation.

### States
1. `pending`
2. `fulfilled` with value
3. `rejected` with reason/error

Once fulfilled/rejected, state is final.

### Analogy
Online order:
- pending: order placed
- fulfilled: delivered
- rejected: canceled/failed

---

## 2) Creating and consuming a promise

```js
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("User data loaded"), 500);
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((err) => console.error(err))
  .finally(() => console.log("Request finished"));
```

Output:
1. `User data loaded`
2. `Request finished`

---

## 3) Promise chaining with execution flow

```js
Promise.resolve(5)
  .then((x) => x * 2) // 10
  .then((x) => x + 3) // 13
  .then((x) => {
    console.log(x);
    return x;
  })
  .catch(console.error);
```

Output: `13`

### Key rule
Each `.then()` returns a new promise.

---

## 4) Error propagation

```js
Promise.resolve("start")
  .then(() => {
    throw new Error("Something failed");
  })
  .then(() => console.log("won't run"))
  .catch((e) => console.log("Caught:", e.message));
```

Output: `Caught: Something failed`

---

## 5) Promise combinators overview

### Why combinators?
Real apps often fire multiple async tasks together. Combinators define coordination strategy.

| Requirement | Best combinator |
| --- | --- |
| all must succeed | `Promise.all` |
| collect success/failure of all | `Promise.allSettled` |
| first settled wins | `Promise.race` |
| first successful wins | `Promise.any` |

---

## 6) `Promise.all` deep

```js
const p1 = Promise.resolve("User");
const p2 = Promise.resolve("Posts");
const p3 = Promise.resolve("Comments");

Promise.all([p1, p2, p3]).then(console.log).catch(console.error);
```

Output: `["User", "Posts", "Comments"]`

### Behavior
- preserves input order in result
- fail-fast: one rejection rejects whole result

Use when all data is mandatory (checkout requires cart + address + payment profile).

---

## 7) `Promise.allSettled` deep

```js
const p1 = Promise.resolve("User");
const p2 = Promise.reject("Comments API failed");

Promise.allSettled([p1, p2]).then((results) => {
  console.log(results);
});
```

Output shape:
- `{ status: "fulfilled", value: "User" }`
- `{ status: "rejected", reason: "Comments API failed" }`

Use when partial data is acceptable (dashboard widgets).

---

## 8) `Promise.race` deep

```js
const fast = new Promise((res) => setTimeout(() => res("fast success"), 100));
const slow = new Promise((res) => setTimeout(() => res("slow success"), 1000));

Promise.race([slow, fast]).then(console.log).catch(console.error);
```

Output: `fast success`

If fastest settled promise rejects, race rejects.

Use-case: add timeout to API call.

---

## 9) `Promise.any` deep

```js
const a = Promise.reject("A failed");
const b = new Promise((res) => setTimeout(() => res("B success"), 300));
const c = Promise.reject("C failed");

Promise.any([a, b, c]).then(console.log).catch(console.error);
```

Output: `B success`

If all reject -> throws `AggregateError`.

Use-case: fallback providers (CDN/vendor/API mirrors).

---

## 10) Real-world patterns with solved code

### Pattern 1: timeout wrapper (`race`)
```js
function withTimeout(promise, ms) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Request timed out")), ms)
  );
  return Promise.race([promise, timeoutPromise]);
}
```

### Pattern 2: resilient UI (`allSettled`)
```js
Promise.allSettled([fetchUser(), fetchPosts(), fetchComments()]).then((r) => {
  const ok = r.filter((x) => x.status === "fulfilled").map((x) => x.value);
  console.log("available parts:", ok.length);
});
```

### Pattern 3: first available provider (`any`)
```js
Promise.any([providerA(), providerB(), providerC()])
  .then((data) => console.log("winner:", data))
  .catch((e) => console.log("all failed:", e));
```

---

## 11) Event loop relation (microtasks)

Promise callbacks (`then/catch/finally`) run in microtask queue.
Microtasks run before macrotasks (timers/I/O callback queue).

Example:
```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
```

Output:
`1`, `4`, `3`, `2`

---

## 12) Common mistakes

1. Using `Promise.all` when partial success is okay.
2. Forgetting `return` inside `.then`.
3. Confusing `race` and `any`.
4. Not handling rejection -> unhandled promise rejection warnings.

---

## 13) Practice with answers

1. Need all API results or fail -> `Promise.all`
2. Need every result including errors -> `Promise.allSettled`
3. Need first success among providers -> `Promise.any`
4. Need timeout behavior -> `Promise.race` with timeout promise
