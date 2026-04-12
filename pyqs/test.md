Here are **clean, interview-style test cases for Q2 (Pub-Sub system)** — covering edge cases + real-world scenarios.

---

## ✅ Basic Functionality

```js
const pubsub = new PubSub();

function callback(data) {
  console.log("Received:", data);
}

pubsub.subscribe("event1", callback);
pubsub.publish("event1", "Hello World");

// Expected Output:
// Received: Hello World
```

---

## ✅ Multiple Subscribers

```js
const pubsub = new PubSub();

function cb1(data) {
  console.log("cb1:", data);
}

function cb2(data) {
  console.log("cb2:", data);
}

pubsub.subscribe("event1", cb1);
pubsub.subscribe("event1", cb2);

pubsub.publish("event1", 42);

// Expected Output:
// cb1: 42
// cb2: 42
```

---

## ✅ Unsubscribe Works

```js
const pubsub = new PubSub();

function cb(data) {
  console.log("Called:", data);
}

pubsub.subscribe("event1", cb);
pubsub.unsubscribe("event1", cb);

pubsub.publish("event1", "Test");

// Expected Output:
// (nothing)
```

---

## ✅ Unsubscribe One of Many

```js
const pubsub = new PubSub();

function cb1(data) {
  console.log("cb1:", data);
}

function cb2(data) {
  console.log("cb2:", data);
}

pubsub.subscribe("event1", cb1);
pubsub.subscribe("event1", cb2);

pubsub.unsubscribe("event1", cb1);

pubsub.publish("event1", "Hi");

// Expected Output:
// cb2: Hi
```

---

## ✅ Publish Without Subscribers

```js
const pubsub = new PubSub();

pubsub.publish("event1", "No listeners");

// Expected Output:
// (nothing, no errors)
```

---

## ✅ Multiple Events Isolation

```js
const pubsub = new PubSub();

function cb1(data) {
  console.log("event1:", data);
}

function cb2(data) {
  console.log("event2:", data);
}

pubsub.subscribe("event1", cb1);
pubsub.subscribe("event2", cb2);

pubsub.publish("event1", "A");
pubsub.publish("event2", "B");

// Expected Output:
// event1: A
// event2: B
```

---

## ✅ Same Callback Multiple Times

```js
const pubsub = new PubSub();

function cb(data) {
  console.log("Called:", data);
}

pubsub.subscribe("event1", cb);
pubsub.subscribe("event1", cb);

pubsub.publish("event1", "Test");

// Expected Output (depends on implementation):
// Option 1 (allow duplicates):
// Called: Test
// Called: Test

// Option 2 (prevent duplicates):
// Called: Test
```

---

## ✅ Unsubscribe Non-existent Callback

```js
const pubsub = new PubSub();

function cb1(data) {
  console.log("cb1:", data);
}

function cb2(data) {}

pubsub.subscribe("event1", cb1);
pubsub.unsubscribe("event1", cb2);

pubsub.publish("event1", "Hello");

// Expected Output:
// cb1: Hello
```

---

## ✅ Unsubscribe Non-existent Event

```js
const pubsub = new PubSub();

function cb(data) {
  console.log(data);
}

pubsub.unsubscribe("eventX", cb); // should not crash
pubsub.publish("eventX", "Test");

// Expected Output:
// (nothing, no errors)
```

---

## ✅ Passing Complex Data

```js
const pubsub = new PubSub();

pubsub.subscribe("user", (data) => {
  console.log(data.name, data.age);
});

pubsub.publish("user", { name: "Akshat", age: 22 });

// Expected Output:
// Akshat 22
```

---

## 🔥 Edge Case (Important for Interviews)

### Subscriber modifies subscriptions during publish

```js
const pubsub = new PubSub();

function cb1(data) {
  console.log("cb1:", data);
  pubsub.unsubscribe("event1", cb2);
}

function cb2(data) {
  console.log("cb2:", data);
}

pubsub.subscribe("event1", cb1);
pubsub.subscribe("event1", cb2);

pubsub.publish("event1", "Test");

// Expected Output (ideal):
// cb1: Test
// cb2: Test
```

👉 Good implementations:

* Iterate over a **copy of subscribers list**
* Prevent mutation bugs during iteration

---

## 🚀 What Interviewers Actually Check

If you pass these, you're solid:

* ✅ Multiple subscribers
* ✅ Unsubscribe correctness
* ✅ No crash on edge cases
* ✅ Event isolation
* ✅ Mutation safety during publish

---

If you want next level:
I can give you **hidden tricky test cases interviewers use to break implementations** (these are 🔥 and most candidates fail).
