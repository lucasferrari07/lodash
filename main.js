const is = type => obj => (obj instanceof type);
const isFunction = is(Function);
const _ = {
  appendWith: fn => (arr, item) => {
    arr.push(fn(item));
    return arr;
  },
  appendIf: fn => (arr, item) => {
    if (fn(item)) {
      arr.push(item);
    }
    return arr;
  },
  map(iterable, callback) {
    return this.reduce(iterable, this.appendWith(callback), []);
  },
  reduce(iterable, callback, initialValue) {
    if (!isFunction(callback)) {
      throw new TypeError('\'callback\' argument should be a function');
    }
    const array = Array.isArray(iterable) ? iterable : Array.of(iterable);
    const entries = array.entries();
    let accumulator = typeof initialValue === 'undefined' ? entries.next().value[1] : initialValue;
    // eslint-disable-next-line no-restricted-syntax
    for (const [currentIndex, currentValue] of entries) {
      accumulator = callback(accumulator, currentValue, currentIndex);
    }
    return accumulator;
  },
  filter(iterable, callback) {
    return this.reduce(iterable, this.appendIf(callback), []);
  },
  max(iterable) {
    const getLargest = (a, b) => (a > b ? a : b);
    return this.reduce(iterable, getLargest);
  },
  min(iterable) {
    const getSmallest = (a, b) => (a < b ? a : b);
    return this.reduce(iterable, getSmallest);
  },
  sortBy(iterable, fn) {
    if (!isFunction(fn)) {
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
