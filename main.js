/* eslint-disable no-restricted-syntax */
const _ = {
  map(iterable, callback) {
    const newIterable = [];
    for (const item of iterable) {
      newIterable.push(callback(item));
    }
    return newIterable;
  },
};

// eslint-disable-next-line import/prefer-default-export
module.exports = _;
