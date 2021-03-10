import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
