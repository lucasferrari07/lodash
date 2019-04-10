const _ = require('../main');

describe('map', () => {
  test('returns an array with values from an input array multiplied by 2', () => {
    const input = [1, 2, 3, 4];
    const expectedOutput = input.map(item => item * 2);
    expect(_.map(input, item => item * 2)).toEqual(expectedOutput);
  });
});

describe('reduce', () => {
  test('reduces an array of numbers by adding the values', () => {
    const input = [1, 2, 3, 4, 5];
    const sum = (a, b) => a + b;
    const expectedOutput = input.reduce(sum);
    expect(_.reduce(input, sum)).toEqual(expectedOutput);
  });
  test('reduces an array of numbers by adding it\'s values multiplied by their indexes, with an initial value set', () => {
    const input = [1, 2, 3, 4, 5];
    const sum = (a, b, i) => a + b * i;
    const expectedOutput = input.reduce(sum, 5);
    expect(_.reduce(input, sum, 5)).toEqual(expectedOutput);
  });
  test('reduces an array of letters to a Map counting the letters', () => {
    const input = ['a', 'b', 'c', 'd', 'a', 'c', 'b', 'a', 'c', 'c'];
    const letterCounter = (map, a) => {
      if (map.has(a)) {
        map.set(a, map.get(a) + 1);
      } else {
        map.set(a, 1);
      }
      return map;
    };
    const expectedOutput = input.reduce(letterCounter, new Map());
    expect(_.reduce(input, letterCounter, new Map())).toEqual(expectedOutput);
  });
  test('throws an error if reducer argument is not a function', () => {
    const input = 1;
    expect(() => _.reduce([], input)).toThrow(TypeError);
  });
});
