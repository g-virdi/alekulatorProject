const valRules = require('./js/ValidatorRules.js');


//Alte Tests enthalten einen positiven und negativen Test
//Richtige Klammersetzung, wenn die Klammern nicht richtig gesetzt sind, wird false zurückgegeben
test('((A+1)+(B-C))/(10+2)) equals false', () => {
  expect(valRules.bracketsCheck('((A+1)+(B-C))/(10+2))')).toBe(20);
});

test('((B*C)/(A+1)+(7-8)) equals true', () => {
  expect(valRules.bracketsCheck('((B*C)/(A+1)+(7-8))')).toBe(-1);
});

//Leere Klammern, wenn leere Klammern vorhanden sind, gebe true aus
test('A+1+() equals true', () => {
  expect(valRules.emptyBrackets('A+1+()')).toBe(true);
});

test('()() equals true', () => {
  expect(valRules.emptyBrackets('()()')).toBe(true);
});

test('(56+CDF) equals false', () => {
  expect(valRules.emptyBrackets('(56+CDF)')).toBe(false);
});

//Mehrere Operatoren hintereinander, wenn dies Eintritt gebe true zurück
test('A+-/1 equals true', () => {
  expect(valRules.operators('A+-/1')).toBe(2);
});

test('ABC++10 equals true', () => {
  expect(valRules.operators('ABC++10')).toBe(-1);
});

test('ABC+10 equals false', () => {
  expect(valRules.operators('ABC+10')).toBe(-1);
});

//Wenn nach einem Operator ), . oder nichts steht, gebe false zurück
test('(A+)+20+(10+10) equals false', () => {
  expect(valRules.afteroperator('(A+)+20+(10+10)')).toBe(false);
});

test('10+A+.+2 equals false', () => {
  expect(valRules.afteroperator('10+A+.+2')).toBe(false);
});

test('A+ equals false', () => {
  expect(valRules.afteroperator('A+')).toBe(false);
});

test('A+(10+19) equals true', () => {
  expect(valRules.afteroperator('A+(10+19)')).toBe(true);
});

test('A+10+2 equals true', () => {
  expect(valRules.afteroperator('A+10+2')).toBe(true);
});

//Wenn zu Begin *, /, oder ), gebe true zurück
test('/A equals true', () => {
  expect(valRules.beginning('/A')).toBe(0);
});

test('*1 equals true', () => {
  expect(valRules.beginning('*1')).toBe(0);
});

test(')10 equals true', () => {
  expect(valRules.beginning(')10')).toBe(0);
});

test('+10-F equals false', () => {
  expect(valRules.beginning('+10-F')).toBe(-1);
});

test('-10-B+34 equals false', () => {
  expect(valRules.beginning('-10-B+34')).toBe(-1);
});

test('(10-B+34) equals false', () => {
  expect(valRules.beginning('(10-B+34)')).toBe(-1);
});

//Leere Klammer löschen
test('A+1() equals A+1', () => {
  expect(valRules.removeEmpty('A+1()')).toBe('A+1');
});

test('A()+1() equals A+1', () => {
  expect(valRules.removeEmpty('A()+1()')).toBe('A+1');
});

test('1+-/4 equals true', () => {
  expect(valRules.operators('1+-/4')).toBe(2);
});

test('1++4 equals true', () => {
  expect(valRules.operators('1++4')).toBe(-1);
});

test('1+4 equals false', () => {
  expect(valRules.operators('1+4')).toBe(-1);
});


//Wenn nach einem Operator ), . oder nichts steht, gebe false zurück

test('(4+)+20+(10+10) equals false', () => {
  expect(valRules.afteroperator('(4+)+20+(10+10)')).toBe(false);
});

test('10+4+.+2 equals false', () => {
  expect(valRules.afteroperator('10+4+.+2')).toBe(false);
});

test('4+ equals false', () => {
  expect(valRules.afteroperator('4+')).toBe(false);
});

test('4+(10+3) equals true', () => {
  expect(valRules.afteroperator('4+(10+3)')).toBe(true);
});

test('4+10+2 equals true', () => {
  expect(valRules.afteroperator('4+10+2')).toBe(true);
});


//Wenn zu Begin *, /, oder ), gebe true zurück

test('/4 equals true', () => {
  expect(valRules.beginning('/4')).toBe(0);
});

test('*4 equals true', () => {
  expect(valRules.beginning('*4')).toBe(0);
});

test(')6 equals true', () => {
  expect(valRules.beginning(')6')).toBe(0);
});

test('+6-3 equals false', () => {
  expect(valRules.beginning('+6-3')).toBe(-1);
});

test('-10-5+4 equals false', () => {
  expect(valRules.beginning('-10-5+4')).toBe(-1);
});

test('(10-6+4) equals false', () => {
  expect(valRules.beginning('(10-6+4)')).toBe(-1);
});

//Überprüft, ob die Klammern leer sind

  test('adds () equals true', () =>{
  expect(valRules.emptyBrackets('()')).toBe(true);
});

 //Überprüft, ob die Klammeranzahl stimmt

  test('adds ((((()))) equals false', () =>{
  expect(valRules.bracketsCheck('((((())))')).toBe(0);
});
  test('adds ((())) equals true', () =>{
  expect(valRules.bracketsCheck('((()))')).toBe(-1);
});

/*-----------------------------------------------------------------------------*/

test('AF*(4532929)/A*(3443344)(482938) equals false', () => {
  expect(valRules.checkBracketsOrder('AF*(4532929)/A*(3443344)(482938)')).toBe(-1);
});

test('(123)(123) equals false', () => {
  expect(valRules.checkBracketsOrder('(123)(123)')).toBe(-1);
});

test('123))((123 equals true', () => {
  expect(valRules.checkBracketsOrder('123))((123')).toBe(0);
});

test('123)123)(123(123 equals true', () => {
  expect(valRules.checkBracketsOrder('123)123)(123(123')).toBe(0);
});

//Überprüft, ob ++ oder -- hintereinander stehen
test('(10--10++10)--10++10 equals false', () => {
  expect(valRules.checkDoublePlusMinus('(10--10++10)--10++10')).toBe(false);
});

test('A+1--1 equals false', () => {
  expect(valRules.checkDoublePlusMinus('A+1--1')).toBe(false);
});

test('(10--10++10)--10++10 equals false', () => {
  expect(valRules.checkDoublePlusMinus('(10--10++10)--10++10')).toBe(false);
});

test('C+1-1 equals false', () => {
  expect(valRules.checkDoublePlusMinus('C+1-1')).toBe(true);
});

//++ und -- werden ersetzt
test('(A++1--(1++1)(1++2)) equals (A+1+(1+1)(1+2))', () => {
  expect(valRules.doublePlusMinus('(A++1--(1++1)(1++2))')).toBe('(A+1+(1+1)(1+2))');
});

test('10--10++10/--10++10 equals 10+10+10/+10+10', () => {
  expect(valRules.doublePlusMinus('10--10++10/--10++10')).toBe('10+10+10/+10+10');
});

test('(A++1)*--B++1 equals (A+1)*+B+1', () => {
  expect(valRules.doublePlusMinus('(A++1)*--B++1')).toBe('(A+1)*+B+1');
});
