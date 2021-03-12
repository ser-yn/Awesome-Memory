import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureInterface, PictureServiceService } from '../Services/picture-service.service';
import { ResultsService } from '../Services/results.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EnemyLogicService } from '../Services/enemy-logic.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})

export class FieldComponent implements OnInit {

  colAmount: number;
  rowVerhaelt: string;
  clickCount: number = 2;
  placeNum1: number;
  placeNum2: number;
  cardsToBeclosed: boolean;
  boolCounter: number;

constructor(private picServ:PictureServiceService, 
            private logicServe: EnemyLogicService,
            private resServ: ResultsService,
            private router:Router,
            private mySnackBar: MatSnackBar) { 
            
}

ngOnInit(): void {
  // Ruft die Funktion auf sobald das Event ausgelöst wurde
    this.picServ.emitImagesReceived.subscribe(()=>{
      this.imagesRecieved();
    });
    
}

imagesRecieved(){
  // Gibt die verscchieden Spaltenanzahlen und Höhenverhältnisse der Reihen,
  // die sich durch die verschiedenen Kartenanzahlen ergeben, in zwei Variablen aus
  // die mit String-Interpolation an die HTML übergeben werden können
  // Bei einem Fehler werden alle Pointer im Array gelöscht und auf die Startpage zurückgeleitet
  switch (this.picServ.allImages.length) {
    case 20:
        this.colAmount=5;
        this.rowVerhaelt="5:3.4";
      break;
      case 30:
        this.colAmount=6;
        this.rowVerhaelt="6:4";
      break;
      case 40:
        this.colAmount=8;
        this.rowVerhaelt="8:7";
      break;
      case 54:
        this.colAmount=9;
        this.rowVerhaelt="9:7.5";
      break;
  
    default:
      this.picServ.allImages.length = 0;
      this.router.navigate(['']);
      break;
  }
}

getPics(){
  // getter Methode um im HTML auf allImages zugreifen zu können ohne den Zugriff 
  // auf den Picture Service auf public zu setzen
  return this.picServ.allImages;
}

imgClicked(info){
  // zuerst wird gecheckt ob der computergegner am zug ist
  if(this.resServ.checkComputerenemyTurn())
    return;

  // Es sind zwei Clicks möglich, beim zweiten click wird die EndFct aufgerufen,
  // in der gecheckt wird ob der Zug ein Erfolg war etc. s.u.
    switch (this.clickCount) {
      case 2:
        if(this.cardsToBeclosed && this.logicServe.gamemode !== 'Against Computer'){
          this.picServ.closeCards(this.placeNum1, this.placeNum2);
          this.cardsToBeclosed=false;
        }
        this.clickCount--;
        this.placeNum2 = info;
        this.picServ.allImages[info].open = true;
        this.logicServe.getImageProps(this.placeNum2, this.picServ.allImages[this.placeNum2].url);
        break;
      case 1:
        this.clickCount=2;
        this.placeNum1 = info;
        this.picServ.allImages[info].open = true;
        this.logicServe.getImageProps(this.placeNum1, this.picServ.allImages[this.placeNum1].url);
        this.endFct(this.placeNum1, this.placeNum2);
        break;
    
      default:
        this.clickCount=2;
        break;
  }
  
}

  endFct(endFctPlaceNum1, endFctPlaceNum2){
    // Wenn die Karten übereinstimmen bleiben sie offen und der Spieler bekommt einen Punkt
    // Ansonsten werden sie geschlossen, keine Punkteverteilung

    // Ist das Paar richtig, werden die punkte des aktiven spieler inkrementiert
    // ist es falsch wird der aktive spieler gewechselt
    if(this.picServ.allImages[endFctPlaceNum1].id === this.picServ.allImages[endFctPlaceNum2].id){
        this.resServ.incrementPoints();
    }
    else {
      this.cardsToBeclosed=true;
      // Wenn es gegen den computer geht werden die karten nicht erst beim nächsten klick geschlossen, sondern direkt
      // ein kleiner puffer von 5 sekunden oder ähnliches wird eingebaut
      if(this.logicServe.gamemode === 'Against Computer'){
        setTimeout(() => {
          this.picServ.closeCards(this.placeNum1, this.placeNum2);
        }, 2500);
        this.cardsToBeclosed=false;
      }
      this.resServ.changeActivePlayer();
    }

    // Checken ob alle Karten offen sind, wenn ja ist das Spiel vorbei
    this.checkEnd()
  }

checkEnd(){
  const cardsLeft = this.picServ.allImages.find((picture: PictureInterface) => picture.open === false);
  if(!cardsLeft){
    this.mySnackBar.open(this.resServ.getWinner(), '',{
      duration: 5000,
    });
  }
}

}

