import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PictureServiceService } from '../Services/picture-service.service';
import { ResultsService } from '../Services/results.service';

@Component({
  selector: 'app-startpage',
  templateUrl: './startpage.component.html',
  styleUrls: ['./startpage.component.css']
})
export class StartpageComponent implements OnInit {

  // Arrays aus denen die Kategorie und die Kartenanzahl auszuwählen sind
  categorys: string[] = ["Cats", "Dogs", "Ducks", "Fish", "Flowers", "Trees"];
  // ACHTUNG!!! cardAmount mit diesen Werten in ImageReceived von FieldComponent Hardgecoded
  // Bei Änderungen muss dies beachtet werden
  cardAmount: number[] = [20, 30, 40, 54];

  form: FormGroup;

  constructor(private router:Router, 
              private formBuilder:FormBuilder, 
              private picService:PictureServiceService,
              private resService:ResultsService) { 

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      categorysForm: ["", [Validators.required]], // Validator.required, gibt an ob die Form leer ist
      amountsForm: ["", [Validators.required]]
    })
  }

startGame() {
    this.picService.getPhoto(this.form.value.categorysForm, this.form.value.amountsForm);
    this.router.navigate(['/game']);
}

// Je nachdem welcher Button gedrückt wird, dieser modus wird an resultsService weitergegeben
onModeClick(mode: string){
  this.resService.determineMode(mode);
}
}
