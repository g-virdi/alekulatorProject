# Alekulator

Ein Taschenrechner als Hybride App


### Setup

Lade das Projekt mit einer Software deiner Wahl runter. In Sourcetree einfach den Repository link einfügen und auf PULL drücken.

Außerdem musst du [Node.JS](https://nodejs.org/en/) runtergeladen und installiert haben.

Danach musst du alle Dependencies runterladen. Gehe dazu mit der Kommandozeile in den Projektordner und gebe  _**npm install**_ ein.


### Entwickeln eines Features

Wenn du etwas zu dem Projekt beitragen möchtest dann musst du zunächst einen neuen Branch erstellen. Klicke dazu in Sourcetree oben auf "Branch". Lasse alle Einstellungen
so wie sie sind und gebe dem Branch einen passenden Namen (zB wie das Feature heißt). Nach einem klick auf OK sollte der Branch erstellt worden sein und du müsstest einen Punkt neben deinem ausgewählten Branch in der Branchliste sehen.

Entwickel dein Feature, vergiss aber nicht regelmäßig lokal zu committen. Solltest du zufrieden sein kannst du dein Projekt hochladen. Checke dazu unten den Haken für "Push changes immediatly to XXX"
In GitLab musst du danach einen Mergerequest starten. Wir werden diesen annehmen und das Projekt sollte nach  ~ 5 Minuten dann auf dem Webserver zu finden sein.


### Wie starte/teste ich die Website?

1. Danach führe _**npm run local**_ in der Kommandozeile aus.

2. Die Website kannst du nun im Browser unter http://localhost:8081 sehen.


### Wie teste ich die Electronanwendung?

Führe _**npm run electron**_ aus und Electron sollte sich öffnen


### Wie Schreibe ich die Tests?

1. Werdet vertraut mit unserem Testing Framework [Jest](https://facebook.github.io/jest/docs/en/getting-started.html)

2. Eure Tests werdet ihr in der app.test.js Datei schreiben, welche sich im Root Verzeichnis des Projekts befindet.

3. Es werden IMMER zuerst die Tests geschrieben, bevor das Feature selber implementiert wird (Test Driven Development)

4. Sobald ihr euren Test fertig geschrieben habt geht in den "WWW" Ordner des Projekts und schreibt $ npm test  

5. [So sieht dann z.B. ein erfolgreicher Test aus](https://imgur.com/a/oyhRX2B)

6. Falls eure Tests erfolgreich waren könnt ihr eure Ergebnisse committen und pushen.


### Wie builde ich eine .exe Dateien für Windows?

Führe _**npm run exe**_ aus und ein Ordner mit dem Namen "Alekulator-win32-x64" sollte erstellt worden sein. In diesem Ordner ist eine .exe Datei die du ausführen kannst.

### Unterstützte Geräte

Auf folgenden Geräten kann der Alekulator genutzt werden:

1. Im Webbrowser (PC/MAC):

- Microsoft Edge Version: 16 - 18
- Firefox Version: 59 - 62
- Chrome Version: 65 - 69
- Safari Version: 11.1, 12, TP

2. Smartphones & Tablets:

- Apple:
  Safari Version: 10.3, 11.2, 11.3

- Android:
  Chrome Version: 66
  UC Browser Version: 11.8
  Samsung Internet Version: 6.2


### Team Mitglieder

- Marc Bambey
- Bich Duyen Diep
- Japhet Fetewi
- Kelvin Petry
- Hengameh Renner
- Philipp Rothaug
- Gursharn Virdi
- Sara Zaghloul
