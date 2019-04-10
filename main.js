/* eslint-disable no-restricted-syntax */
const _ = {
  map(iterable, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('\'callback\' argument should be a function');
    }
    const array = Array.isArray(iterable) ? iterable : Array.of(iterable);
    const newIterable = [];
    for (const item of array) {
      newIterable.push(callback(item));
    }
    return newIterable;
  },
  reduce(iterable, reducer, initialValue) {
    if (typeof reducer !== 'function') {
      throw new TypeError('\'reducer\' argument should be a function');
    }
    const array = Array.isArray(iterable) ? iterable : Array.of(iterable);
    const initialIndex = typeof initialValue === 'undefined' ? 1 : 0;
    let [accumulator] = typeof initialValue === 'undefined' ? array : [initialValue];
    for (const [currentIndex, currentValue] of array.entries()) {
      if (currentIndex >= initialIndex) {
        accumulator = reducer(accumulator, currentValue, currentIndex);
      }
    }
    return accumulator;
  },
  filter(iterable, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('\'callback\' argument should be a function');
    }
    const array = Array.isArray(iterable) ? iterable : Array.of(iterable);
    const newArray = [];
    for (const value of array) {
      if (callback(value)) {
        newArray.push(value);
      }
    }
    return newArray;
  },
};

module.exports = _;
