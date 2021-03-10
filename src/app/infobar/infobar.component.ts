import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.css']
})
export class InfobarComponent implements OnInit {
  category;
  amount;

  constructor(private router:Router, private picServ: PictureServiceService) {
   }

  ngOnInit(): void {
    // sobal Category und Amount im Picture Service zur Verfügung stehen werden sie 
    // hier eingetragen, dies wird anschließend in der html dargestellt
    this.picServ.emitCategory.subscribe(emittedCat=>{
      this.category = emittedCat;
    });
    this.picServ.emitAmount.subscribe(emittedAmo=>{
      this.amount = emittedAmo;
    });

  }

  gotoStartpage(){
    // Click Event auf den AM-Button redirected mithilfe des Routers zu Starpage
    this.router.navigate(['']);
  }

}
