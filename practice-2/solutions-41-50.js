// ============================================
// SOLUTIONS 41-50: Design Patterns & Advanced Data Structures
// ============================================

// Problem 41: Method Overriding and super Simulation (Without class)
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name) {
  Animal.call(this, name); // Call parent constructor
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override speak with manual super call
Dog.prototype.speak = function() {
  // Manually call parent method
  const parentResult = Animal.prototype.speak.call(this);
  return parentResult + ' and barks!';
};

// Problem 42: Singleton Pattern
// Function-based Singleton
const ConfigManager = (function() {
  let instance;

  function createInstance() {
    const config = {};
    
    return {
      get(key) {
        return config[key];
      },
      
      set(key, value) {
        config[key] = value;
      },
      
      getAll() {
        return { ...config };
      }
    };
  }

  return {
    getInstance() {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    }
  };
})();

// Class-based Singleton
class ConfigManagerClass {
  constructor() {
    if (ConfigManagerClass.instance) {
      return ConfigManagerClass.instance;
    }
    
    this.config = {};
    ConfigManagerClass.instance = this;
  }

  get(key) {
    return this.config[key];
  }

  set(key, value) {
    this.config[key] = value;
  }

  getAll() {
    return { ...this.config };
  }
}

// Problem 43: Factory Pattern
function createUser(type, data) {
  class User {
    constructor(data) {
      this.name = data.name;
      this.email = data.email;
    }

    login() {
      return `${this.name} logged in`;
    }
  }

  class Admin extends User {
    constructor(data) {
      super(data);
      this.role = 'admin';
    }

    deleteUser(userId) {
      return `Admin ${this.name} deleted user ${userId}`;
    }

    viewLogs() {
      return `Admin ${this.name} viewing system logs`;
    }
  }

  class Customer extends User {
    constructor(data) {
      super(data);
      this.role = 'customer';
      this.cart = [];
    }

    addToCart(item) {
      this.cart.push(item);
      return `Added ${item} to cart`;
    }

    checkout() {
      return `Customer ${this.name} checking out with ${this.cart.length} items`;
    }
  }

  class Moderator extends User {
    constructor(data) {
      super(data);
      this.role = 'moderator';
    }

    banUser(userId) {
      return `Moderator ${this.name} banned user ${userId}`;
    }

    reviewContent(contentId) {
      return `Moderator ${this.name} reviewing content ${contentId}`;
    }
  }

  const userTypes = {
    admin: Admin,
    customer: Customer,
    moderator: Moderator
  };

  const UserClass = userTypes[type];
  
  if (!UserClass) {
    throw new Error(`Unknown user type: ${type}`);
  }

  return new UserClass(data);
}

// Problem 44: Observer Pattern
class Observable {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
    
    // Return unsubscribe function
    return () => {
      this.unsubscribe(listener);
    };
  }

  unsubscribe(listener) {
    const index = this.listeners.indexOf(listener);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }

  notify(data) {
    this.listeners.forEach(listener => {
      listener(data);
    });
  }
}

// Problem 45: Build Your Own EventEmitter
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  off(event, listener) {
    if (!this.events[event]) return;

    const index = this.events[event].indexOf(listener);
    if (index > -1) {
      this.events[event].splice(index, 1);
    }
  }

  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach(listener => {
      listener(...args);
    });
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener(...args);
      this.off(event, onceWrapper);
    };
    
    this.on(event, onceWrapper);
  }
}

// Problem 46: Pub-Sub System
class PubSub {
  constructor() {
    this.topics = {};
  }

  subscribe(topic, listener) {
    if (!this.topics[topic]) {
      this.topics[topic] = [];
    }
    
    this.topics[topic].push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.topics[topic].indexOf(listener);
      if (index > -1) {
        this.topics[topic].splice(index, 1);
      }
    };
  }

  publish(topic, payload) {
    if (!this.topics[topic]) return;

    this.topics[topic].forEach(listener => {
      listener(payload);
    });
  }
}

// Problem 47: Implement an LRU Cache
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) {
      return -1;
    }

    // Move to end (most recent)
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    
    return value;
  }

  put(key, value) {
    // If key exists, delete it first
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Add new entry
    this.cache.set(key, value);

    // Check capacity and evict LRU if needed
    if (this.cache.size > this.capacity) {
      // First key in Map is the least recently used
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

// Problem 48: Priority-Based Task Scheduler
class TaskScheduler {
  constructor() {
    this.tasks = [];
  }

  add(taskFn, priority) {
    this.tasks.push({ taskFn, priority });
    
    // Sort by priority (higher first), maintain insertion order for same priority
    this.tasks.sort((a, b) => b.priority - a.priority);
  }

  async runNext() {
    if (this.tasks.length === 0) {
      return null;
    }

    const { taskFn } = this.tasks.shift();
    return await taskFn();
  }

  async runAll() {
    const results = [];
    
    while (this.tasks.length > 0) {
      const result = await this.runNext();
      results.push(result);
    }
    
    return results;
  }
}

// Problem 49: Flatten a Deeply Nested Array
// Recursive solution
function flattenArray(arr) {
  const result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

// Iterative stack-based solution
function flattenArrayIterative(arr) {
  const stack = [...arr];
  const result = [];

  while (stack.length > 0) {
    const item = stack.pop();

    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }

  return result;
}

// Problem 50: Implement groupBy
function groupBy(items, keyOrFn) {
  const result = {};

  for (const item of items) {
    let key;

    if (typeof keyOrFn === 'function') {
      key = keyOrFn(item);
    } else if (typeof keyOrFn === 'string') {
      key = item[keyOrFn];
    } else {
      throw new Error('keyOrFn must be a string or function');
    }

    // Convert key to string for object property
    const groupKey = String(key);

    if (!result[groupKey]) {
      result[groupKey] = [];
    }

    result[groupKey].push(item);
  }

  return result;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Animal,
    Dog,
    ConfigManager,
    ConfigManagerClass,
    createUser,
    Observable,
    EventEmitter,
    PubSub,
    LRUCache,
    TaskScheduler,
    flattenArray,
    flattenArrayIterative,
    groupBy
  };
}
