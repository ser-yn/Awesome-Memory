import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureInterface, PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  
  

  constructor(private picServ:PictureServiceService, 
              private router:Router) { }

  shuffle(){
    let middleImage: PictureInterface;
    let random1: number;
    let random2: number;
    for (let index = 0; index < this.picServ.allImages.length*10; index++) {
        random1 = Math.floor(Math.random() * this.picServ.allImages.length);
        random2 = Math.floor(Math.random() * this.picServ.allImages.length);
        middleImage = this.picServ.allImages[random1];
        this.picServ.allImages[random1]=this.picServ.allImages[random2];
        this.picServ.allImages[random2]=middleImage;
    }
    for (let index = 0; index < this.picServ.allImages.length; index++) {
      this.picServ.allImages[index].open = false;      
    }
    console.log(this.picServ.allImages);
    
}

empty(array: any[]){
  for (let index = 0; index < array.length; index++) {
    delete array[index];
  }
  array.length = 0;
}

gotoStartpage(){
  this.router.navigate(['']);
  this.empty(this.picServ.allImages);
}


  ngOnInit(): void {
  }
}
