const dec = require('./js/dec.js');

test('123.123*(45/3)2 to 123.123*(45/3)*2', () => {
  expect(dec.decModifizieren('123.123*(45/3)2')).toBe('123.123*(45/3)*2');
});

test('24(0) to 24*(0)', () => {
  expect(dec.decModifizieren('24(0)')).toBe('24*(0)');
});
