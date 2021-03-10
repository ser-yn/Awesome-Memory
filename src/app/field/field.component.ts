import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})

export class FieldComponent implements OnInit {

  colAmount: number;
  rowVerhaelt: string;
  clickCount: number = 2;

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
    console.log(info);
    switch (this.clickCount) {
      case 2:
        this.clickCount--;
        return true;
      case 1:
        this.clickCount=2;
        this.endFct();
        return true;
    
      default:
        this.clickCount=2;
        break;
  }
}

  endFct(){
    
  }

}
