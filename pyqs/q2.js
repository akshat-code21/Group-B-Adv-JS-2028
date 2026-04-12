class PubSub {
  constructor() {
    // your code here
    this.eventMap = new Map();
  }

  subscribe(eventName, callback) {
    // your code here
    if (!this.eventMap.has(eventName))
      this.eventMap.set(eventName, new Array());
    this.eventMap.get(eventName).push(callback);
  }

  unsubscribe(eventName, callback) {
    // your code here
    let cbs = this.eventMap.get(eventName);
    if (!cbs || cbs.length === 0) {
      console.error("Event doesn't exist");
      return;
    }
    let filtered = cbs.filter((cb) => cb !== callback);
    this.eventMap.set(eventName, filtered);
  }

  publish(eventName, data) {
    // your code here
    let cbs = this.eventMap.get(eventName);
    if (!cbs || cbs.length === 0) {
      console.error("No publishers of the event");
      return;
    }
    cbs.forEach((cb) => {
      return cb(data);
    });
  }
}
