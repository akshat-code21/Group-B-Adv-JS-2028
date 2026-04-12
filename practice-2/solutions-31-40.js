// ============================================
// SOLUTIONS 31-40: Object Manipulation & Prototypes
// ============================================

// Problem 31: Flatten an Object
function flattenObject(obj, prefix = '', result = {}) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      const value = obj[key];

      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        flattenObject(value, newKey, result);
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

// Problem 32: Unflatten an Object
function unflattenObject(obj) {
  const result = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const keys = key.split('.');
      let current = result;

      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (!(k in current)) {
          current[k] = {};
        }
        current = current[k];
      }

      current[keys[keys.length - 1]] = obj[key];
    }
  }

  return result;
}

// Problem 33: Object Diff
function diffObjects(oldObj, newObj, prefix = '') {
  const differences = {};

  // Flatten both objects
  const flatOld = flattenObject(oldObj);
  const flatNew = flattenObject(newObj);

  // Get all unique keys
  const allKeys = new Set([...Object.keys(flatOld), ...Object.keys(flatNew)]);

  for (const key of allKeys) {
    const oldValue = flatOld[key];
    const newValue = flatNew[key];

    if (oldValue !== newValue) {
      differences[key] = {
        oldValue: oldValue === undefined ? 'NOT_PRESENT' : oldValue,
        newValue: newValue === undefined ? 'NOT_PRESENT' : newValue
      };
    }
  }

  return differences;
}

// Problem 34: Deep Merge Objects
function deepMerge(target, source) {
  const result = { ...target };

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      const sourceValue = source[key];
      const targetValue = result[key];

      if (
        sourceValue !== null &&
        typeof sourceValue === 'object' &&
        !Array.isArray(sourceValue) &&
        targetValue !== null &&
        typeof targetValue === 'object' &&
        !Array.isArray(targetValue)
      ) {
        result[key] = deepMerge(targetValue, sourceValue);
      } else {
        // For arrays and primitives, replace with source value
        result[key] = sourceValue;
      }
    }
  }

  return result;
}

// Problem 35: Implement pick(obj, keys)
function pick(obj, keys) {
  const result = {};

  for (const key of keys) {
    // Support nested paths like 'user.name'
    if (key.includes('.')) {
      const parts = key.split('.');
      let value = obj;
      let valid = true;

      for (const part of parts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          valid = false;
          break;
        }
      }

      if (valid) {
        // Reconstruct nested structure
        const unflatted = unflattenObject({ [key]: value });
        Object.assign(result, unflatted);
      }
    } else {
      if (key in obj) {
        result[key] = obj[key];
      }
    }
  }

  return result;
}

// Problem 36: Implement omit(obj, keys)
function omit(obj, keys) {
  const result = { ...obj };
  const keysSet = new Set(keys);

  for (const key of keysSet) {
    // Support nested paths
    if (key.includes('.')) {
      const parts = key.split('.');
      let current = result;

      for (let i = 0; i < parts.length - 1; i++) {
        if (current && typeof current === 'object') {
          current = current[parts[i]];
        } else {
          break;
        }
      }

      if (current && typeof current === 'object') {
        delete current[parts[parts.length - 1]];
      }
    } else {
      delete result[key];
    }
  }

  return result;
}

// Problem 37: Implement the new Operator
function myNew(Constructor, ...args) {
  // Create new object with Constructor's prototype
  const obj = Object.create(Constructor.prototype);

  // Call constructor with new object as 'this'
  const result = Constructor.apply(obj, args);

  // If constructor returns an object, use that; otherwise use created object
  return (result !== null && typeof result === 'object') ? result : obj;
}

// Problem 38: Manual Prototypal Inheritance
function inherit(Child, Parent) {
  // Set up prototype chain
  Child.prototype = Object.create(Parent.prototype);
  
  // Reset constructor reference
  Child.prototype.constructor = Child;
}

// Example usage:
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

inherit(Dog, Animal);

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

// Problem 39: Prototype Lookup Reasoning
/*
Given code:
function A() {}
A.prototype.x = 10;

const a = new A();
delete a.x;
console.log(a.x);

Answers:
1. Output: 10

2. Why:
   - 'a' doesn't have own property 'x'
   - delete a.x attempts to delete own property, which doesn't exist
   - JavaScript looks up prototype chain and finds x on A.prototype
   - Therefore, a.x returns 10

3. If a.x = 20 before deletion:
   - a now has own property x with value 20
   - delete a.x removes the own property
   - Lookup falls back to A.prototype.x which is 10
   - Output: 10

4. If delete A.prototype.x:
   - This removes x from A.prototype
   - a.x would be undefined
   - Output: undefined
*/

function demonstratePrototypeLookup() {
  function A() {}
  A.prototype.x = 10;

  const a = new A();
  console.log('Before delete:', a.x); // 10
  
  delete a.x;
  console.log('After delete a.x:', a.x); // 10 (from prototype)

  a.x = 20;
  console.log('After a.x = 20:', a.x); // 20
  
  delete a.x;
  console.log('After delete a.x again:', a.x); // 10 (from prototype)

  delete A.prototype.x;
  console.log('After delete A.prototype.x:', a.x); // undefined
}

// Problem 40: Class-Based Inheritance with Mixins
class Vehicle {
  constructor(name) {
    this.name = name;
  }

  move() {
    return `${this.name} is moving`;
  }
}

// Mixin functions
const canFly = {
  fly() {
    return `${this.name} is flying through the air`;
  },
  
  land() {
    return `${this.name} is landing`;
  }
};

const canSail = {
  sail() {
    return `${this.name} is sailing on water`;
  },
  
  dock() {
    return `${this.name} is docking`;
  }
};

// Helper to apply mixins
function applyMixins(targetClass, ...mixins) {
  mixins.forEach(mixin => {
    Object.getOwnPropertyNames(mixin).forEach(name => {
      targetClass.prototype[name] = mixin[name];
    });
  });
}

class Plane extends Vehicle {
  constructor(name, model) {
    super(name);
    this.model = model;
  }
}

class Boat extends Vehicle {
  constructor(name, length) {
    super(name);
    this.length = length;
  }
}

class AmphibiousVehicle extends Vehicle {
  constructor(name) {
    super(name);
  }
}

// Apply mixins
applyMixins(Plane, canFly);
applyMixins(Boat, canSail);
applyMixins(AmphibiousVehicle, canFly, canSail);

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    flattenObject,
    unflattenObject,
    diffObjects,
    deepMerge,
    pick,
    omit,
    myNew,
    inherit,
    demonstratePrototypeLookup,
    Vehicle,
    canFly,
    canSail,
    applyMixins,
    Plane,
    Boat,
    AmphibiousVehicle
  };
}
