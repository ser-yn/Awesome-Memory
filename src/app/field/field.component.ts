import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})

export class FieldComponent implements OnInit {

  category: string;
  amount: number;

  constructor() { }

  ngOnInit(): void {
  }

}
