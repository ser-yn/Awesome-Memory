import { Component, OnInit } from '@angular/core';
import { PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})

export class FieldComponent implements OnInit {

  category: string;
  amount: number;

  constructor(public picServ:PictureServiceService) { }

  ngOnInit(): void {
  }

}
