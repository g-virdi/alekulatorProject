document.onkeydown = pressEnter;

function pressEnter(evt){
  let charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode === 13) {
    evt.preventDefault();
    document.getElementById("equal").click();
  }
}

//Ließt das Eingabefeld
function readInput() {
  var inp = document.getElementById('input').innerHTML;
  return inp;
}

//Schreibt in das Eingabefeld und ersetzt es
function writeOutput(x) {
  document.getElementById('input').innerHTML = x;
}

//Leert das Eingabefeld
function Clear() {
  document.getElementById('input').innerHTML = '';
}

//Ändert die Farbe bei Fehlermeldung
function changeColor(){
  document.getElementById('input').style.color="red";
}

//Ändert die Farbe zurück zu Schwarz
function changeColorBlack(){
  document.getElementById('input').style.color="black";
}

//Löscht Zeichen in Abhängigkeit von Amount
function reduce(amount) {
  var text = readInput();
  let lastCharacter = text.charAt(text.length-1);
  if (lastCharacter == ">"){
    let n=text.indexOf("<font" );
    let end = text.indexOf("</font>")
    let result =text.substring(0,n);
    result += text.substring(n+18,n+19);
    result += text.substring(end+7,text.length);
    document.getElementById('input').innerHTML = result.substring(0,result.length-amount);
  }

  else {
    document.getElementById('input').innerHTML = text.substring(0,text.length-amount);
  }
}

//Mode auf HEX stellen, da wir beim User Interface im Default Mode bei HEX liegen
function init() {
  decimal();
  document.addEventListener("paste", decPaste);
  setMode("dec");
}

/*Die Funktion setValidator() setzt den Display Validator und die sogenannten CheckMethoden.*/
function setValidator(x) {
  var mode = x;
//Löschen der alten Events
    document.removeEventListener("paste", decPaste);
    document.getElementById("equal").removeEventListener("click", decInputValidator);
    document.getElementById('input').removeEventListener("keypress", decDisplayValidator);
    document.getElementById("equal").removeEventListener("click", decCheck);

    document.removeEventListener("paste", hexPaste);
    document.getElementById("equal").removeEventListener("click", hexInputValidator);
    document.getElementById('input').removeEventListener("keypress", hexDisplayValidator);
    document.getElementById("equal").removeEventListener("click", hexCheck);

    document.removeEventListener("paste", binPaste);
    document.getElementById("equal").removeEventListener("click", binInputValidator);
    document.getElementById('input').removeEventListener("keypress", binDisplayValidator);
    document.getElementById("equal").removeEventListener("click", binCheck);

    Clear(); //Nachdem alle Validatoren gelöscht werden, soll auch das InputFeld geleert werden

//Hinzufügen neuer Validatoren
  if(mode === "dec") {
    document.addEventListener("paste", decPaste);
    document.getElementById("input").addEventListener("keypress", decDisplayValidator);
    document.getElementById("equal").addEventListener("click", decCheck);
  } else if(mode === "hex") {
    document.addEventListener("paste", hexPaste);
    document.getElementById("input").addEventListener("keypress", hexDisplayValidator);
    document.getElementById("equal").addEventListener("click", hexCheck);
  } else if(mode === "bin") {
    document.addEventListener("paste", binPaste);
    document.getElementById("input").addEventListener("keypress", binDisplayValidator);
    document.getElementById("equal").addEventListener("click", binCheck);
  }
}
