const bin = require('./js/bin.js');

//Alte Tests enthalten einen positiven und negativen Test
//Korriegiere alle binären Zahlen denen die 0B-Marker fehlt
test('101010101 to 0B101010101', () => {
  expect(bin.korrigieren('101010101')).toBe('0B101010101');
});

test('(1010*011)+(1)-(0)*(011/11) to (0B1010*0B011)+(0B1)-(0B0)*(0B011/0B11)', () => {
  expect(bin.korrigieren('(1010*011)+(1)-(0)*(011/11)')).toBe('(0B1010*0B011)+(0B1)-(0B0)*(0B011/0B11)');
});

//Gebe true zurück wenn nach einer Zahl eine sich öffnende Klammer folgt
test('01010( equals true', () => {
  expect(bin.checkBinBrackets('01010(')).toBe(0);
});

test('(01010+0101)*(0101010*010100) equals false)', () => {
  expect(bin.checkBinBrackets('(01010+0101)*(0101010*010100)')).toBe(-1);
});

test('01010(01010+0101) to 01010*(01010+0101)', () => {
  expect(bin.binModifizieren('01010(01010+0101)11111')).toBe('01010*(01010+0101)*11111');
});

test('(100)100 to (100)*100', () => {
  expect(bin.binModifizieren('(100)100')).toBe('(100)*100');
});

test('(01010+0101)*(0101010*010100) to (no change))', () => {
  expect(bin.binModifizieren('(01010+0101)*(0101010*010100)')).toBe('(01010+0101)*(0101010*010100)');
});

test('(01010+0101)*(0101010*010100) to (no change))', () => {
  expect(bin.binModifizieren('(01010+0101)*(0101010*010100)')).toBe('(01010+0101)*(0101010*010100)');
});
