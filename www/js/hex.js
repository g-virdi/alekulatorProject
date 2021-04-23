/*Der hexadezimale DisplayValidator sorgt dafür, dass im Inputfeld nur die Hexadezimalzahlen, Operatoren und die Klammern vom
User eingetippt werden können. Alles andere wird durch evt.preventDefault() verhindert*/
function hexDisplayValidator(evt) {
  changeColorBlack();
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode === 13) {
    evt.preventDefault();
    document.getElementById("equal").click();
  }

  charCode = String.fromCharCode(charCode);

  var patt = /[0-F|+|\-|*|/|(|)|a-f]/;
  var forbidden = /[@|\||:|;|>|<|?|=|\.]/;

  var c = patt.test(charCode);
  var f = forbidden.test(charCode);
  if (c === false || f === true) {
    evt.preventDefault();
  }
}

//Paste event fürs Hexadezimalsystem
function hexPaste(event) {
  var inputText = event.clipboardData.getData('Text');
  var fail = 0;
  var i = 0;

  for (i = 0; i < inputText.length; i++) {
    if (!((inputText.charAt(i) >= '0' && inputText.charAt(i) <= '9') || (inputText.charAt(i) >= 'A' && inputText.charAt(i) <= 'F') || (inputText.charAt(i) >= 'a' && inputText.charAt(i) <= 'f') || (inputText.charAt(i) == '+') || (inputText.charAt(i) == '-') ||
      (inputText.charAt(i) == '/') || (inputText.charAt(i) == '*') || (inputText.charAt(i) == ')') || (inputText.charAt(i) == '('))) {
      fail = 1;
      break;
    }
  }

  if (fail == 1) {
    displayToastMessage("Es dürfen per Paste nur Hexzahlen, die Operatoren +, -, *, / und die Klammern übergeben werden!");
    event.preventDefault();
    return false;
  } else {
    return true;
  }
}

/*Die Funktion ist dafür verantwortlich, dass sie an die Hexadezimalzahl ein 0X dranhängt, damit die eval()
Funktion diese berechnen kann.Solange hex.test(c) true zurückgibt und number false ist, handelt es sich
um eine Hexadezimalzahl von 0-F und ein 0X wird drangehängt = 0X[0-F]. Ist das eingetreten wird, wenn
wieder eine Hexaddezimalzahl von 0-F eingetippt wird an 0X[0-F] nochmals [0-F] drangehängt = 0X[0-F][0-F]...
Wenn hex.test(c) false returned und number true returned, bedeutet dass nach 0X[0-F]... ein Operator oder Klammern folgt und an
0X[0-F]... drangehängt wird = 0X[0-F][+/-/* und geteilt oder ()].
*/
function hexaKorrigieren(string) {
  var extra = "0X";
  var hex = /[0-F|X|a-f]/;
  var neo = "";

  var number = false;

  for (i = 0; i < string.length; i++) {
    var c = string.charAt(i);
    if (hex.test(c) && number == false) {
      neo = neo + extra + c;
      number = true;
    }
    else if (!hex.test(c) && number == true) {
      neo = neo + c;
      number = false;
    }

    else if (hex.test(c) && number == true) {
      neo = neo + c;
    }

    else if (!hex.test(c) && number == false) {
      neo = neo + c;
    }

  }
  return neo;
}

//Überprüft, ob nach Hexadezimal eine geöffnete Klammer folgt, wird für das einfügen eines Multilikationszeichen wichtig
function hexaCheckBrackets(string) {
  var patt = /([0-F|a-f]+[\(]|[\)][0-F|a-f]+)/

  var c = patt.test(string);

  return c;
}

/*Der Modifizierer ist dafür zuständig ein Malzeichen zwischen einer Hexadezimalzahl und einer geöffneten Klammer
oder sich schließenden und öffnenden Klammer hinzuzufügen.*/
function hexaModifizieren(string) {
  var binaryPattern = /[0-F|a-f]/;

  var neo = string.charAt(0);
  var zusatz = "*";

  for (i = 1; i < string.length; i++) {
    var b = string.charAt(i);
    var a = string.charAt(i - 1);
    if ((binaryPattern.test(a) && b == "(") || (a == ")" && b == "(")) {
      neo = neo + zusatz + b;
    }

    else if (binaryPattern.test(b) && a == ")") {
      neo = neo + zusatz + b;
    }

    else { neo = neo + b }
  }
  return neo;
}

/*Hier werden die Kontrollfunktionen aufgerufen und wenn ein Fehler auftaucht, false zurückgegeben
und eine Fehlermeldung ausgegeben*/
function hexInputValidator(string) {
  if (readInput().includes("font")){
    return false;
  }
  emptyInput();

  let toasts = [];
  var message1 = "";
  var message2 = "";
  let toastCount = 0;

  var j = emptyBrackets(string);
  if(j == true) {toasts.push("Keine leeren Klammer eingeben"); string = removeEmpty(string); writeOutput(removePrefix(string)); waitBetweenToast(toasts);}

  var e = emptyString(string);
  if (e == true) { toasts.push("Bitte keinen leeren Ausdruck eingeben"); return false; }

  var cDPM = checkDoublePlusMinus(string);
  if(cDPM == false) {
    while(checkDoublePlusMinus(string) == false) {
      string = doublePlusMinus(string);
    }
    string = removePrefix(string);
    writeOutput(string);
  }

  var brackets = bracketsCheck(readInput());
  if (brackets !== -1) {
    toasts.push("Klammern sind nicht korrekt");
    waitBetweenToast(toasts);
    markRed(brackets);
    return false;
  }
  if (operators(readInput()) !== -1) {
    toasts.push("Operatoren hintereinander");
    waitBetweenToast(toasts);
    markRed(operators(readInput()));
    return false;
  }

  var order = checkBracketsOrder(string);
  if(order !== -1) {
    displayToastMessage("Die Klammernfolge ist nicht richtig!");

  return false;}

  var after = afteroperator(string);
  if (after == false) {
    toasts.push("Nach einem Operator muss eine Hexadezimalzahl oder eine sich öffnende Klammer stehen");
    waitBetweenToast(toasts);
    markAfterOperator(readInput());
    return false;
  }

  var beg = beginning(string);
  if (beg !== -1) {
    toasts.push("Am Anfang dürfen nur +, -, ( oder eine Hexadezimalzahl stehen!");
    waitBetweenToast(toasts);
    markRed(beginning(string));
    return false;
  }

  var aBNMD = afterBracketsNoMulDiv(string);
  if (aBNMD !== 0) {
    toasts.push("Nach einer Klammer darf nur +, -, ( oder eine Hexadezimalzahl stehen!");
    waitBetweenToast(toasts);
    markRed(afterBracketsNoMulDiv(string));
    return false;
  }

  return true;
}

module.exports = {
  hexaKorrigieren: hexaKorrigieren,
  hexaCheckBrackets: hexaCheckBrackets,
  hexaModifizieren: hexaModifizieren
}
