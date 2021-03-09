import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureInterface, PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  

  constructor(private pctServ:PictureServiceService, private router:Router) { }

  shuffle(){
    let middleImage: PictureInterface;
    let random1: number;
    let random2: number;
    for (let index = 0; index < this.pctServ.allImages.length*5; index++) {
        random1 = Math.floor(Math.random() * this.pctServ.allImages.length);
        random2 = Math.floor(Math.random() * this.pctServ.allImages.length);
        middleImage = this.pctServ.allImages[random1];
        this.pctServ.allImages[random1]=this.pctServ.allImages[random2];
        this.pctServ.allImages[random2]=middleImage;
    }
    console.log(this.pctServ.allImages);
    
}

gotoStartpage(){
  this.router.navigate(['']);
}

  ngOnInit(): void {
  }
}
