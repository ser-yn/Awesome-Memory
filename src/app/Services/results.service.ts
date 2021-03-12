import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {

  gamemode: string;
  punktePEins: number;
  punktePZwei: number;
  playerOne: boolean;
  playerTwo: boolean;
  emitCompRound: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

// Spielmodus wird durch Click des Buttons im Startbereich hieran weitergegeben
// Spielmodus wird zum punkte zählen benötigt
determineMode(modus: string){
   this.playerOne = true;
   this.playerTwo = false;
    this.gamemode = modus;
    this.defineModeProperties(modus);
  }

  defineModeProperties(modus){
    // Im Singleplayer-Modus wird nur eine Punktzahl angezeigt
    // das Ausschlusskriterium fürs zeigen ist >=0
    // beim würde man null eintragen würde man die 0 im template sehen, was nicht erwünscht ist
    // würde man sie auf keinen wert setzen würde beim neustarten der wert aus der vorigen runde stehen
    switch (modus) {
      case 'Single Player':
        this.punktePEins = 0;
        this.punktePZwei = -1;
        break;
      case 'Two Players':
      case 'Against Computer':
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
    if (this.gamemode === 'Single Player') {
      return;
    }
    // Dann wechseln des aktiven Spielers
    if (this.playerOne) {
      this.playerOne = false;
      this.playerTwo = true;
      // schauen ob es gegen den Computergegner ist, wenn ja wird ein event an dessen komponente gefeuert
      if (this.gamemode ==='Against Computer') {
          this.emitCompRound.emit();
      }
    }
    else {
      this.playerOne = true;
      this.playerTwo = false;
    }
  }

  checkComputerenemyTurn(){
    return this.gamemode ==='Against Computer' && this.playerTwo;
  }

  incrementPoints(){
    if (this.playerOne) {
      this.punktePEins++;
    }
    else
      this.punktePZwei++;
  }

  getWinner(){
    if(this.gamemode==='Single Player')
      return "You won! Surprise! I mean you're alone";
    if (this.punktePEins>this.punktePZwei) {
      return "Spieler Eins gewinnt mit " + this.punktePEins + "Punkten";
    }
    else if (this.punktePZwei>this.punktePEins) {
      return "Spieler Zwei gewinnt mit " + this.punktePZwei + " Punkten";
    }
    else
      return "It's a draw, now put your pencils away";
  }
}
