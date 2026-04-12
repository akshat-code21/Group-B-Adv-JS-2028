# JavaScript End Term Questions

## Q1. Simulating Order Processing in an E-commerce System Using Promises

Create a function that simulates an order processing system for an e-commerce website.

### Requirements:
- The system should take an order (list of items).
- Process the order asynchronously using `setTimeout`.
- Return a `Promise`:
  - Resolve if all items are available.
  - Reject if any item is unavailable.
- Assume a predefined inventory of available items.

### Tasks:
1. Simulate asynchronous order processing using Promises and `setTimeout`.
2. Resolve the Promise if all items are in stock.
3. Reject the Promise if any item is out of stock.

### Example Boilerplate:
```js
const inventory = {
  Laptop: 5,
  Phone: 10,
  Headphones: 15,
  Monitor: 7,
  Keyboard: 12,
};

function processOrder(order) {
  // your code here
}
````

---

## Q2. Implement a Polyfill for a Pub-Sub (Event Publisher) System

Create a polyfill for a Pub-Sub (Publisher-Subscriber) system in JavaScript.

### Requirements:

* Subscribers can subscribe to events.
* Publishers can publish events.
* All subscribers to an event should be notified.

### Methods to Implement:

1. `subscribe(eventName, callback)`
2. `unsubscribe(eventName, callback)`
3. `publish(eventName, data)`

### Goals:

* Support multiple subscribers per event.
* Allow unsubscribing.
* Pass optional data to subscribers.

### Example Boilerplate:

```js
class PubSub {
  constructor() {
    // your code here
  }

  subscribe(eventName, callback) {
    // your code here
  }

  unsubscribe(eventName, callback) {
    // your code here
  }

  publish(eventName, data) {
    // your code here
  }
}
```

---

## Q3. Currying Function for Product Price Calculation Based on Multiple Discounts

Create a curried function to calculate the final price of a product after applying multiple discounts.

### Requirements:

* Base price is provided initially.
* Discounts are applied sequentially.
* Each discount is a percentage.
* Return final price after all discounts.

### Tasks:

1. Create a curried function.
2. Each function call applies one discount.
3. Final call returns the computed price.

### Example Boilerplate:

```js
function applyDiscount(price) {
  // your code here
}
```

---

## Q4. Creating a Polyfill for JavaScript Promises

Create a simplified polyfill for JavaScript `Promise`.

### Requirements:

* Implement basic Promise behavior.
* Support:

  * `then`
  * `resolve`
  * `reject`
* Maintain internal state:

  * `pending`
  * `fulfilled`
  * `rejected`

### Tasks:

1. Create a class with a constructor accepting an executor.
2. Implement `resolve` and `reject`.
3. Implement `then`.

### Example Boilerplate:

```js
class MyPromise {
  constructor(executor) {
    // your code here
  }

  then(onFulfilled, onRejected) {
    // your code here
  }
}
```

---

# End of Questions
