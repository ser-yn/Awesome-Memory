import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';


export interface PictureInterface{
  id: number;
  url: string;
  open: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class PictureServiceService {
  // Category und Amount werden über den Event Emitter an Infobar weitergegeben
  emitCategory: EventEmitter<string> = new EventEmitter<string>();
  emitAmount: EventEmitter<number> = new EventEmitter<number>();

  // Wird an das Feld weitergegeben, damit dieses weiß das die Bilder im Array sind
  // aufgrund der Asynchronität wird ansonsten vermutlich mit einem leeren Array gearbeitet
  emitImagesReceived: EventEmitter<void> = new EventEmitter<void>();

  // Array der Bilder, durch das Interface wird definiert, 
  // wie die Elementobjekte aufgebaut sein müssen
  allImages: PictureInterface[] = [];
  
  public apiUrl = "https://api.unsplash.com/photos/random?client_id=Zvx6-31Gj89VXNzswcRqYB-ab8Y7d9JE-Uhcvy6QAqs";

  getPhoto(query: string, count: number){
    
    count = count/2;
    const queryUrl = `&query=${query}`;
    const countUrl = `&count=${count}`;

    this.httpClient.get(this.apiUrl + queryUrl + countUrl).subscribe(photos =>{
      for (let index = 0; index < count; index++) {
        this.allImages.push({id:index, url:photos[index].urls.thumb, open:false});
        this.allImages.push({id:index, url:photos[index].urls.thumb, open:false});
      }
      this.shuffle();
      this.emitImagesReceived.emit();
    })
    this.emitCategory.emit(query);
    this.emitAmount.emit(count*2);
  }


  shuffle(){
    // Mischeln der Karte, zufälliges Element wird in Variable Gespeichert
    // anderes zufälliges Element wird in Platz von Element Eins gespeichert
    // Element Eins wird aus Variable an Platz von Element 2 gespeichert
    // Dies wird einige Male wiederholt
    let middleImage: PictureInterface;
    let random1: number;
    let random2: number;
    for (let index = 0; index < this.allImages.length*10; index++) {
        random1 = Math.floor(Math.random() * this.allImages.length);
        random2 = Math.floor(Math.random() * this.allImages.length);
        middleImage = this.allImages[random1];
        this.allImages[random1]=this.allImages[random2];
        this.allImages[random2]=middleImage;
    }
    // Allen Elementen wird gesagt, dass sie verdeckt sind
    // wenn das Game restartet wird bleiben ansonsten die offenen Karten offen
    for (let index = 0; index < this.allImages.length; index++) {
      this.allImages[index].open = false;  
    }
  }

  constructor(private httpClient: HttpClient) { 

  }


}
