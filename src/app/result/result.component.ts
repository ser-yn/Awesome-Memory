import { Component, OnInit } from '@angular/core';
import { ResultsService } from '../Services/results.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  timer;
  numberSeconds = 0;
  numberMinutes = 0;
  pointsPlayerOne = 0;
  pointsPlayerTwo = 0;

  constructor(private resServ:ResultsService) {
    
   }
// Zugriff auf PEins und PZwei von der Html, ohne resServ public zu machen
   getPEins(){
     return this.resServ.punktePEins;
   }
   getPZwei(){
    return this.resServ.punktePZwei;
  }
  getPlayEinsActive(){
    return this.resServ.playerOne;
  }
  getPlayZweiActive(){
    return this.resServ.playerTwo;
  }

  ngOnInit(): void {
    // vorgefertigte Methode die jede Sekunde einen counter nach oben zählt
    // If-Anweisung um in Minuten anzuzeigen, nicht nur in Sekunden
    this.timer = setInterval(() => {
      this.numberSeconds++;
      if(this.numberSeconds > 59){
        this.numberSeconds = 0;
        this.numberMinutes++;
      }
    }, 1000)
  }

}
