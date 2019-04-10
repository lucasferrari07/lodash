/* eslint-disable no-restricted-syntax */
const _ = {
  map(iterable, callback) {
    const newIterable = [];
    for (const item of iterable) {
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
};

module.exports = _;
