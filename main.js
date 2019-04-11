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
  max(iterable) {
    const getLargest = (a, b) => (a > b ? a : b);
    const array = Array.isArray(iterable) ? iterable : Array.of(iterable);
    let currentLargest = array.shift();
    for (const value of array) {
      currentLargest = getLargest(currentLargest, value);
    }
    return currentLargest;
  },
  min(iterable) {
    const getSmallest = (a, b) => (a < b ? a : b);
    const array = Array.isArray(iterable) ? iterable : Array.of(iterable);
    let currentSmallest = array.shift();
    for (const value of array) {
      currentSmallest = getSmallest(currentSmallest, value);
    }
    return currentSmallest;
  },
  sortBy(iterable, fn) {
    if (typeof fn !== 'function') {
      throw new TypeError('\'fn\' argument should be a function');
    }
    const array = Array.isArray(iterable) ? iterable : Array.of(iterable);
    const merge = (leftHalf, rightHalf) => {
      const sortedArray = [];
      while (leftHalf.length > 0 && rightHalf.length > 0) {
        if (fn(leftHalf[0]) <= fn(rightHalf[0])) {
          sortedArray.push(leftHalf.shift());
        } else {
          sortedArray.push(rightHalf.shift());
        }
      }
      while (leftHalf.length > 0) sortedArray.push(leftHalf.shift());
      while (rightHalf.length > 0) sortedArray.push(rightHalf.shift());
      return sortedArray;
    };
    const mergesort = (sortable) => {
      if (sortable.length < 2) {
        return sortable;
      }
      const midpoint = Math.floor(sortable.length / 2);
      const leftHalf = sortable.slice(0, midpoint);
      const rightHalf = sortable.slice(midpoint, sortable.length);
      return merge(mergesort(leftHalf), mergesort(rightHalf));
    };
    return mergesort(array);
  },
};

module.exports = _;
