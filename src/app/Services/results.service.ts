import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  gamemode: string;
  punktePEins: number;
  punktePZwei: number;
  playerOne: boolean = true;
  playerTwo: boolean = false;

  constructor() { }

// Spielmodus wird durch Click des Buttons im Startbereich hieran weitergegeben
// Spielmodus wird zum punkte zählen benötigt
determineMode(modus: string){
    this.gamemode = modus;
    this.defineModeProperties(modus);
  }

  defineModeProperties(modus){
    // Im Singleplayer-Modus wird nur eine Punktzahl angezeigt
    // das Ausschlusskriterium fürs zeigen ist >=0
    // beim würde man null eintragen würde man die 0 im template sehen, was nicht erwünscht ist
    // würde man sie auf keinen wert setzen würde beim neustarten der wert aus der vorigen runde stehen
    switch (modus) {
      case 'SP':
        this.punktePEins = 0;
        this.punktePZwei = -1;
        break;
      case 'TP':
      case 'CP':
        this.punktePEins = 0;
        this.punktePZwei = 0;
        break;
      default:
        alert("Define Gamemode doesnt work");
        break;
    }
  }

  // Die aktive Spielfigur wird geändert
  changeActivePlayer(){
    // zuerst checken ob im einspielermodus, dann kann folglich nicht gewechselt werden
    if (this.gamemode === 'SP') {
      return;
    }
    if (this.playerOne) {
      this.playerOne = false;
      this.playerTwo = true;
    }
    else {
      this.playerOne = true;
      this.playerTwo = false;
    }
  }

  increPoints(){
    if (this.playerOne) {
      this.punktePEins++;
    }
    else
      this.punktePZwei++;
  }

  getWinner(){
    if(this.gamemode==='SP')
      return;
    if (this.punktePEins>this.punktePZwei) {
      return "Spieler Eins gewinnt mit " + this.punktePEins + "Punkten";
    }
    else {
      return "Spieler Zwei gewinnt mit " + this.punktePZwei + " Punkten";
    }
  }
}
