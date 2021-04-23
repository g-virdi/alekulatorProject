const hex = require('./js/hex.js');

/*Zu Beginn werden die einzelnen Funktionen auf Fehler getestet, um zu schauen, ob
die Kontrollfunktionen bereits da schon Fehler aufweisen. Am Ende wird der gesamte hexInputValidator
getestet, um zu schauen, ob alle Funktionen gemeinsam im hexInputValidator auch funktionieren*/

//Füge einer Hexadezimalzahl ein 0X hinzu
test('AB+CD equals 0XAB+0XCD', () => {
  expect(hex.hexaKorrigieren('AB+CD')).toBe('0XAB+0XCD');
});

test('12 equals 0X12', () => {
  expect(hex.hexaKorrigieren('12')).toBe('0X12');
});

test('AB/CD equals 0XAB/0XCD', () => {
  expect(hex.hexaKorrigieren('AB/CD')).toBe('0XAB/0XCD');
});

//Nach einer Hexadezimalzahl folgt eine geöffnete Klammer (Positiv und negativ Test)
test('10+A( equals true', () => {
  expect(hex.hexaCheckBrackets('10+A(')).toBe(true);
});

test('(fcde(78(+a+b))) equals true', () => {
  expect(hex.hexaCheckBrackets('78(+a+b)')).toBe(true);
});

test('(10*A) equals false', () => {
  expect(hex.hexaCheckBrackets('(10*A)')).toBe(false);
});

test('78+a+b)10+20) equals false', () => {
  expect(hex.hexaCheckBrackets('78+a+b)10+20)')).toBe(true);
});

//Füge ein Multiplikationszeichen zwischen )( und zwischen Hexadezimalzahl und (
test('(A+C)(10+10)(8+10) equals (A+C)*(10+10)*(8+10)', () => {
  expect(hex.hexaModifizieren('(A+C)(10+10)(8+10)')).toBe('(A+C)*(10+10)*(8+10)');
});

test('9(A+C)(10+10) equals 9*(A+C)*(10+10)', () => {
  expect(hex.hexaModifizieren('9(A+C)(10+10)')).toBe('9*(A+C)*(10+10)');
});

test('(2+2)9(A+C)(10+10) equals (2+2)*9*(A+C)*(10+10)', () => {
  expect(hex.hexaModifizieren('(2+2)*9(A+C)(10+10)')).toBe('(2+2)*9*(A+C)*(10+10)');
});

test('9+(A+C) equals 9+(A+C)', () => {
  expect(hex.hexaModifizieren('9+(A+C)')).toBe('9+(A+C)');
});
