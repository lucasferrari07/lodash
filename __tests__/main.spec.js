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
    const input = [10, 2, 3, 4, 5];
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

describe('filter', () => {
  test('filters an array of numbers by only even', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const expectedOutput = [2, 4, 6];
    expect(_.filter(input, num => num % 2 === 0)).toEqual(expectedOutput);
  });
  test('filters an array of numbers by only greater than 3', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const expectedOutput = [4, 5, 6];
    expect(_.filter(input, num => num > 3)).toEqual(expectedOutput);
  });
  test('filters an array of words by only longer than 3 characters', () => {
    const input = ['one', 'two', 'three', 'four'];
    const expectedOutput = ['three', 'four'];
    expect(_.filter(input, str => str.length > 3)).toEqual(expectedOutput);
  });
  test('returns an empty array if an empty array is given', () => {
    const input = [];
    const expectedOutput = [];
    expect(_.filter(input, val => typeof val !== 'undefined')).toEqual(expectedOutput);
  });
  test('if input is not an array, converts it into one and apply filter', () => {
    const input = 1;
    const expectedOutput = [];
    expect(_.filter(input, val => val > 1)).toEqual(expectedOutput);
  });
});

describe('max', () => {
  test('returns the largest element in the input array', () => {
    const input = ['tyrannosaurus', 5, 6, 10];
    const expectedOutput = 10;
    expect(_.max(input)).toEqual(expectedOutput);
  });
  test('returns undefined if the input is an empty array', () => {
    const input = [];
    const expectedOutput = undefined;
    expect(_.max(input)).toEqual(expectedOutput);
  });
});

describe('min', () => {
  test('returns the smallest element in the input array', () => {
    const input = ['tyrannosaurus', 5, 6, 10];
    const expectedOutput = 5;
    expect(_.min(input)).toEqual(expectedOutput);
  });
});

describe('maxBy', () => {
  test('returns the largest element in the input array', () => {
    const input = ['120292', '5', '622', '10'];
    const fn = x => x.length;
    const expectedOutput = '120292';
    expect(_.maxBy(input, fn)).toEqual(expectedOutput);
  });
});

describe('minBy', () => {
  test('returns the smallest element in the input array', () => {
    const input = ['tyrannosaurus', '5', '622', '10'];
    const fn = x => x.length;
    const expectedOutput = '5';
    expect(_.minBy(input, fn)).toEqual(expectedOutput);
  });
});

describe('reject', () => {
  test('filters an array of numbers by only not even', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const expectedOutput = [1, 3, 5];
    expect(_.reject(input, num => num % 2 === 0)).toEqual(expectedOutput);
  });
  test('filters an array of numbers by only less than 4', () => {
    const input = [1, 2, 3, 4, 5, 6];
    const expectedOutput = [1, 2, 3];
    expect(_.reject(input, num => num > 3)).toEqual(expectedOutput);
  });
  test('filters an array of words by only shorter than 4 characters', () => {
    const input = ['one', 'two', 'three', 'four'];
    const expectedOutput = ['one', 'two'];
    expect(_.reject(input, str => str.length > 3)).toEqual(expectedOutput);
  });
});

describe('all', () => {
  test('validates if all numbers are even', () => {
    const input = [9, 5, 4, 2, 3, 1, 7, 6, 8];
    expect(_.all(input, x => x % 2 === 0)).toEqual(false);
  });
  test('validates if all words are longer than 3 characters', () => {
    const input = ['Hello', 'There', 'General', 'Kenobi'];
    expect(_.all(input, x => x.length > 3)).toEqual(true);
  });
});

describe('any', () => {
  test('validates if at least one number is even', () => {
    const input = [9, 5, 4, 2, 3, 1, 7, 6, 8];
    expect(_.any(input, x => x % 2 === 0)).toEqual(true);
  });
  test('validates if at least one word is longer than 10 characters', () => {
    const input = ['It\'s', 'over', 'Anakin', 'I', 'have', 'the', 'high', 'ground'];
    expect(_.any(input, x => x.length > 10)).toEqual(false);
  });
});

describe('sortBy', () => {
  test('sorts an array by listing first the evens and then the odds', () => {
    const input = [9, 5, 4, 2, 3, 1, 7, 6, 8];
    const expectedOutput = [4, 2, 6, 8, 9, 5, 3, 1, 7];
    expect(_.sortBy(input, x => x % 2)).toEqual(expectedOutput);
  });
  test('throws an error if fn argument is not a function', () => {
    const input = 1;
    expect(() => _.sortBy([], input)).toThrow(TypeError);
  });
});
