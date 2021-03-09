import { stringify } from '@angular/compiler/src/util';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StartpageComponent } from '../startpage/startpage.component';

@Component({
  selector: 'app-infobar',
  templateUrl: './infobar.component.html',
  styleUrls: ['./infobar.component.css']
})
export class InfobarComponent implements OnInit {
  category;
  amount;

  constructor(private router:Router) {
   }

  ngOnInit(): void {
  }

  gotoStartpage(){
    this.router.navigate(['']);
  }

  show(cat: string, amo: number) {  
    this.category = cat;
    this.amount = amo;
  }
}
