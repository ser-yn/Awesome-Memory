import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureInterface, PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})

export class FieldComponent implements OnInit {

  colAmount: number;
  rowVerhaelt: string;
  clickCount: number = 2;
  i1: number;
  i2: number;
  cardsToBeclosed: boolean;
  boolCounter: number;

constructor(private picServ:PictureServiceService, 
            private router:Router) { 
            
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
  // Es sind zwei Clicks möglich, beim zweiten click wird die EndFct aufgerufen,
  // in der gecheckt wird ob der Zug ein Erfolg war etc. s.u.
    switch (this.clickCount) {
      case 2:
        if(this.cardsToBeclosed){
          this.picServ.allImages[this.i1].open = false;
          this.picServ.allImages[this.i2].open = false;
          this.cardsToBeclosed=false;
        }
        this.clickCount--;
        this.i2 = info;
        this.picServ.allImages[info].open = true;
        break;
      case 1:
        this.clickCount=2;
        this.i1 = info;
        this.picServ.allImages[info].open = true;
        this.endFct(this.i1, this.i2);
        break;
    
      default:
        this.clickCount=2;
        break;
  }
}

  endFct(i1, i2){
    // Wenn die Karten übereinstimmen bleiben sie offen und der Spieler bekommt einen Punkt
    // Ansonsten werden sie geschlossen, keine Punkteverteilung
    if(this.picServ.allImages[i1].id === this.picServ.allImages[i2].id){
        // punkte zählen
    }
    else {
      this.cardsToBeclosed=true;
    }

    // Checken ob alle Karten offen sind, wenn ja ist das Spiel vorbei
    this.checkEnd()
  }

checkEnd(){
  const cardsLeft = this.picServ.allImages.find((picture: PictureInterface) => picture.open === false);
  if(!cardsLeft){

  }
}

}

