/*Die Enumeration dient später zum Vergleichscheck bei der Funktion setMode(m)*/
var mode = {
  binary: "bin",
  hexadecimal: "hex",
  decimal: "dec"
}

/*Die Funktion setMode(m) übergibt den jeweiligen Mode an die Funktion setValidator, die
später den richtigen display Validator und die richtigen checkMethoden auswählt.*/
function setMode(m) {
  if (m == mode.binary) {
    setValidator(m);
  } else if (m == mode.hexadecimal) {
    setValidator(m);
  } else if (m == mode.decimal) {
    setValidator(m);
  }
}

/*Die decCheck() Methode ist verantwortlich, für das Ausrechnen aller Decimalwerte.
Zu Beginn wird der Inhalt des Eingabefeldes an den dezimalen input Validator übergeben.
Wenn dieser true zurückgibt, wird erstmal kontrolliert, ob nach einer Zahl eine sich öffnende Klammer
folgt -> checkDecBrackets, oder ob eine sich schließende und danach öffnende folgt -> checkCloseOpenBrackets
Wenn eines dieser Fälle auftritt, wird ein Malzeichen eingefügt. Danach folgt das Ausrechnen durch die eval()
Funktion und wenn das Ergebnis Infinity ausgibt, soll nochmals eine Fehlermeldung angezeigt werden.
*/
function errorInInput() {
  if (readInput().includes("font")) {
    displayToastMessage("Fix your old error first");
  }
}

function emptyInput(){
  if (readInput() ==""){
    displayToastMessage("Leere Eingabe");
    return false;
  }
}

function decCheck() {
  var ausdruck = readInput();
  var ergebnis = 0;
  errorInInput();

  if (decInputValidator(ausdruck) === true) {
    ausdruck = decModifizieren(readInput());
    ergebnis = eval(ausdruck);
    ergebnis = (Math.round(ergebnis * 1000) / 1000);

    if (ergebnis == Infinity) { displayToastMessage("Teilen durch 0 nicht möglich!"); }
    else { writeOutput(ergebnis); }
  }

  if (decInputValidator(readInput()) === true) {
    var number1 = checkDecBrackets(readInput);

    if (number1 == true) {
      string = decModifizieren(string);
    }

    if (readInput() == "") {
      displayToastMessage("Das Eingabefeld ist leer!");
    } else {
      erg = eval(readInput());

      if (erg == Infinity) {

      } else {

        //Runden auf 3 Stellen nach dem Komma
        if (erg.toString().includes(".")) {
          number = erg;
          erg = (Math.round(number * 1000) / 1000);
        } else if (erg.toString().includes("font")) {
          displayToastMessage("Fix the old errors first");
        }

        writeOutput(erg);
      }
    }
  }
}

function binCheck() {
  errorInInput();
  var ausdruck = korrigieren(readInput()); //OB anhängen
  var ergebnis = 0;

  if (binInputValidator(ausdruck) === true) {
    ausdruck = binModifizieren(korrigieren(readInput()));
    ergebnis = eval(ausdruck);
    ergebnis = ergebnis.toString(2);
    ergebnis = RoundAfter3(ergebnis, 3, mode.binary);
    if (ergebnis == Infinity) { displayToastMessage("Teilen durch 0 nicht möglich!"); }
    else { writeOutput(ergebnis); }
  }
}

function hexCheck() {
  errorInInput();
  var ausdruck = hexaKorrigieren(readInput());
  var ergebnis = 0;

  if (hexInputValidator(ausdruck) === true) {
    ausdruck = hexaModifizieren(hexaKorrigieren(readInput()));
    ergebnis = eval(ausdruck);
    ergebnis = ergebnis.toString(16).toUpperCase();
    ergebnis = RoundAfter3(ergebnis, 3, mode.hexadecimal);
    if (ergebnis == "INFINITY") { displayToastMessage("Teilen durch 0 nicht möglich!"); }
    else { writeOutput(ergebnis); }
  }
}

//3 Nachkommastellen für Bin/Hex
function RoundAfter3(erg, digit, mode) {
  var index = 0;
  var patternRoundUp = /[8-F|8-f]/;
  var hex = false;
  var bin = false;
  var num;

  if (erg.includes('.')) {
    index = erg.indexOf(".");
    if (mode == "hex") {
      hex = patternRoundUp.test(erg.charAt(index + 4));
    }

    if (mode == "bin") {
      if (erg.charAt(index + 4) == "1") {
        bin = true;
      }
    }

    if (bin == true || hex == true) {
      num = String.fromCharCode(erg.charAt(index + 3).charCodeAt(0) + 1);
      erg = erg.slice(0, index + digit) + num;
    } else {
      erg = erg.slice(0, index+digit+1);

      if (erg == "INFINITY") {

      } else {
        writeOutput(erg);
      }
    }
  }

  return erg;
}
