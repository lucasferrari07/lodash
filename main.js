const is = type => obj => (obj instanceof type);
const isFunction = is(Function);
const isEmptyArray = val => Array.isArray(val) && val.length === 0;
const largerOfWith = fn => (a, b) => (fn(a) > fn(b) ? a : b);
const largerOf = largerOfWith(x => x);
const smallerOfWith = fn => (a, b) => (fn(a) < fn(b) ? a : b);
const smallerOf = smallerOfWith(x => x);
const appendWith = fn => (arr, item) => {
  arr.push(fn(item));
  return arr;
};
const appendIf = fn => (arr, item) => {
  if (fn(item)) {
    arr.push(item);
  }
  return arr;
};
const _ = {
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
  map(iterable, callback) {
    return this.reduce(iterable, appendWith(callback), []);
  },
  filter(iterable, callback) {
    return this.reduce(iterable, appendIf(callback), []);
  },
  max(iterable) {
    if (isEmptyArray(iterable)) {
      return undefined;
    }
    return this.reduce(iterable, largerOf);
  },
  min(iterable) {
    if (isEmptyArray(iterable)) {
      return undefined;
    }
    return this.reduce(iterable, smallerOf);
  },
  maxBy(iterable, fn) {
    if (isEmptyArray(iterable)) {
      return undefined;
    }
    return this.reduce(iterable, largerOfWith(fn));
  },
  minBy(iterable, fn) {
    if (isEmptyArray(iterable)) {
      return undefined;
    }
    return this.reduce(iterable, smallerOfWith(fn));
  },
  reject(iterable, callback) {
    return this.filter(iterable, val => !callback(val));
  },
  all(iterable, fn) {
    return this.reduce(iterable, (a, b) => a && fn(b), true);
  },
  any(iterable, fn) {
    return this.reduce(iterable, (a, b) => a || fn(b), false);
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
