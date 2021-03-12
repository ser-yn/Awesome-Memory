import { Component, OnInit } from '@angular/core';
import { EnemyLogicService } from '../Services/enemy-logic.service';
import { PictureServiceService } from '../Services/picture-service.service';
import { ResultsService } from '../Services/results.service';

export interface imageProperties {
  placeNumber: number, 
  imageUrl: string
}

@Component({
  selector: 'app-enemy',
  template: ''
})
export class EnemyComponent implements OnInit {

  knownImages: imageProperties[] = [];
  openImageOne: imageProperties;
  openImageTwo: imageProperties;
  memorizePercentage: number = 100;


  constructor(private logicServ: EnemyLogicService,
              private resServ: ResultsService,
              private picServ: PictureServiceService) { 

  }

  ngOnInit(): void {
    this.logicServ.emitInfo.subscribe(emittedInfo=>{
      this.pushOntoKnownArray(emittedInfo);
    });
    this.resServ.emitCompRound.subscribe(() =>{
      setTimeout(() => {
        this.mainFct();
      }, 3000);
    })
  };

  mainFct(){
    if(!this.resServ.playerTwo){
      return;
    }
    // als erstes checken ob im Merk-Array zwei gleiche Karten stehen, wenn ja werden diese aufgedeckt und anschließend gelöscht
    
    // if(this.checkArrayOnPair()){
    //   this.resServ.emitCompRound.emit();
    //   return;
    // }

    // Wenn keine Karten übrig sind wird ein zufällige karte ausgewählt, ist diese karte schon offen wird eine neue ausgewählt etc
    this.openImageOne = this.picServ.openCard();
    this.pushOntoKnownArray(this.openImageOne);

    setTimeout(() => {
          // nun wird diese karte mit dem bestehenden array verglichen, bei einer übereinstimmung wird die zweite aufgedeckt und anschließend aus dem array gelöscht
        if(this.compareImageWithKnownArray(this.openImageOne)){
          // ohne Übereinstimmung wird die zweite karte aufgedeckt mit der selben funktion wie oben
          // es werden die beiden karten miteinander verglichen, bei ja werden sie nicht ins array eingetragen bei nein mit der jeweiligen chance
          this.openImageTwo = this.picServ.openCard();
          this.pushOntoKnownArray(this.openImageTwo);
        }
      
        setTimeout(() => {
          if (this.openImageOne.imageUrl !== this.openImageTwo.imageUrl) {
            this.picServ.closeCards(this.openImageOne.placeNumber, this.openImageTwo.placeNumber);
            this.resServ.changeActivePlayer();
          }
          else{
            this.resServ.incrementPoints();
            this.deleteImagesOutOfKnownArray();
            this.mainFct();
          }
        }, 2000);

    }, 2000);

   
  }

  checkArrayOnPair(){
    // die erste schleife läuft vom ersten bis zum letzten element
    // die zweite beginnt immer eins darüber
    // in der zweiten schleife wird der inhalt des aktuellen elements mit dem element der ersten schleife verglichen
    // Bsp: length 4, for schleife 1 = 0 => for schleife 2 = 1 somit wird 01, 02, 03 gecheckt
    // dann fs1 = 1 => fs2 = 2 somit wird 12, 13 gecheckt, etc so werden alle elemente mit den jeweils anderen verglichen aber nicht mit sich selbst
    for (let index = 0; index < this.knownImages.length; index++) {
      for (let index2 = index+1; index2 < this.knownImages.length; index2++) {
        if(this.knownImages[index].imageUrl === this.knownImages[index2].imageUrl){
          //zuerst muss gecheckt werden ob die karten bereits offen sind, dies passiert wenn der spieler karten öffnet
          let alreadyOpen: boolean = this.picServ.allImages[index].open;
          this.picServ.openCardKnown(this.knownImages[index].placeNumber, this.knownImages[index2].placeNumber);
          // die werte für die aktuell geöffneten bilder müssen gesetzt werden, ansonsten werden die werte aus dem letzten durchlauf übernommen
          // dies würde beim deleten der elemente das array zersören
          this.openImageOne=this.knownImages[index];
          this.openImageTwo=this.knownImages[index2];
            this.deleteImagesOutOfKnownArray();
            if (!alreadyOpen) {
              this.resServ.incrementPoints();           
            }
          return true;
        }
      }
      
    }
  }

  
  compareImageWithKnownArray(imgInfo: imageProperties){
    for (let index = 0; index < this.knownImages.length; index++) {
      if (imgInfo.imageUrl === this.knownImages[index].imageUrl && imgInfo.placeNumber !== this.knownImages[index].placeNumber) {
        this.picServ.openCardKnown(imgInfo.placeNumber, this.knownImages[index].placeNumber);
        this.openImageTwo = {placeNumber: index, imageUrl: this.knownImages[index].imageUrl}
        return false;
      }
    }
    return true;
  }

  pushOntoKnownArray(info: imageProperties){
      // wenn die random nummer kleiner ist als der eingegeben prozentsatz wird unser objekt aus das array gepusht
      // davor wird allerdings gecheckt ob dieses objekt schon vorhanden ist
      // es wird mit jedem einzelnen element verglichen
      // stimmt die platz id übereinander ist es doppelt, dann wird nicht gepusht
      if (Math.floor(Math.random()*100) <= this.memorizePercentage) {
        let imageUnknown: boolean = true;
        for (let index = 0; index < this.knownImages.length; index++) {
          if (info.placeNumber === this.knownImages[index].placeNumber) {
            imageUnknown = false;
          }
        }
        if (imageUnknown) {
          this.knownImages.push(info);
          console.log(this.knownImages);
        }
      }
  }

  deleteImagesOutOfKnownArray(){
    const index = this.knownImages.findIndex(image => image.imageUrl === this.openImageOne.imageUrl);
    this.knownImages.splice(index, 1);
    const index2 = this.knownImages.findIndex(image => image.imageUrl === this.openImageTwo.imageUrl);
    this.knownImages.splice(index2, 1);
  }

}
