import { Component, OnInit } from '@angular/core';
import * as EventEmitter from 'events';

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
    this.timer = setInterval(() => {
      this.numberSeconds++;
      if(this.numberSeconds > 59){
        this.numberSeconds = 0;
        this.numberMinutes++;
      }
    }, 1000)
  }

}
