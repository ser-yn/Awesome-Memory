import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PictureServiceService } from '../Services/picture-service.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {


  categorys: string[] = ["Cats", "Dogs", "Ducks", "Fish", "Flowers", "Trees", "Space"];
  cardAmount: number[] = [18, 24, 30, 36];

  form: FormGroup;

  constructor(private router:Router, private formBuilder:FormBuilder, private service:PictureServiceService) { 

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      categorysForm: ["", [Validators.required]], // Validator.required, gibt an ob die Form leer ist
      amountsForm: ["", [Validators.required]]
    })
  }

  startGame() {
    if(this.form){}
    this.service.getPhoto(this.form.value.categorysForm, this.form.value.amountsForm);
    this.router.navigate(['/game']);
  }

}
