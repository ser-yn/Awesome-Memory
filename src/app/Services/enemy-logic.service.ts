import { Injectable, EventEmitter } from '@angular/core';
import { imageProperties } from '../enemy/enemy.component';

@Injectable({
  providedIn: 'root'
})
export class EnemyLogicService {

  emitInfo: EventEmitter<imageProperties> = new EventEmitter<imageProperties>();

  gamemode: string;
  constructor() { }

  getMode(mode){
    this.gamemode = mode;
  }

  getImageProps(placeNumber: number, imageUrl: string){
    // gets called by the player when he clicks an image
    // its properties are directly send via event emitter to the enemy component to be save in his array there
    this.emitInfo.emit({placeNumber, imageUrl});
  }
}
