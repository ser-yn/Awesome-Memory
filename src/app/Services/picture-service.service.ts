import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FieldComponent } from '../field/field.component';
import { InfobarComponent } from '../infobar/infobar.component';


export interface PictureInterface{
  id: number;
  url: string;
  open: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class PictureServiceService {
  
  allImages: PictureInterface[] = [];
  public apiUrl = "https://api.unsplash.com/photos/random?client_id=Zvx6-31Gj89VXNzswcRqYB-ab8Y7d9JE-Uhcvy6QAqs";
  public photos: any[];

  getPhoto(query: string, count: number){
    
    count = count/2;
    const queryUrl = `&query=${query}`;
    const countUrl = `&count=${count}`;

    this.httpClient.get(this.apiUrl + queryUrl + countUrl).subscribe(photos =>{
      for (let index = 0; index < count; index++) {
        this.allImages.push({id:index, url:photos[index].urls.thumb, open:false});
        this.allImages.push({id:index, url:photos[index].urls.thumb, open:false});
      }
      console.log(this.allImages);
      this.shuffle();
    })
    
  }

  shuffle(){
    let middleImage: PictureInterface;
    let random1: number;
    let random2: number;
    for (let index = 0; index < this.allImages.length*5; index++) {
        random1 = Math.floor(Math.random() * this.allImages.length);
        random2 = Math.floor(Math.random() * this.allImages.length);
        middleImage = this.allImages[random1];
        this.allImages[random1]=this.allImages[random2];
        this.allImages[random2]=middleImage;
    }
    console.log(this.allImages);
  }

  constructor(private httpClient: HttpClient) { 

  }


}
