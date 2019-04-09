const _ = require('../main');

describe('map', () => {
  test('returns an array with values from an input array multiplied by 2', () => {
    const input = [1, 2, 3, 4];
    const expectedOutput = input.map(item => item * 2);
    expect(_.map(input, item => item * 2)).toEqual(expectedOutput);
  });
});
