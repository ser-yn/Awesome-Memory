import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FieldComponent } from '../field/field.component';


export interface PictureInterface{
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root'
})

export class PictureServiceService {
  
  allImages: PictureInterface[];
  public apiUrl = "https://api.unsplash.com/photos/random?client_id=Zvx6-31Gj89VXNzswcRqYB-ab8Y7d9JE-Uhcvy6QAqs";
  public photos: any[];

  getPhoto(query: string, count: number){
    
    count = count/2;
    const queryUrl = `&query=${query}`;
    const countUrl = `&count=${count}`;

    this.httpClient.get(this.apiUrl + queryUrl + countUrl).subscribe(photos =>{
      for (let index = 0; index < count; index++) {
        this.allImages.push({id:index, url:photos[index].urls.thumb});
        this.allImages.push({id:index, url:photos[index].urls.thumb});
      }
    })
  }

  constructor(private httpClient: HttpClient) { 

  }


}
