import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  

constructor(private picServ:PictureServiceService, 
            private router:Router) {

}

shuffle(){
  // es wird einfach die sshuffle Methode im Picture Service aufgerufen
  // einfacher, da diese schon definiert ist
    this.picServ.shuffle();
}

empty(array: any[]){
  // Leeren des Arrays
  // löschen der einzelnen Elemente
  for (let index = 0; index < array.length; index++) {
    delete array[index];
  }
  // Dadurch werden die Pointer auf die gelöschten Elemente gelöscht
  array.length = 0;
}

gotoStartpage(){
  // Redirected auf die Startpage, ruft davor jedoch die empty Funktion auf
  // ansonsten wird beim Starten eines neuen Spiels die neuen Bilder an
  // das noch bestehende Array angehängt
  this.router.navigate(['']);
  this.empty(this.picServ.allImages);
}


  ngOnInit(): void {
  }
}
